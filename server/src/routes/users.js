import { Router } from "express";
import { query } from "../db.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.get("/artists", async (_req, res) => {
  try {
    const { rows } = await query(
      `SELECT u.id, ap.stage_name, ap.photo_url, ap.city, ap.genre, ap.points, ap.level
       FROM users u
       JOIN artist_profiles ap ON ap.user_id = u.id
       WHERE u.role = 'artist'
       ORDER BY ap.points DESC NULLS LAST, u.id DESC
       LIMIT 200`
    );
    return res.json({ artists: rows });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error al listar artistas" });
  }
});

router.patch("/me/profile", requireAuth, async (req, res) => {
  const userId = req.user.id;
  const role = req.user.role;
  try {
    if (role === "artist") {
      const {
        stage_name,
        photo_url,
        bio,
        city,
        genre,
        spotify_url,
        instagram_url,
      } = req.body;
      await query(
        `UPDATE artist_profiles SET
          stage_name = COALESCE($2, stage_name),
          photo_url = COALESCE($3, photo_url),
          bio = COALESCE($4, bio),
          city = COALESCE($5, city),
          genre = COALESCE($6, genre),
          spotify_url = COALESCE($7, spotify_url),
          instagram_url = COALESCE($8, instagram_url),
          updated_at = NOW()
        WHERE user_id = $1`,
        [
          userId,
          stage_name ?? null,
          photo_url ?? null,
          bio ?? null,
          city ?? null,
          genre ?? null,
          spotify_url ?? null,
          instagram_url ?? null,
        ]
      );
    } else {
      const { company_name, entity_type, city, description, contact_email } = req.body;
      await query(
        `UPDATE promoter_profiles SET
          company_name = COALESCE($2, company_name),
          entity_type = COALESCE($3, entity_type),
          city = COALESCE($4, city),
          description = COALESCE($5, description),
          contact_email = COALESCE($6, contact_email),
          updated_at = NOW()
        WHERE user_id = $1`,
        [
          userId,
          company_name ?? null,
          entity_type ?? null,
          city ?? null,
          description ?? null,
          contact_email ?? null,
        ]
      );
    }
    return res.json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "No se pudo actualizar el perfil" });
  }
});

router.get("/:id/public", async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: "id inválido" });
  }
  try {
    const { rows: urows } = await query(`SELECT id, email, role, created_at FROM users WHERE id = $1`, [id]);
    if (!urows.length) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    const u = urows[0];
    if (u.role === "artist") {
      const { rows } = await query(`SELECT * FROM artist_profiles WHERE user_id = $1`, [id]);
      const profile = rows[0];
      const tracks = await query(
        `SELECT id, title, genre, cover_url, audio_url, created_at FROM tracks WHERE user_id = $1 ORDER BY created_at DESC`,
        [id]
      );
      return res.json({ user: { id: u.id, role: u.role }, profile, tracks: tracks.rows });
    }
    const { rows } = await query(`SELECT * FROM promoter_profiles WHERE user_id = $1`, [id]);
    return res.json({ user: { id: u.id, role: u.role }, profile: rows[0], tracks: [] });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error al cargar perfil público" });
  }
});

export default router;
