import { Elysia } from "elysia";
import { FolderRepository } from "./folder.repository";
import { FolderService } from "./folder.service";

const repo = new FolderRepository();
const service = new FolderService(repo);

export const folderController = new Elysia({ prefix: "/api/v1/folders" })
  .get("/", async () => service.getTree())
  .get("/:id/content", async ({ params }) =>
    service.getFolderContent(Number(params.id))
  )
  // .get("/search", async ({ query }) =>
  //   service.getSearch(query.q as string)
  // )
  .get("/:id/search", async ({ params, query }) => {
    return service.search(
      Number(params.id),
      String(query.q || "")
    )
  });
  // .get("/:id/children", async ({ params }) =>
  //   service.getChildren(Number(params.id))
  // );
