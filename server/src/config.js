import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: Number(process.env.PORT) || 4000,
  databaseUrl: process.env.DATABASE_URL,
  usePglite: process.env.USE_PGLITE === "true",
  jwtSecret: process.env.JWT_SECRET || "dev-only-change-me",
  clientOrigin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
};
