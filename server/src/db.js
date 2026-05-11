import fs from "fs";
import os from "node:os";
import path from "path";
import { fileURLToPath } from "url";
import pg from "pg";
import { PGlite } from "@electric-sql/pglite";
import { config } from "./config.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
let pool = null;
let pglite = null;

export function query(text, params) {
  if (pglite) return pglite.query(text, params);
  if (!pool) throw new Error("Base de datos no inicializada.");
  return pool.query(text, params);
}

export async function withTransaction(handler) {
  if (pglite) {
    return pglite.transaction(async (tx) => handler(tx));
  }
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const out = await handler(client);
    await client.query("COMMIT");
    return out;
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
}

export async function initDatabase() {
  if (config.usePglite) {
    const defaultDataDir = path.join(__dirname, "..", "data", "pglite");
    const dataDir =
      process.env.PGLITE_DATA_DIR ||
      (/\s/.test(defaultDataDir)
        ? path.join(os.homedir(), ".find-the-key-platform", "pglite")
        : defaultDataDir);
    fs.mkdirSync(dataDir, { recursive: true });
    pglite = new PGlite(dataDir);
    await pglite.waitReady;
    const sql = fs.readFileSync(path.join(__dirname, "..", "sql", "schema.sql"), "utf8");
    await pglite.exec(sql);
    console.log("[db] PGlite en", dataDir);
    return;
  }
  pool = new pg.Pool({ connectionString: config.databaseUrl, max: 20 });
  console.log("[db] Pool PostgreSQL");
}
