import React from "react";
import styled from "styled-components";
import Book from "../../../Data/Book";

import {
  faLink,
  faImage,
} from "@fortawesome/free-solid-svg-icons";
import NumberField from "../../FormElements/NumberField";
import StringField from "../../FormElements/StringField";

interface $Props {
  book: Book;
  onEdit: (value: Book) => void;
}

const BookEditView = ({ book, onEdit }: $Props) => {
  return (
    <CenterWrapper>
      <BookView>
        <StringField
          value={book.name}
          label="Name"
          onChange={(name) => onEdit({ ...book, name: name })}
        />
        <StringField
          value={book.path}
          label="Path"
          onChange={(path) => onEdit({ ...book, path: path })}
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
