import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import ReactDOM from "react-dom";
import { createNewWithId } from "../../Services/DatabaseService";
import Filter from "../../Data/Filter";
import Book from "../../Data/Book";

import {
  faSearch,
  faRedoAlt,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IconButton from "../FormElements/IconButton";
import NumberField from "../FormElements/NumberField";
import StringSearchField from "../FormElements/StringSearchField";

interface $Props {
  onSend: (filters: Filter[]) => void;
}

const LibrarySearchBar = ({ onSend }: $Props) => {
  const [open, setOpen] = useState(false);
  let history = useHistory();

  const [name, setName] = useState<string>("");
  const [pages, setPages] = useState<number>(-1);

  const [sort, setSort] = useState<{
    name: string;
    label: string;
    sort: number;
  }>({
    name: "",
    label: "",
    sort: 0,
  });

  const search = () => {
    let newFilters: Filter[] = [];
    if (name !== "") {
      newFilters = [...newFilters, new Filter("name", name)];
    }
    if (pages !== -1) {
      newFilters = [...newFilters, new Filter("cr", pages)];
    }

    newFilters = newFilters.map((filter: Filter) => {
      if (sort.name === filter.fieldName) {
        return { ...filter, sort: sort.sort };
      }
      return filter;
    });

    setOpen(false);
    onSend(newFilters);
  };

  const reset = () => {
    ReactDOM.unstable_batchedUpdates(() => {
      setName("");
      setPages(-1);
      setOpen(false);
      setSort({
        name: "",
        label: "",
        sort: 0,
      });
    });
    onSend([]);
  };

  const createNewBook = () => {
    let newBook = new Book();
    delete newBook.id;
    createNewWithId("books", newBook, (id) => {
      history.push(`/book-detail/id/${id}`);
    });
  };

  return (
    <Bar open={open}>
      <StringSearchField
        value={name}
        sort={sort}
        field={"name"}
        label="Name"
        onChange={(
          name: string,
          sort: { name: string; label: string; sort: number }
        ) => {
          setName(name);
          setSort(sort);
        }}
      />
      <NumberField
        value={pages}
        label="Pages"
        onChange={(pages: number) => setPages(pages)}
      />

      <IconButton onClick={() => search()} icon={faSearch} />
      <IconButton onClick={() => reset()} icon={faRedoAlt} />

      <SearchBarButton onClick={() => setOpen(!open)}>
        <FontAwesomeIcon icon={faSearch} /> Search
      </SearchBarButton>
      <CreateButton onClick={() => createNewBook()}>
        <FontAwesomeIcon icon={faPlusCircle} /> Add Book
      </CreateButton>
    </Bar>
  );
};

export default LibrarySearchBar;

type SearchMode = {
  open?: boolean;
};

const Bar = styled.div<SearchMode>`
  position: absolute;
  top: 50px;
  left: 0px;
  z-index: 900;

  transition: transform 0.3s ease-in-out;
  transform: ${({ open }) => (open ? "translateY(0)" : "translateY(-100%)")};

  height: auto;
  min-height: 30px;
  min-width: calc(100% - 20px);
  padding: 10px;
  background: ${({ theme }) => theme.main.backgroundColor};
  box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.75);
  flex: 1 1;

  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
`;

const SearchBarButton = styled.button`
  position: absolute;
  bottom: -50px;
  left: calc(50% - 130px);

  background-color: ${({ theme }) => theme.buttons.backgroundColor};
  color: ${({ theme }) => theme.buttons.color};
  box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.75);
  border: none;
  border-radius: 5px;
  padding 10px;
  box-sizing:content-box;
  width: 80px;
  height: 20px;
  line-height: 20px;
  cursor: pointer;
`;

const CreateButton = styled(SearchBarButton)`
  left: 50%;
  width: 110px;
  text-decoration: none;
`;
