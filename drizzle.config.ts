import { defineConfig } from "drizzle-kit";

if (!process.env.NETLIFY_DATABASE_URL) {
  throw new Error("NETLIFY_DATABASE_URL environment variable is not set");
}

export default defineConfig({
  schema: "./src/infrastructure/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  casing: "snake_case",
  dbCredentials: {
    url: process.env.NETLIFY_DATABASE_URL,
  },
});
