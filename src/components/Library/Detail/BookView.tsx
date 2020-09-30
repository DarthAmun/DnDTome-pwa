import React, { useCallback, useEffect } from "react";

import styled from "styled-components";
import Book from "../../../Data/Book";

interface $Props {
  book: Book;
}

const BookView = ({ book }: $Props) => {
  const getPicture = useCallback(() => {
    if (book !== undefined) {
      if (book.cover === "" || book.cover === null) {
        return "";
      }
      return book.cover;
    }
    return "";
  }, [book]);

  useEffect(() => {
    loadData(book.path);
  }, []);

  const loadData = (url: string) => {
    fetch(url)
      .then(function (response) {
        console.log(url + " -> " + response.ok);
        return response.body;
      })
      .then(function (data: any) {
        console.log("data: ", data);
      })
      .catch(function (err) {
        console.log("failed to load ", url, err.stack);
      });
  };

  return (
    <CenterWrapper>
      {getPicture() !== "" ? (
        <ImageView>
          <Image pic={getPicture()}></Image>
        </ImageView>
      ) : (
        ""
      )}
      <View>
        <Name>
          <b>{book.name}</b>
        </Name>
        <Link href={`${book.path}`} target="_blank">
          Link
        </Link>
      </View>
    </CenterWrapper>
  );
};

export default BookView;

const CenterWrapper = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const View = styled.div`
  color: ${({ theme }) => theme.tile.color};
  font-size: 16px;
  flex: 1 1 auto;
  max-width: 600px;
  padding: 5px;
  margin: 5px;
  height: 100%;

  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;
`;

const ImageView = styled(View)`
  justify-content: flex-end;
  flex: 1 1 300px;
`;

const Name = styled.div`
  height: auto;
  float: left;
  padding: 10px;
  margin: 5px 5px 10px 5px;
  width: calc(100% - 30px);
  color: var(--card-title-color);
  text-align: center;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.tile.backgroundColor};
`;

interface $ImageProps {
  pic: string;
}

const Image = ({ pic }: $ImageProps) => {
  if (pic !== "") {
    return <ImageElm src={pic}></ImageElm>;
  } else {
    return <Empty />;
  }
};

const ImageElm = styled.img`
  margin: 5px;
  max-height: 60vh;
`;
const Empty = styled.div``;

const Link = styled.a`
  display: inline-block;
  background-color: ${({ theme }) => theme.tile.backgroundColorLink};
  border-radius: 5px;
  text-decoration: none;
  color: ${({ theme }) => theme.tile.backgroundColor};
  font-size: 10px;
  text-decoration: none;
  padding: 0px 5px 0px 5px;
  cursor: pointer;
`;
