import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Filter from "../../Data/Filter";
import ReactDOM from "react-dom";
import StringField from "../FormElements/StringField";
import CheckField from "../FormElements/CheckField";

import {
  faHourglassHalf,
  faMortarPestle,
  faHistory,
  faPowerOff,
  faUser,
  faLink,
  faBookOpen,
  faSearch,
  faRedoAlt,
} from "@fortawesome/free-solid-svg-icons";
import IconButton from "../FormElements/IconButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MultipleSelectField from "../FormElements/MultipleSelectField";
import { reciveAttributeSelection } from "../../Database/DbService";

interface $Props {
  onSend: (filters: Filter[]) => void;
}

const GearSearchBar = ({ onSend }: $Props) => {
  const [open, setOpen] = useState(false);

  const [name, setName] = useState<string>("");
  // const [school, setSchool] = useState<string[]>([]);
  // const [schoolList, setSchoolList] = useState<
  //   { value: string; label: string }[]
  // >([]);

  useEffect(() => {
    // reciveAttributeSelection("gears", "school", function (result) {
    //   let schools = result.map((school) => {
    //     if (school === "") {
    //       return { value: school.toString(), label: "Empty" };
    //     }
    //     return { value: school.toString(), label: school.toString() };
    //   });
    //   setSchoolList(schools);
    // });
  }, []);

  const search = () => {
    let newFilters: Filter[] = [];
    if (name !== "") {
      newFilters = [...newFilters, new Filter("name", name)];
    }

    // if (school.length !== 0) {
    //   newFilters = [...newFilters, new Filter("school", school)];
    // }
    setOpen(false);
    onSend(newFilters);
  };

  const reset = () => {
    ReactDOM.unstable_batchedUpdates(() => {
      setName("");
      // setSchool([]);

      setOpen(false);
    });
    onSend([]);
  };

  return (
    <Bar open={open}>
      <StringField
        value={name}
        label="Name"
        onChange={(name: string) => setName(name)}
      />
      {/* <MultipleSelectField
        options={schoolList}
        label="School"
        onChange={(schools: string[]) => setSchool(schools)}
      /> */}
      <IconButton onClick={() => search()} icon={faSearch} />
      <IconButton onClick={() => reset()} icon={faRedoAlt} />

      <SearchBarButton onClick={() => setOpen(!open)}>
        <FontAwesomeIcon icon={faSearch} /> Search
      </SearchBarButton>
    </Bar>
  );
};

export default GearSearchBar;

type SearchMode = {
  open?: boolean;
};

const Bar = styled.div<SearchMode>`
  position: absolute;
  top: 4rem;
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
  left: calc(50% - 50px);

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

const FieldGroup = styled.div`
  flex: 2 1 auto;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;
`;
