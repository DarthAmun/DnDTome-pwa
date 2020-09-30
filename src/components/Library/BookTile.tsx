import React, { useCallback, Suspense } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Book from "../../Data/Book";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GiResize } from "react-icons/gi";
import { LoadingSpinner } from "../Loading";

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
      <Suspense fallback={<LoadingSpinner />}>
        {getPicture() !== "" ? (
          <ImageName>
            <Image pic={getPicture()}></Image>
            <b>{book.name}</b>
          </ImageName>
        ) : (
          <Name>
            <b>{book.name}</b>
          </Name>
        )}

        <PropWrapper>
          <Prop>
            <GiResize />
            {book.pages}
          </Prop>
          <Prop>
            {book.path}
          </Prop>
          <WideProp>
            {book.tags}
          </WideProp>
        </PropWrapper>
      </Suspense>
    </Tile>
  );
};

export default BookTile;

const Tile = styled(Link)`
  flex: 1 1 15em;
  color: ${({ theme }) => theme.tile.color};
  background-color: ${({ theme }) => theme.tile.backgroundColor};
  margin: 0.5em;
  border-radius: 3px;
  box-shadow: ${({ theme }) => theme.tile.boxShadow};
  overflow: hidden;
  cursor: pointer;
`;

const Name = styled.div`
  height: auto;
  float: left;
  padding: 10px;
  margin: 0 5px 5px 5px;
  font-size: 14px;
  width: calc(100% - 30px);
  color: var(--card-title-color);
  text-align: center;
  border-radius: 5px;
  box-shadow: inset 0px 0px 5px 0px rgba(0, 0, 0, 0.3);
`;

const ImageName = styled.div`
  height: 40px;
  float: left;
  padding: 10px;
  margin: 0 5px 5px 5px;
  font-size: 14px;
  width: calc(100% - 30px);
  color: var(--card-title-color);
  text-align: center;
  border-radius: 50px 5px 5px 50px;
  box-shadow: inset 0px 0px 5px 0px rgba(0, 0, 0, 0.3);
`;

const PropWrapper = styled.div`
  height: auto;
  width: calc(100% - 10px);
  float: left;
  padding: 5px 5px 0 5px;
  display: flex;
  flex-wrap: wrap;
`;

const Prop = styled.div`
  height: 12px;
  width: calc(50% - 25px);
  margin: 0 0 5px 5px;
  float: left;
  line-height: 10px;
  padding: 10px;
  font-size: 12px;
  border-radius: 5px;
  box-shadow: inset 0px 0px 5px 0px rgba(0, 0, 0, 0.3);
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

  &:nth-child(odd) {
    margin: 0 0 5px 0px;
    width: calc(50% - 20px);
  }

  svg {
    margin-right: 5px;
    height: auto;
    border-radius: 150px;
    color: ${({ theme }) => theme.main.highlight};
  }
}
`;

const WideProp = styled(Prop)`
  margin: 0 0 5px 0px;
  width: calc(100% - 20px);

  &:nth-child(odd) {
    margin: 0 0 5px 0px;
    width: calc(100% - 20px);
  }
`;

const Icon = styled(FontAwesomeIcon)`
  margin-right: 5px;
  width: 20px;
  height: auto;
  border-radius: 150px;
  color: ${({ theme }) => theme.main.highlight};
`;

interface $ImageProps {
  pic: string;
}

const Image = ({ pic }: $ImageProps) => {
  const style = {
    backgroundImage: `url(${pic})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  if (pic !== "") {
    return <ImageElm style={style}></ImageElm>;
  } else {
    return <Empty />;
  }
};

const ImageElm = styled.div`
  margin: -10px 5px -10px -10px;
  height: 57px;
  width: 57px;
  float: left;
  border-radius: 100px;
  border: 3px solid ${({ theme }) => theme.main.highlight};
  box-shadow: 0px 0px 10px 0px rgba(172, 172, 172, 0.2);
  background-color: white;
  overflow: hidden;
`;
const Empty = styled.div``;
