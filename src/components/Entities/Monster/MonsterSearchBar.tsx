import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Filter from "../../Data/Filter";
import ReactDOM from "react-dom";
import { reciveAttributeSelection } from "../../Database/DbService";

import { faSearch, faRedoAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MultipleSelectField from "../FormElements/MultipleSelectField";
import StringField from "../FormElements/StringField";
import IconButton from "../FormElements/IconButton";

interface $Props {
  onSend: (filters: Filter[]) => void;
}

const MonsterSearchBar = ({ onSend }: $Props) => {
  const [open, setOpen] = useState(false);

  const [name, setName] = useState<string>("");
  const [cr, setCr] = useState<string>("");
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
    if (cr !== "") {
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
    setOpen(false);
    onSend(newFilters);
  };

  const reset = () => {
    ReactDOM.unstable_batchedUpdates(() => {
      setName("");
      setCr("");
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
      <StringField value={cr} label="Cr" onChange={(cr: string) => setCr(cr)} />
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
      <StringField
        value={alignment}
        label="Alignment"
        onChange={(alignment: string) => setAlignment(alignment)}
      />
      <StringField
        value={speed}
        label="Speed"
        onChange={(speed: string) => setSpeed(speed)}
      />
      <StringField
        value={skills}
        label="Skills"
        onChange={(skills: string) => setSkills(skills)}
      />
      <StringField
        value={senses}
        label="Senses"
        onChange={(senses: string) => setSenses(senses)}
      />
      <StringField
        value={lang}
        label="Languages"
        onChange={(lang: string) => setLang(lang)}
      />
      <StringField
        value={dmgVulnerabilitie}
        label="Vulnerabilities"
        onChange={(dmgVulnerabilitie: string) => setDmgVulnerabilitie(dmgVulnerabilitie)}
      />
      <StringField
        value={dmgResistance}
        label="Resistances"
        onChange={(dmgResistance: string) => setDmgResistance(dmgResistance)}
      />
      <StringField
        value={dmgImmunities}
        label="Immunities"
        onChange={(dmgImmunities: string) => setDmgImmunities(dmgImmunities)}
      />
      <StringField
        value={conImmunities}
        label="Condition Immunities"
        onChange={(conImmunities: string) => setConImmunities(conImmunities)}
      />
      <StringField
        value={ablt}
        label="Abilities"
        onChange={(ablt: string) => setAblt(ablt)}
      />
      <StringField
        value={sAblt}
        label="Spezial Abilities"
        onChange={(sAblt: string) => setSAblt(sAblt)}
      />
      <StringField
        value={lAblt}
        label="Legendary Abilities"
        onChange={(lAblt: string) => setLAblt(lAblt)}
      />
      <StringField
        value={sources}
        label="Sources"
        onChange={(sources: string) => setSources(sources)}
      />
      <IconButton onClick={() => search()} icon={faSearch} />
      <IconButton onClick={() => reset()} icon={faRedoAlt} />

      <SearchBarButton onClick={() => setOpen(!open)}>
        <FontAwesomeIcon icon={faSearch} /> Search
      </SearchBarButton>
    </Bar>
  );
};

export default MonsterSearchBar;

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
