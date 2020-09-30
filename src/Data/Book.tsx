export default class Book {
  id?: number;
  name: string;
  cover: string;
  path: string;
  pages: number;
  tags: string[];

  constructor(
    id?: number,
    name?: string,
    cover?: string,
    path?: string,
    pages?: number,
    tags?: string[]
  ) {
    this.id = id;
    this.name = name || "";
    this.cover = cover || "";
    this.path = path || "";
    this.pages = pages || 0;
    this.tags = tags || [];
  }
}
