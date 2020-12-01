import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import Filter from "../../../Data/Filter";
import ReactDOM from "react-dom";
import { reciveAttributeSelection, createNewWithId } from "../../../Services/DatabaseService";

import { faSearch, faRedoAlt, faLink, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MultipleSelectField from "../../FormElements/MultipleSelectField";
import StringSearchField from "../../FormElements/StringSearchField";
import IconButton from "../../FormElements/IconButton";
import Monster from "../../../Data/Monster";
import NumberField from "../../FormElements/NumberField";

interface $Props {
  onSend: (filters: Filter[]) => void;
}

const MonsterSearchBar = ({ onSend }: $Props) => {
  const [open, setOpen] = useState(false);
  let history = useHistory();

  const [name, setName] = useState<string>("");
  const [cr, setCr] = useState<number>(-1);
  const [type, setType] = useState<string[]>([]);
  const [typeList, setTypeList] = useState<{ value: string; label: string }[]>(
    []
  );
  const [subtype, setSubType] = useState<string[]>([]);
  const [subtypeList, setSubTypeList] = useState<
    { value: string; label: string }[]
  >([]);
  const [alignment, setAlignment] = useState<string>("");
  const [speed, setSpeed] = useState<string>("");
  const [senses, setSenses] = useState<string>("");
  const [lang, setLang] = useState<string>("");
  const [skills, setSkills] = useState<string>("");
  const [dmgVulnerabilitie, setDmgVulnerabilitie] = useState<string>("");
  const [dmgResistance, setDmgResistance] = useState<string>("");
  const [dmgImmunities, setDmgImmunities] = useState<string>("");
  const [conImmunities, setConImmunities] = useState<string>("");
  const [ablt, setAblt] = useState<string>("");
  const [sAblt, setSAblt] = useState<string>("");
  const [lAblt, setLAblt] = useState<string>("");
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
    reciveAttributeSelection("monsters", "type", function (result) {
      let types = result.map((type) => {
        if (type === "") {
          return { value: type.toString(), label: "Empty" };
        }
        return { value: type.toString(), label: type.toString() };
      });
      setTypeList(types);
    });
    reciveAttributeSelection("monsters", "subtype", function (result) {
      let subtypes = result.map((subtype) => {
        if (subtype === "") {
          return { value: subtype.toString(), label: "Empty" };
        }
        return { value: subtype.toString(), label: subtype.toString() };
      });
      setSubTypeList(subtypes);
    });
  }, []);

  const search = () => {
    let newFilters: Filter[] = [];
    if (name !== "") {
      newFilters = [...newFilters, new Filter("name", name)];
    }
    if (cr !== -1) {
      newFilters = [...newFilters, new Filter("cr", cr)];
    }
    if (alignment !== "") {
      newFilters = [...newFilters, new Filter("alignment", alignment)];
    }
    if (speed !== "") {
      newFilters = [...newFilters, new Filter("speed", speed)];
    }
    if (senses !== "") {
      newFilters = [...newFilters, new Filter("senses", senses)];
    }
    if (lang !== "") {
      newFilters = [...newFilters, new Filter("lang", lang)];
    }
    if (skills !== "") {
      newFilters = [...newFilters, new Filter("skills", skills)];
    }
    if (dmgVulnerabilitie !== "") {
      newFilters = [...newFilters, new Filter("dmgVulnerabilitie", dmgVulnerabilitie)];
    }
    if (dmgResistance !== "") {
      newFilters = [...newFilters, new Filter("dmgResistance", dmgResistance)];
    }
    if (dmgImmunities !== "") {
      newFilters = [...newFilters, new Filter("dmgImmunities", dmgImmunities)];
    }
    if (conImmunities !== "") {
      newFilters = [...newFilters, new Filter("conImmunities", conImmunities)];
    }
    if (ablt !== "") {
      newFilters = [...newFilters, new Filter("ablt", ablt)];
    }
    if (sAblt !== "") {
      newFilters = [...newFilters, new Filter("sAblt", sAblt)];
    }
    if (lAblt !== "") {
      newFilters = [...newFilters, new Filter("lAblt", lAblt)];
    }
    if (sources !== "") {
      newFilters = [...newFilters, new Filter("sources", sources)];
    }

    if (type.length !== 0) {
      newFilters = [...newFilters, new Filter("type", type)];
    }
    if (subtype.length !== 0) {
      newFilters = [...newFilters, new Filter("subtype", subtype)];
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
      setCr(-1);
      setSpeed("");
      setAlignment("");
      setSubType([]);
      setType([]);
      setSkills("");
      setSenses("");
      setLang("");
      setDmgVulnerabilitie("");
      setDmgResistance("");
      setConImmunities("");
      setDmgImmunities("");
      setAblt("");
      setSAblt("");
      setLAblt("");
      setSources("");
      setOpen(false);
      setSort({
        name: "",
        label: "",
        sort: 0,
      });
    });
    onSend([]);
  };

  const createNewMonster = () => {
    let newMonster = new Monster();
    delete newMonster.id;
    createNewWithId("monsters", newMonster, (id) => {
      history.push(`/monster-detail/id/${id}`);
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
      <NumberField value={cr} label="Cr" onChange={(cr: number) => setCr(cr)} />
      <MultipleSelectField
        options={typeList}
        label="Type"
        onChange={(types: string[]) => setType(types)}
      />
      <MultipleSelectField
        options={subtypeList}
        label="Subtype"
        onChange={(subtypes: string[]) => setSubType(subtypes)}
      />
      <StringSearchField
        value={alignment}
        sort={sort}
        field={"alignment"}
        label="Alignment"
        onChange={(
          name: string,
          sort: { name: string; label: string; sort: number }
        ) => {
          setAlignment(name);
          setSort(sort);
        }}
      />
      <StringSearchField
        value={speed}
        sort={sort}
        field={"speed"}
        label="Speed"
        onChange={(
          name: string,
          sort: { name: string; label: string; sort: number }
        ) => {
          setSpeed(name);
          setSort(sort);
        }}
      />
      <StringSearchField
        value={skills}
        sort={sort}
        field={"skills"}
        label="Skills"
        onChange={(
          name: string,
          sort: { name: string; label: string; sort: number }
        ) => {
          setSkills(name);
          setSort(sort);
        }}
      />
      <StringSearchField
        value={senses}
        sort={sort}
        field={"senses"}
        label="Senses"
        onChange={(
          name: string,
          sort: { name: string; label: string; sort: number }
        ) => {
          setSenses(name);
          setSort(sort);
        }}
      />
      <StringSearchField
        value={lang}
        sort={sort}
        field={"lang"}
        label="Languages"
        onChange={(
          name: string,
          sort: { name: string; label: string; sort: number }
        ) => {
          setLang(name);
          setSort(sort);
        }}
      />
      <StringSearchField
        value={dmgVulnerabilitie}
        sort={sort}
        field={"dmgVulnerabilitie"}
        label="Vulnerabilities"
        onChange={(
          name: string,
          sort: { name: string; label: string; sort: number }
        ) => {
          setDmgVulnerabilitie(name);
          setSort(sort);
        }}
      />
      <StringSearchField
        value={dmgResistance}
        sort={sort}
        field={"dmgResistance"}
        label="Resistances"
        onChange={(
          name: string,
          sort: { name: string; label: string; sort: number }
        ) => {
          setDmgResistance(name);
          setSort(sort);
        }}
      />
      <StringSearchField
        value={dmgImmunities}
        sort={sort}
        field={"dmgImmunities"}
        label="Immunities"
        onChange={(
          name: string,
          sort: { name: string; label: string; sort: number }
        ) => {
          setDmgImmunities(name);
          setSort(sort);
        }}
      />
      <StringSearchField
        value={conImmunities}
        sort={sort}
        field={"conImmunities"}
        label="Con. Immun."
        onChange={(
          name: string,
          sort: { name: string; label: string; sort: number }
        ) => {
          setConImmunities(name);
          setSort(sort);
        }}
      />
      <StringSearchField
        value={ablt}
        sort={sort}
        field={"ablt"}
        label="Abilities"
        onChange={(
          name: string,
          sort: { name: string; label: string; sort: number }
        ) => {
          setAblt(name);
          setSort(sort);
        }}
      />
      <StringSearchField
        value={sAblt}
        sort={sort}
        field={"sAblt"}
        label="Spezial Abilities"
        onChange={(
          name: string,
          sort: { name: string; label: string; sort: number }
        ) => {
          setSAblt(name);
          setSort(sort);
        }}
      />
      <StringSearchField
        value={lAblt}
        sort={sort}
        field={"lAblt"}
        label="Legendary Abilities"
        onChange={(
          name: string,
          sort: { name: string; label: string; sort: number }
        ) => {
          setLAblt(name);
          setSort(sort);
        }}
      />
      <StringSearchField
        value={sources}
        sort={sort}
        field={"sources"}
        label="Sources"
        icon={faLink}
        onChange={(
          name: string,
          sort: { name: string; label: string; sort: number }
        ) => {
          setSources(name);
          setSort(sort);
        }}
      />
      <IconButton onClick={() => search()} icon={faSearch} />
      <IconButton onClick={() => reset()} icon={faRedoAlt} />

      <SearchBarButton onClick={() => setOpen(!open)}>
        <FontAwesomeIcon icon={faSearch} /> Search
      </SearchBarButton>
      <CreateButton onClick={() => createNewMonster()}>
        <FontAwesomeIcon icon={faPlusCircle} /> Add Monster
      </CreateButton>
    </Bar>
  );
};

export default MonsterSearchBar;

type SearchMode = {
  open?: boolean;
};

const Bar = styled.div<SearchMode>`
  position: absolute;
  top: 50px;
  left: 90px;
  z-index: 900;

  transition: transform 0.3s ease-in-out;
  transform: ${({ open }) => (open ? "translateY(0)" : "translateY(-100%)")};

  height: auto;
  min-height: 30px;
  min-width: calc(100% - 110px);
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
