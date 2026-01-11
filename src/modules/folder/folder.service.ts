import { FolderRepository } from "./folder.repository";

export class FolderService {
  constructor(private repo: FolderRepository) {}

  async getTree() {
    const folders = await this.repo.getAllFolders();

    const map = new Map<number, any>();
    const roots: any[] = [];

    folders.forEach(f =>
      map.set(f.id, { ...f, children: [] })
    );

    map.forEach(folder => {
      if (folder.parent_id) {
        map.get(folder.parent_id)?.children.push(folder);
      } else {
        roots.push(folder);
      }
    });

    return roots;
  }

  async getChildren(folderId: number) {
    return this.repo.getChildren(folderId);
  }

  async getSearch(q: string) {
    if (!q) return [];
    return this.repo.getSearch(q);
  }

  async search(folderId: number, keyword: string) {
    if (!keyword) return []
    return this.repo.searchRecursive(folderId, keyword)
  }

  async getFolderContent(folderId: number) {
    const folders = await this.repo.getChildren(folderId)
    const files = await this.repo.getFilesByFolderId(folderId)

    return { folders, files }
  }

}
