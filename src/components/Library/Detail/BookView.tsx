import React, { useCallback } from "react";
import styled from "styled-components";
import Book from "../../../Data/Book";

import {
  faExternalLinkAlt,
  faFileDownload,
  faTag,
} from "@fortawesome/free-solid-svg-icons";
import TextButton from "../../FormElements/TextButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

  const showPdf = () => {
    if (navigator.appVersion.toString().indexOf(".NET") > 0) {
      window.navigator.msSaveBlob(book.data, book.name + ".pdf"); // for IE browser
    } else {
      const url = URL.createObjectURL(book.data);
      window.open(url, "_blank");
    }
  };

  const downloadFile = (filename: string) => {
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      navigator.msSaveOrOpenBlob(book.data, filename);
    } else {
      var pdfURL = window.URL.createObjectURL(book.data);
      var a = document.createElement("a");
      a.download = filename;
      a.href = pdfURL;
      a.target = "_blank";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
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
        <TagWrapper>
          {book.tags &&
            book.tags.map((tag: string, index: number) => (
              <Tag key={index}><FontAwesomeIcon icon={faTag} /> {tag}</Tag>
            ))}
        </TagWrapper>
        <TextButton
          onClick={() => showPdf()}
          text={"Show PDF"}
          icon={faExternalLinkAlt}
        />
        <TextButton
          onClick={() => downloadFile(book.name + ".pdf")}
          text={"Downlaod PDF"}
          icon={faFileDownload}
        />
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

const Tag = styled.span`
  display: inline-block;
  background-color: ${({ theme }) => theme.tile.backgroundColorLink};
  border-radius: 5px;
  color: ${({ theme }) => theme.tile.backgroundColor};
  font-size: 10px;
  padding: 10px;
  margin-right: 5px;
`;

const TagWrapper = styled.div`
  flex: 1 1 600px;
  height: auto;
  width: calc(100% - 6px);
  float: left;
  padding: 3px;

  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`;
