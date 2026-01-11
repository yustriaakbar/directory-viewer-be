import { db } from "../../db";
import { Folder } from "./folder.model";

export class FolderRepository {
  async getAllFolders(): Promise<Folder[]> {
    const result = await db.query("SELECT * FROM folders");
    return result.rows;
  }

  async getChildren(folderId: number): Promise<Folder[]> {
    const result = await db.query(
      "SELECT * FROM folders WHERE parent_id = $1",
      [folderId]
    );
    return result.rows;
  }

  async getFiles(folderId: number) {
    const result = await db.query(
      "SELECT * FROM files WHERE folder_id = $1",
      [folderId]
    )
    return result.rows
  }

  async getFilesByFolderId(folderId: number) {
    const result = await db.query(
      "SELECT id, name FROM files WHERE folder_id = $1",
      [folderId]
    )
    return result.rows
  }

  async getSearch(q: string) {
    const result = await db.query(
      "SELECT * FROM folders WHERE name ILIKE $1 LIMIT 50",
      [`%${q}%`]
    );
    return result.rows;
  }

  async searchRecursive(folderId: number, keyword: string) {
    const result = await db.query(
      `
      WITH RECURSIVE folder_tree AS (
        SELECT id
        FROM folders
        WHERE id = $1

        UNION ALL

        SELECT f.id
        FROM folders f
        JOIN folder_tree ft ON f.parent_id = ft.id
      )
      SELECT id, name, 'folder' AS type
      FROM folders
      WHERE id IN (SELECT id FROM folder_tree)
        AND name ILIKE $2

      UNION ALL

      SELECT id, name, 'file' AS type
      FROM files
      WHERE folder_id IN (SELECT id FROM folder_tree)
        AND name ILIKE $2
      `,
      [folderId, `%${keyword}%`]
    )

    return result.rows
  }

}
