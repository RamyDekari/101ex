import type { Config } from "drizzle-kit";
export default {
  schema: "./schema.ts",
  out: "./app/db",
  dbCredentials: {
    wranglerConfigPath: "wrangler.toml",
    dbName: "mychatapp-db",
  },
  driver: "d1",
} satisfies Config;