export default class Note {
  title: string;
  content: string;
  tags: string;

  constructor(title?: string, content?: string, tags?: string) {
    this.title = title || "";
    this.content = content || "";
    this.tags = tags || "";
  }
}
