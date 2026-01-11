import { Pool } from "pg";

export const db = new Pool({
  host: "localhost",
  user: "postgres",
  password: "root",
  database: "explore_web",
  port: 5432,
});
