import React, { useState } from "react";
import ReactDOM from "react-dom";
import Filter from "../../../data/Filter";

import { faSearch, faRedoAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IconButton from "../../form_elements/IconButton";
import StringField from "../../form_elements/StringField";
import { Bar, SearchBar } from "../../SearchbarStyle";

interface $Props {
  hasTitle: boolean;
  onSend: (filters: Filter[]) => void;
}

const NoteSearchBar = ({ hasTitle, onSend }: $Props) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [tags, setTags] = useState<string>("");

  const search = () => {
    let newFilters: Filter[] = [];
    if (title !== "") {
      newFilters = [...newFilters, new Filter("title", title)];
    }
    if (content !== "") {
      newFilters = [...newFilters, new Filter("content", content)];
    }
    if (tags !== "") {
      newFilters = [...newFilters, new Filter("tags", tags)];
    }
    setOpen(false);
    onSend(newFilters);
  };

  const reset = () => {
    ReactDOM.unstable_batchedUpdates(() => {
      setTitle("");
      setContent("");
      setTags("");
      setOpen(false);
    });
    onSend([]);
  };

  return (
    <>
      <Bar open={open}>
        {hasTitle && <StringField value={title} label="Title" onChange={(title: string) => setTitle(title)} />}
        <StringField
          value={content}
          label="Content"
          onChange={(content: string) => setContent(content)}
        />
        <StringField value={tags} label="Tags" onChange={(tags: string) => setTags(tags)} />
        <IconButton onClick={() => search()} icon={faSearch} />
        <IconButton onClick={() => reset()} icon={faRedoAlt} />

        <SearchBar onClick={() => setOpen(!open)}>
          <FontAwesomeIcon icon={faSearch} />
        </SearchBar>
      </Bar>
    </>
  );
};

export default NoteSearchBar;
