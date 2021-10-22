import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.join(__dirname, "../.env"),
});

export const __prod__ = process.env.NODE_ENV !== "production";
export const __dbName__ = process.env.DB_NAME;
export const __dbUsername__ = process.env.DB_USERNAME;
export const __dbPassword__ = process.env.DB_PASSWORD;
