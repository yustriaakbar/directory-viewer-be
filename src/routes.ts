import { Elysia } from "elysia";
import { folderController } from "./modules/folder/folder.controller";

export const routes = new Elysia()
  .use(folderController);
