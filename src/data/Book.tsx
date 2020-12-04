import IEntity from "./IEntity";

export default class Book implements IEntity{
  id?: number;
  name: string;
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
    this.id = id;
    this.name = name || "";
    this.cover = cover || "";
    this.data = data || new Blob();
    this.pages = pages || 0;
    this.tags = tags || [];
  }
}
