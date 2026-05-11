import { Router } from "express";
import bcrypt from "bcryptjs";
import { query, withTransaction } from "../db.js";
import { signToken } from "../utils/token.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.post("/register", async (req, res) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) {
    return res.status(400).json({ error: "email, password y role son obligatorios" });
  }
  if (!["artist", "promoter"].includes(role)) {
    return res.status(400).json({ error: "role debe ser artist o promoter" });
  }
  try {
    const hash = await bcrypt.hash(password, 10);
    const user = await withTransaction(async (client) => {
      const { rows } = await client.query(
        `INSERT INTO users (email, password_hash, role) VALUES ($1, $2, $3) RETURNING id, email, role, created_at`,
        [email.toLowerCase().trim(), hash, role]
      );
      const u = rows[0];
      if (role === "artist") {
        // Fase gamificación: +10 pts por registro (artista)
        await client.query(
          `INSERT INTO artist_profiles (user_id, stage_name, points) VALUES ($1, $2, 10)`,
          [u.id, req.body.stage_name?.trim() || null]
        );
      } else {
        await client.query(`INSERT INTO promoter_profiles (user_id, company_name) VALUES ($1, $2)`, [
          u.id,
          req.body.company_name?.trim() || null,
        ]);
      }
      return u;
    });
    const token = signToken(user.id, user.role);
    return res.status(201).json({
      token,
      user: { id: user.id, email: user.email, role: user.role },
    });
  } catch (e) {
    if (e.code === "23505") {
      return res.status(409).json({ error: "El email ya está registrado" });
    }
    console.error(e);
    return res.status(500).json({ error: "Error al registrar" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "email y password obligatorios" });
  }
  try {
    const { rows } = await query(`SELECT id, email, role, password_hash FROM users WHERE email = $1`, [
      email.toLowerCase().trim(),
    ]);
    if (!rows.length) {
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }
    const u = rows[0];
    const ok = await bcrypt.compare(password, u.password_hash);
    if (!ok) {
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }
    const token = signToken(u.id, u.role);
    return res.json({ token, user: { id: u.id, email: u.email, role: u.role } });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error al iniciar sesión" });
  }
});

router.get("/me", requireAuth, async (req, res) => {
  try {
    const { rows: urows } = await query(`SELECT id, email, role, created_at FROM users WHERE id = $1`, [
      req.user.id,
    ]);
    if (!urows.length) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    const base = urows[0];
    let profile = null;
    if (base.role === "artist") {
      const { rows } = await query(`SELECT * FROM artist_profiles WHERE user_id = $1`, [base.id]);
      profile = rows[0] || {};
    } else {
      const { rows } = await query(`SELECT * FROM promoter_profiles WHERE user_id = $1`, [base.id]);
      profile = rows[0] || {};
    }
    return res.json({ user: base, profile });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error al cargar perfil" });
  }
});

export default router;
