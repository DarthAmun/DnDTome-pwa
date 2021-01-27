import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Book from "../../../data/Book";

import { GiResize } from "react-icons/gi";
import { faTags } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface $Props {
  book: Book;
}

const BookTile = ({ book }: $Props) => {
  const getPicture = useCallback(() => {
    if (book !== undefined) {
      if (book.cover === "" || book.cover === null) {
        return "";
      }
      return book.cover;
    }
    return "";
  }, [book]);

  return (
    <Tile to={"/book-detail/id/" + book.id}>
      {getPicture() !== "" ? <Image pic={getPicture()}></Image> : ""}
      <PropWrapper>
        <Name>
          <b>{book.name}</b>
        </Name>

        <PropRowWrapper>
          <RowProp>
            <GiResize />
            {book.pages}
          </RowProp>
          <RowProp>
            <FontAwesomeIcon icon={faTags} />
            {book.tags &&
              book.tags.map((tag: string, index: number) => <Tag key={index}>{tag}</Tag>)}
          </RowProp>
        </PropRowWrapper>
      </PropWrapper>
    </Tile>
  );
};

export default BookTile;

const Tile = styled(Link)`
  flex: 1 1 15em;
  color: ${({ theme }) => theme.tile.color};
  background-color: ${({ theme }) => theme.tile.backgroundColor};
  margin: 0.5em;
  border-radius: 10px;
  box-shadow: ${({ theme }) => theme.tile.boxShadow};
  overflow: hidden;
  cursor: pointer;
  text-decoration: none;

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: center;
`;

const Name = styled.div`
  height: auto;
  flex: 1 1 auto;
  padding: 10px;
  margin: 5px 5px 5px 0;
  font-size: 14px;
  color: ${({ theme }) => theme.tile.headerColor};
  text-align: center;
  border-radius: 5px;
`;

const PropWrapper = styled.div`
  height: auto;
  width: calc(100% - 10px);
  float: left;
  padding: 5px 5px 0 5px;
  display: flex;
  flex-wrap: wrap;
`;
const PropRowWrapper = styled(PropWrapper)`
  flex-wrap: nowrap;
  padding: 0 0 5px 0;
  flex: 1 1 auto;
  width: 100%;
`;

const RowProp = styled.div`
  height: 12px;
  margin: 0 5px 0 0;
  flex: 1 1 auto;
  line-height: 10px;
  padding: 10px;
  font-size: 12px;
  border-radius: 5px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

  svg {
    margin-right: 5px;
    height: auto;
    border-radius: 150px;
    transition: color 0.2s;
    color: ${({ theme }) => theme.main.highlight};
  }
}
`;

interface $ImageProps {
  pic: string;
}

const Image = ({ pic }: $ImageProps) => {
  if (pic !== "") {
    return (
      <ImgContainer>
        <ImageElm src={pic}></ImageElm>
      </ImgContainer>
    );
  } else {
    return <Empty />;
  }
};

const ImgContainer = styled.div`
  margin: 5px;
`;
const ImageElm = styled.img`
  max-width: 200px;
  max-height: 200px;
`;
const Empty = styled.div``;

const Tag = styled.span`
  display: inline-block;
  background-color: ${({ theme }) => theme.tile.backgroundColorLink};
  border-radius: 5px;
  color: ${({ theme }) => theme.tile.backgroundColor};
  font-size: 10px;
  padding: 5px;
  margin-top: -5px;
  margin-right: 5px;
`;
