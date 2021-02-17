import React, { useState } from "react";
import { useHistory } from "react-router";
import ReactDOM from "react-dom";
import { createNewWithId } from "../../../services/DatabaseService";
import Filter from "../../../data/Filter";
import Book from "../../../data/Book";

import { faSearch, faRedoAlt, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IconButton from "../../form_elements/IconButton";
import NumberField from "../../form_elements/NumberField";
import StringSearchField from "../../form_elements/StringSearchField";
import { FixedBar, SearchBar, CreateButton, LeftTooltip } from "../../SearchbarStyle";

const BookSearchBar = () => {
  const [open, setOpen] = useState(false);
  let history = useHistory();

  const [name, setName] = useState<string>("");
  const [tags, setTags] = useState<string>("");
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
    if (tags !== "") {
      newFilters = [...newFilters, new Filter("tags", tags)];
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
    history.push(`/book-overview?filter=${JSON.stringify(newFilters)}`);
  };

  const reset = () => {
    ReactDOM.unstable_batchedUpdates(() => {
      setName("");
      setTags("");
      setPages(-1);
      setOpen(false);
      setSort({
        name: "",
        label: "",
        sort: 0,
      });
    });
    history.push(`/book-overview}`);
  };

  const createNewBook = () => {
    let newBook = new Book();
    delete newBook.id;
    createNewWithId("books", newBook, (id) => {
      history.push(`/book-detail/id/${id}`);
    });
  };

  return (
    <>
      <FixedBar open={open}>
        <StringSearchField
          value={name}
          sort={sort}
          field={"name"}
          label="Name"
          onChange={(name: string, sort: { name: string; label: string; sort: number }) => {
            setName(name);
            setSort(sort);
          }}
        />
        <StringSearchField
          value={tags}
          sort={sort}
          field={"tags"}
          label="Tags"
          onChange={(name: string, sort: { name: string; label: string; sort: number }) => {
            setTags(name);
            setSort(sort);
          }}
        />
        <NumberField value={pages} label="Pages" onChange={(pages: number) => setPages(pages)} />

        <IconButton onClick={() => search()} icon={faSearch} />
        <IconButton onClick={() => reset()} icon={faRedoAlt} />

        <SearchBar onClick={() => setOpen(!open)}>
          <FontAwesomeIcon icon={faSearch} />
        </SearchBar>
      </FixedBar>
      <CreateButton onClick={() => createNewBook()}>
        <FontAwesomeIcon icon={faPlusCircle} />
        <LeftTooltip>Add new</LeftTooltip>
      </CreateButton>
    </>
  );
};

export default BookSearchBar;
