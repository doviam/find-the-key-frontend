import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import express from "express";
import cors from "cors";
import { config } from "./config.js";
import { initDatabase } from "./db.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import trackRoutes from "./routes/tracks.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadRoot = path.join(__dirname, "..", "uploads");
fs.mkdirSync(uploadRoot, { recursive: true });

const app = express();
app.use(
  cors({
    origin: config.clientOrigin,
    credentials: true,
  })
);
app.use(express.json());
app.use("/uploads", express.static(uploadRoot));

app.get("/api/health", (_req, res) => res.json({ ok: true, db: config.usePglite ? "pglite" : "postgres" }));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tracks", trackRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);
  const msg = err.message || "Error interno";
  const status = err.message?.includes("no permitido") || err.message?.includes("no válida") ? 400 : 500;
  res.status(status).json({ error: msg });
});

async function main() {
  await initDatabase();
  app.listen(config.port, () => {
    console.log(`FTK API http://localhost:${config.port}`);
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
