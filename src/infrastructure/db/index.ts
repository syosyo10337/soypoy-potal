import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

if (!process.env.NETLIFY_DATABASE_URL) {
  throw new Error("NETLIFY_DATABASE_URL environment variable is not set");
}

const sql = neon(process.env.NETLIFY_DATABASE_URL);
export const db = drizzle(sql, { casing: "snake_case" });
