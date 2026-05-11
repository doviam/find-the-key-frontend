import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { Router } from "express";
import multer from "multer";
import { randomUUID } from "crypto";
import { query } from "../db.js";
import { requireAuth } from "../middleware/auth.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadRoot = path.join(__dirname, "..", "..", "uploads");
const audioDir = path.join(uploadRoot, "audio");
const coverDir = path.join(uploadRoot, "covers");

[uploadRoot, audioDir, coverDir].forEach((d) => {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
});

const storage = multer.diskStorage({
  destination: (_req, file, cb) => {
    if (file.fieldname === "audio") cb(null, audioDir);
    else if (file.fieldname === "cover") cb(null, coverDir);
    else cb(new Error("Campo de archivo no válido"), "");
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname) || (file.fieldname === "audio" ? ".webm" : ".jpg");
    cb(null, `${randomUUID()}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 30 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (file.fieldname === "audio") {
      const ok = /\.(mp3|wav|ogg|webm|m4a)$/i.test(file.originalname) || file.mimetype.startsWith("audio/");
      return ok ? cb(null, true) : cb(new Error("Formato de audio no permitido"));
    }
    if (file.fieldname === "cover") {
      const ok = /\.(jpg|jpeg|png|webp)$/i.test(file.originalname) || file.mimetype.startsWith("image/");
      return ok ? cb(null, true) : cb(new Error("Imagen de portada no válida"));
    }
    cb(new Error("Campo desconocido"));
  },
});

const router = Router();

router.get("/feed", async (_req, res) => {
  try {
    const { rows } = await query(
      `SELECT t.id, t.title, t.genre, t.cover_url, t.audio_url, t.created_at,
              u.id AS artist_user_id, ap.stage_name, ap.photo_url, ap.city
       FROM tracks t
       JOIN users u ON u.id = t.user_id
       JOIN artist_profiles ap ON ap.user_id = u.id
       ORDER BY t.created_at DESC
       LIMIT 100`
    );
    return res.json({ tracks: rows });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error al cargar el feed" });
  }
});

router.post(
  "/",
  requireAuth,
  (req, res, next) => {
    if (req.user.role !== "artist") {
      return res.status(403).json({ error: "Solo artistas pueden subir música" });
    }
    next();
  },
  upload.fields([
    { name: "audio", maxCount: 1 },
    { name: "cover", maxCount: 1 },
  ]),
  async (req, res) => {
    const audio = req.files?.audio?.[0];
    if (!audio) {
      return res.status(400).json({ error: "Archivo audio obligatorio" });
    }
    const title = req.body.title?.trim();
    if (!title) {
      return res.status(400).json({ error: "Título obligatorio" });
    }
    const genre = req.body.genre?.trim() || null;
    const cover = req.files?.cover?.[0];
    const audioUrl = `/uploads/audio/${audio.filename}`;
    const coverUrl = cover ? `/uploads/covers/${cover.filename}` : null;
    try {
      const { rows } = await query(
        `INSERT INTO tracks (user_id, title, genre, cover_url, audio_url)
         VALUES ($1, $2, $3, $4, $5) RETURNING id, title, genre, cover_url, audio_url, created_at`,
        [req.user.id, title, genre, coverUrl, audioUrl]
      );
      return res.status(201).json({ track: rows[0] });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Error al guardar la canción" });
    }
  }
);

export default router;
