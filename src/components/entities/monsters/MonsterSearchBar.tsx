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
  faSearch,
  faRedoAlt,
  faLink,
  faPlusCircle,
  faFileExport,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MultipleSelectField from "../../form_elements/MultipleSelectField";
import StringSearchField from "../../form_elements/StringSearchField";
import IconButton from "../../form_elements/IconButton";
import Monster from "../../../data/Monster";
import NumberField from "../../form_elements/NumberField";
import { FixedBar, SearchBar, CreateButton, ExportButton, LeftTooltip } from "../../SearchbarStyle";

const MonsterSearchBar = () => {
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState<Filter[]>([]);
  let history = useHistory();

  const [name, setName] = useState<string>("");
  const [cr, setCr] = useState<number>(-1);
  const [type, setType] = useState<string[]>([]);
  const [typeList, setTypeList] = useState<{ value: string; label: string }[]>([]);
  const [subtype, setSubType] = useState<string[]>([]);
  const [subtypeList, setSubTypeList] = useState<{ value: string; label: string }[]>([]);
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
    setFilters(newFilters);
    setOpen(false);
    history.push(`/monster-overview?filter=${JSON.stringify(newFilters)}`);
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
    history.push(`/monster-overview}`);
  };

  const createNewMonster = () => {
    let newMonster = new Monster();
    delete newMonster.id;
    createNewWithId("monsters", newMonster, (id) => {
      history.push(`/monster-detail/id/${id}`);
    });
  };

  const exportFiltered = () => {
    exportFilteredFromTable("monsters", filters, "DnDTome_filtered_monsters.json");
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
          onChange={(name: string, sort: { name: string; label: string; sort: number }) => {
            setAlignment(name);
            setSort(sort);
          }}
        />
        <StringSearchField
          value={speed}
          sort={sort}
          field={"speed"}
          label="Speed"
          onChange={(name: string, sort: { name: string; label: string; sort: number }) => {
            setSpeed(name);
            setSort(sort);
          }}
        />
        <StringSearchField
          value={skills}
          sort={sort}
          field={"skills"}
          label="Skills"
          onChange={(name: string, sort: { name: string; label: string; sort: number }) => {
            setSkills(name);
            setSort(sort);
          }}
        />
        <StringSearchField
          value={senses}
          sort={sort}
          field={"senses"}
          label="Senses"
          onChange={(name: string, sort: { name: string; label: string; sort: number }) => {
            setSenses(name);
            setSort(sort);
          }}
        />
        <StringSearchField
          value={lang}
          sort={sort}
          field={"lang"}
          label="Languages"
          onChange={(name: string, sort: { name: string; label: string; sort: number }) => {
            setLang(name);
            setSort(sort);
          }}
        />
        <StringSearchField
          mobile={false}
          value={dmgVulnerabilitie}
          sort={sort}
          field={"dmgVulnerabilitie"}
          label="Vulnerabilities"
          onChange={(name: string, sort: { name: string; label: string; sort: number }) => {
            setDmgVulnerabilitie(name);
            setSort(sort);
          }}
        />
        <StringSearchField
          mobile={false}
          value={dmgResistance}
          sort={sort}
          field={"dmgResistance"}
          label="Resistances"
          onChange={(name: string, sort: { name: string; label: string; sort: number }) => {
            setDmgResistance(name);
            setSort(sort);
          }}
        />
        <StringSearchField
          mobile={false}
          value={dmgImmunities}
          sort={sort}
          field={"dmgImmunities"}
          label="Immunities"
          onChange={(name: string, sort: { name: string; label: string; sort: number }) => {
            setDmgImmunities(name);
            setSort(sort);
          }}
        />
        <StringSearchField
          mobile={false}
          value={conImmunities}
          sort={sort}
          field={"conImmunities"}
          label="Con. Immun."
          onChange={(name: string, sort: { name: string; label: string; sort: number }) => {
            setConImmunities(name);
            setSort(sort);
          }}
        />
        <StringSearchField
          mobile={false}
          value={ablt}
          sort={sort}
          field={"ablt"}
          label="Abilities"
          onChange={(name: string, sort: { name: string; label: string; sort: number }) => {
            setAblt(name);
            setSort(sort);
          }}
        />
        <StringSearchField
          mobile={false}
          value={sAblt}
          sort={sort}
          field={"sAblt"}
          label="Spezial Abilities"
          onChange={(name: string, sort: { name: string; label: string; sort: number }) => {
            setSAblt(name);
            setSort(sort);
          }}
        />
        <StringSearchField
          mobile={false}
          value={lAblt}
          sort={sort}
          field={"lAblt"}
          label="Legendary Abilities"
          onChange={(name: string, sort: { name: string; label: string; sort: number }) => {
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
          onChange={(name: string, sort: { name: string; label: string; sort: number }) => {
            setSources(name);
            setSort(sort);
          }}
        />
        <IconButton onClick={() => search()} icon={faSearch} />
        <IconButton onClick={() => reset()} icon={faRedoAlt} />

        <SearchBar onClick={() => setOpen(!open)}>
          <FontAwesomeIcon icon={faSearch} />
        </SearchBar>
      </FixedBar>
      <CreateButton onClick={() => createNewMonster()}>
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

export default MonsterSearchBar;
