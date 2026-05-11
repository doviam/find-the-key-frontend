import jwt from "jsonwebtoken";
import { config } from "../config.js";

export function signToken(userId, role) {
  return jwt.sign({ role }, config.jwtSecret, {
    subject: String(userId),
    expiresIn: "7d",
  });
}
