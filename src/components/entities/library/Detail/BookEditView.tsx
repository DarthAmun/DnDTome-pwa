import React from "react";
import styled from "styled-components";
import Book from "../../../../data/Book";

import {
  faLink,
  faImage,
  faFileImport,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import NumberField from "../../../form_elements/NumberField";
import StringField from "../../../form_elements/StringField";
import FileField from "../../../form_elements/FileField";
import IconButton from "../../../form_elements/IconButton";

interface $Props {
  book: Book;
  onEdit: (value: Book) => void;
}

const BookEditView = ({ book, onEdit }: $Props) => {
  const triggerImportFiles = (fileList: FileList | null) => {
    if (fileList !== null) {
      const files = Array.from(fileList);
      if (files.length === 1) onEdit({ ...book, data: files[0] });
    }
  };

  const onTagChange = (oldTag: string, value: string) => {
    let tags = book.tags.map((tag: string) => {
      if (tag === oldTag) {
        return value;
      } else {
        return tag;
      }
    });
    onEdit({ ...book, tags: tags });
  };

  const addNewTag = () => {
    onEdit({
      ...book,
      tags: [...book.tags, ""],
    });
  };

  const removeTag = (oldTag: string) => {
    let tags = book.tags;
    const index: number = tags.indexOf(oldTag);
    if (index !== -1) {
      tags.splice(index, 1);
      onEdit({ ...book, tags: tags });
    }
  };

  return (
    <CenterWrapper>
      <BookView>
        <StringField
          value={book.name}
          label="Name"
          onChange={(name) => onEdit({ ...book, name: name })}
        />
        <FileField
          label=""
          isMulti={false}
          icon={faFileImport}
          accept=".pdf"
          onChange={(file) => triggerImportFiles(file)}
        />
        <StringField
          value={book.cover}
          label="Cover"
          icon={faImage}
          onChange={(cover) => onEdit({ ...book, cover: cover })}
        />
        <NumberField
          value={book.pages}
          label="Pages"
          icon={faLink}
          onChange={(pages) => onEdit({ ...book, pages: pages })}
        />
      </BookView>
      <TagView>
        {book.tags.map((tag: string, index: number) => {
          return (
            <TagWrapper key={index}>
              <StringField
                value={tag}
                label="Tag"
                onChange={(name) => onTagChange(tag, name)}
              />
              <IconButton icon={faTrash} onClick={() => removeTag(tag)} />
            </TagWrapper>
          );
        })}
        <TagWrapper>
          <IconButton icon={faPlus} onClick={() => addNewTag()} />
        </TagWrapper>
      </TagView>
    </CenterWrapper>
  );
};

export default BookEditView;

const CenterWrapper = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const BookView = styled.div`
  color: ${({ theme }) => theme.tile.color};
  font-size: 16px;
  flex: 1 1 600px;
  padding: 5px;
  margin: 5px;
  height: 100%;

  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: flex-start;
  align-content: flex-start;
`;

const TagView = styled(BookView)``;

const TagWrapper = styled.div`
  flex: 1 1 600px;
  height: auto;
  width: calc(100% - 6px);
  float: left;
  padding: 3px;

  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;
