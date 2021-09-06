import IEntity from "./IEntity";

export default class Book extends IEntity {
  cover: string;
  data: Blob;
  pages: number;
  tags: string[];

  constructor(
    id?: number,
    name?: string,
    cover?: string,
    data?: Blob,
    pages?: number,
    tags?: string[]
  ) {
    super(id, name, "", "");
    this.cover = cover || "";
    this.data = data || new Blob();
    this.pages = pages || 0;
    this.tags = tags || [];
  }
}
