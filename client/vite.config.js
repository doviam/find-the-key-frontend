import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import sirv from "sirv";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
/** Raíz del repo "FIND THE SOUND" (padre de find-the-key-platform) */
const workspaceRoot = path.resolve(__dirname, "..", "..");

function labToolsStaticPlugin() {
  const mounts = [
    { prefix: "/lab/synth", dir: path.join(workspaceRoot, "SYNTH MASTER", "SYNTH V7") },
    { prefix: "/lab/detector", dir: path.join(workspaceRoot, "DETECTOR", "find-the-key", "frontend") },
    { prefix: "/lab/find-the-frequency", dir: path.join(workspaceRoot, "find-the-frequency - copia", "dist") },
  ];

  function mountLabs(middlewares) {
    for (const { prefix, dir } of mounts) {
      if (!fs.existsSync(dir)) {
        console.warn(`[lab-tools] Omitido ${prefix}: no existe\n  ${dir}`);
        continue;
      }
      middlewares.use(prefix, sirv(dir, { dev: true, etag: true, single: false }));
    }
  }

  return {
    name: "lab-tools-static",
    enforce: "pre",
    configureServer(server) {
      mountLabs(server.middlewares);
    },
    configurePreviewServer(server) {
      mountLabs(server.middlewares);
    },
  };
}

export default defineConfig({
  plugins: [labToolsStaticPlugin(), react()],
  server: {
    port: 5173,
    proxy: {
      "/api": { target: "http://localhost:4000", changeOrigin: true },
      "/uploads": { target: "http://localhost:4000", changeOrigin: true },
    },
    fs: {
      allow: [workspaceRoot],
    },
  },
});
