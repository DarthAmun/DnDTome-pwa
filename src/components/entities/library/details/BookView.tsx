import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Book from "../../../../data/Book";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";

import {
  faArrowLeft,
  faArrowRight,
  faExternalLinkAlt,
  faFileDownload,
  faTag,
} from "@fortawesome/free-solid-svg-icons";
import TextButton from "../../../form_elements/TextButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LocalLoadingSpinner } from "../../../Loading";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface $Props {
  book: Book;
}

const BookView = ({ book }: $Props) => {
  const [base, setBase] = useState<string>("");
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);

  useEffect(() => {
    const reader = new FileReader();
    reader.readAsDataURL(book.data);
    reader.onloadend = function () {
      var base64data = reader.result;
      if (base64data !== null) setBase(base64data.toString());
    };
  });

  const showPdf = () => {
    const url = URL.createObjectURL(book.data);
    window.open(url, "_blank");
  };

  const downloadFile = (filename: string) => {
    var pdfURL = window.URL.createObjectURL(book.data);
    var a = document.createElement("a");
    a.download = filename;
    a.href = pdfURL;
    a.target = "_blank";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  const changePage = (offset: number) => {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  };

  const previousPage = () => {
    changePage(-1);
  };

  const nextPage = () => {
    changePage(1);
  };

  const onItemClick = ({ pageNumber: itemPageNumber }: { pageNumber: string }) => {
    setPageNumber(+itemPageNumber);
  };

  return (
    <CenterWrapper>
      <View>
        <DocumentWrapper>
          <div>
            <TextButton
              onClick={nextPage}
              text={"Next"}
              disabled={pageNumber >= numPages}
              icon={faArrowRight}
            />
            <TextButton
              onClick={previousPage}
              text={"Previous"}
              disabled={pageNumber <= 1}
              icon={faArrowLeft}
            />
            Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
          </div>
          <Document
            file={base}
            onLoadSuccess={onDocumentLoadSuccess}
            onItemClick={onItemClick}
            loading={LocalLoadingSpinner}
          >
            <Page pageNumber={pageNumber} loading={LocalLoadingSpinner} />
          </Document>
        </DocumentWrapper>
      </View>
      <View>
        <Name>
          <b>{book.name}</b>
        </Name>
        <TextButton onClick={() => showPdf()} text={"Show PDF"} icon={faExternalLinkAlt} />
        <TextButton
          onClick={() => downloadFile(book.name + ".pdf")}
          text={"Download PDF"}
          icon={faFileDownload}
        />
        <TagWrapper>
          {book.tags &&
            book.tags.map((tag: string, index: number) => (
              <Tag key={index}>
                <FontAwesomeIcon icon={faTag} /> {tag}
              </Tag>
            ))}
        </TagWrapper>
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
  flex: 1 1 600px;
  padding: 5px;
  margin: 5px;
  height: 100%;
  max-width: calc(100% - 20px);

  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;
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
  flex: 1 1 auto;
  height: auto;
  float: left;
  padding: 3px;

  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

const DocumentWrapper = styled.div`
  flex: 1 1 auto;
  max-width: 100%;

  .react-pdf__Document {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
  .react-pdf__Outline {
    flex: 1 1 auto;
    max-height: 600px;
    overflow: hidden;
  }
  .react-pdf__Page {
    flex: 1 1 auto;
    width: 100%;
    max-width: 600px;
    overflow: hidden;
    border-radius: 5px;

    .react-pdf__Page__canvas {
      width: 100% !important;
      height: auto !important;
    }
    .react-pdf__Page__textContent {
      width: 100% !important;
      height: auto !important;
      top: 0 !important;
      left: 0 !important;
      transform: none !important;
    }
  }
`;
