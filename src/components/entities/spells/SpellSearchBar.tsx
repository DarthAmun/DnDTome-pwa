import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import Filter from "../../../data/Filter";
import ReactDOM from "react-dom";
import {
  reciveAttributeSelection,
  createNewWithId,
  exportFilteredFromTable,
} from "../../../services/DatabaseService";

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
  faPlusCircle,
  faFileExport,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MultipleSelectField from "../../form_elements/MultipleSelectField";
import StringSearchField from "../../form_elements/StringSearchField";
import CheckField from "../../form_elements/CheckField";
import IconButton from "../../form_elements/IconButton";
import Spell from "../../../data/Spell";
import {
  FixedBar,
  FieldGroup,
  SearchBar,
  CreateButton,
  ExportButton,
  LeftTooltip,
} from "../../SearchbarStyle";

const SpellSearchBar = () => {
  let history = useHistory();
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState<Filter[]>([]);

  const [name, setName] = useState<string>("");
  const [school, setSchool] = useState<string[]>([]);
  const [schoolList, setSchoolList] = useState<{ value: string; label: string }[]>([]);
  const [level, setLevel] = useState<number[]>([]);
  const [levelList, setLevelList] = useState<{ value: string; label: string }[]>([]);
  const [ritual, setRitual] = useState<number>(0);
  const [time, setTime] = useState<string>("");
  const [range, setRange] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [components, setComponents] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [classes, setClasses] = useState<string>("");
  const [sources, setSources] = useState<string>("");

  const [sort, setSort] = useState<{
    name: string;
    label: string;
    sort: number;
  }>({
    name: "",
    label: "",
    sort: 0,
  });

  useEffect(() => {
    reciveAttributeSelection("spells", "school", function (result) {
      let schools = result.map((school) => {
        if (school === "") {
          return { value: school.toString(), label: "Empty" };
        }
        return { value: school.toString(), label: school.toString() };
      });
      setSchoolList(schools);
    });
    reciveAttributeSelection("spells", "level", function (result) {
      let levels = result.map((level) => {
        if (level === "") {
          return { value: level.toString(), label: "Empty" };
        }
        return { value: level.toString(), label: level.toString() };
      });
      setLevelList(levels);
    });
  }, []);

  const search = () => {
    let newFilters: Filter[] = [];
    if (name !== "") {
      newFilters = [...newFilters, new Filter("name", name)];
    }
    if (time !== "") {
      newFilters = [...newFilters, new Filter("time", time)];
    }
    if (range !== "") {
      newFilters = [...newFilters, new Filter("range", range)];
    }
    if (duration !== "") {
      newFilters = [...newFilters, new Filter("duration", duration)];
    }
    if (components !== "") {
      newFilters = [...newFilters, new Filter("components", components)];
    }
    if (text !== "") {
      newFilters = [...newFilters, new Filter("text", text)];
    }
    if (classes !== "") {
      newFilters = [...newFilters, new Filter("classes", classes)];
    }
    if (sources !== "") {
      newFilters = [...newFilters, new Filter("sources", sources)];
    }
    if (school.length !== 0) {
      newFilters = [...newFilters, new Filter("school", school)];
    }
    if (level.length !== 0) {
      newFilters = [...newFilters, new Filter("level", level)];
    }
    if (ritual) {
      newFilters = [...newFilters, new Filter("ritual", ritual)];
    }

    newFilters = newFilters.map((filter: Filter) => {
      if (sort.name === filter.fieldName) {
        return { ...filter, sort: sort.sort };
      }
      return filter;
    });

    setFilters(newFilters);
    setOpen(false);
    history.push(`/spell-overview?filter=${JSON.stringify(newFilters)}`);
  };

  const reset = () => {
    ReactDOM.unstable_batchedUpdates(() => {
      setName("");
      setLevel([]);
      setSchool([]);
      setRitual(0);
      setTime("");
      setRange("");
      setDuration("");
      setComponents("");
      setText("");
      setClasses("");
      setSources("");
      setOpen(false);
      setSort({
        name: "",
        label: "",
        sort: 0,
      });
    });
    history.push(`/spell-overview`);
  };

  const createNewSpell = () => {
    let newSpell = new Spell();
    delete newSpell.id;
    createNewWithId("spells", newSpell, (id) => {
      history.push(`/spell-detail/id/${id}`);
    });
  };

  const exportFiltered = () => {
    exportFilteredFromTable("spells", filters, "DnDTome_filtered_spells.json");
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
        <MultipleSelectField
          options={schoolList}
          label="School"
          onChange={(schools: string[]) => setSchool(schools)}
        />
        <FieldGroup>
          <MultipleSelectField
            options={levelList}
            label="Level"
            onChange={(levels: string[]) =>
              setLevel(
                levels.map((level) => {
                  return +level;
                })
              )
            }
          />
          <CheckField
            value={!!ritual}
            label="Ritual"
            onChange={(ritual) => setRitual(ritual ? 1 : 0)}
          />
        </FieldGroup>
        <StringSearchField
          value={time}
          sort={sort}
          field={"time"}
          label="Time"
          icon={faHistory}
          onChange={(time: string, sort: { name: string; label: string; sort: number }) => {
            setTime(time);
            setSort(sort);
          }}
        />
        <StringSearchField
          value={range}
          sort={sort}
          field={"range"}
          label="Range"
          icon={faPowerOff}
          transform={{ rotate: 42 }}
          onChange={(name: string, sort: { name: string; label: string; sort: number }) => {
            setRange(name);
            setSort(sort);
          }}
        />
        <StringSearchField
          value={duration}
          sort={sort}
          field={"duration"}
          label="Duration"
          icon={faHourglassHalf}
          onChange={(name: string, sort: { name: string; label: string; sort: number }) => {
            setDuration(name);
            setSort(sort);
          }}
        />
        <StringSearchField
          value={components}
          sort={sort}
          field={"components"}
          label="Comp."
          icon={faMortarPestle}
          onChange={(name: string, sort: { name: string; label: string; sort: number }) => {
            setComponents(name);
            setSort(sort);
          }}
        />
        <StringSearchField
          value={classes}
          sort={sort}
          field={"classes"}
          label="Classes"
          icon={faUser}
          onChange={(name: string, sort: { name: string; label: string; sort: number }) => {
            setClasses(name);
            setSort(sort);
          }}
        />
        <StringSearchField
          value={sources}
          sort={sort}
          field={"sources"}
          label="Sources"
          icon={faLink}
          onChange={(name: string, sort: { name: string; label: string; sort: number }) => {
            setSources(name);
            setSort(sort);
          }}
        />
        <StringSearchField
          value={text}
          sort={sort}
          field={"text"}
          label="Text"
          icon={faBookOpen}
          onChange={(name: string, sort: { name: string; label: string; sort: number }) => {
            setText(name);
            setSort(sort);
          }}
        />
        <IconButton onClick={() => search()} icon={faSearch} />
        <IconButton onClick={() => reset()} icon={faRedoAlt} />
        <SearchBar onClick={() => setOpen(!open)}>
          <FontAwesomeIcon icon={faSearch} rotation={90} />
        </SearchBar>
      </FixedBar>
      <CreateButton onClick={() => createNewSpell()}>
        <FontAwesomeIcon icon={faPlusCircle} />
        <LeftTooltip>Add new</LeftTooltip>
      </CreateButton>
      <ExportButton onClick={() => exportFiltered()}>
        <FontAwesomeIcon icon={faFileExport} />
        <LeftTooltip>Export filtered</LeftTooltip>
      </ExportButton>
    </>
  );
};

export default SpellSearchBar;
