import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { routes } from "./routes";

const app = new Elysia()
  .use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    })
  )
  .use(routes)
  .listen(3000);

console.log("🚀 Backend running at http://localhost:3000");
