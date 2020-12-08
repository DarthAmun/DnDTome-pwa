import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import styled from "styled-components";
import Book from "../../../data/Book";
import Filter from "../../../data/Filter";
import { reciveAllFiltered } from "../../../services/DatabaseService";

import AppWrapper from "../../AppWrapper";
import { LoadingSpinner } from "../../Loading";
import BookTile from "./BookTile";
import LibrarySearchBar from "./LibrarySearchBar";

const Library = () => {
  const [filters, setFilter] = useState<Filter[]>([]);
  const [allBooks, setAllBooks] = useState<Book[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [scrollParam, setParam] = useState<{
    start: number;
    end: number;
    hasMore: boolean;
  }>({
    start: 100,
    end: 120,
    hasMore: true,
  });

  useEffect(() => {
    reciveAllFiltered("books", filters, (results: any[]) => {
      setAllBooks(results);
      setBooks(results.slice(0, 100));
      if (results.length === 0) {
        setParam({
          start: 0,
          end: 0,
          hasMore: false,
        });
      }
    });
  }, [filters]);

  const fetchMoreData = () => {
    if (books.length === allBooks.length) {
      setParam({
        start: scrollParam.start + 20,
        end: scrollParam.end + 20,
        hasMore: false,
      });
      return;
    }
    setBooks((s) =>
      s.concat(allBooks.slice(scrollParam.start, scrollParam.end))
    );
    setParam({
      start: scrollParam.start + 20,
      end: scrollParam.end + 20,
      hasMore: true,
    });
  };

  return (
    <AppWrapper>
      <LibrarySearchBar onSend={(filterArray) => setFilter(filterArray)} />
      <div id="scrollable" style={{ width: "100%" }}>
        <LibraryContainer
          dataLength={books.length}
          next={fetchMoreData}
          hasMore={scrollParam.hasMore}
          loader={<LoadingSpinner />}
        >
          {books!.map((book: Book, index: number) => {
            return <BookTile key={index} book={book}></BookTile>;
          })}
        </LibraryContainer>
      </div>
    </AppWrapper>
  );
};

export default Library;

const LibraryContainer = styled(InfiniteScroll)`
  margin-top: 20px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
`;
