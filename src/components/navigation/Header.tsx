import React, { useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import packageJson from "../../../package.json";
import Group from "../../data/campaign/Group";
import Npc from "../../data/campaign/Npc";
import Quest from "../../data/campaign/Quest";
import Gear from "../../data/Gear";
import Item from "../../data/Item";
import Monster from "../../data/Monster";
import Race from "../../data/races/Race";
import Subrace from "../../data/races/Subrace";
import RandomTable from "../../data/RandomTable";
import Spell from "../../data/Spell";
import World from "../../data/world/World";
import Class from "../../data/classes/Class";
import Subclass from "../../data/classes/Subclass";
import Event from "../../data/world/Event";
import Selection from "../../data/Selection";
import Location from "../../data/world/Location";
import LogoImg from "../../logo192.png";
import { createNewWithId } from "../../services/DatabaseService";
import ComandStringField from "../form_elements/ComandStringField";
import Campaign from "../../data/campaign/Campaign";
import IEntity from "../../data/IEntity";
import Feat from "../../data/Feat";
import Background from "../../data/Background";
import { GiRollingDices } from "react-icons/gi";
import { RightTooltip } from "../SearchbarStyle";
import DiceRoller from "../DiceRoller";
import Note from "../../data/Note";

const Header = () => {
  let history = useHistory();
  const [showDiceRoller, setDiceRoller] = useState<boolean>(false);
  const comandNames: string[] = ["new", "edit", "search", "go", "n", "e", "s", "g"];
  const entityNames: string[] = [
    "spell",
    "item",
    "gear",
    "race",
    "class",
    "selection",
    "char",
    "monster",
    "encounter",
    "campagin",
    "quest",
    "group",
    "npc",
    "world",
    "location",
    "event",
    "note",
    "randomTable",
    "feat",
    "background",
  ];

  const entities = {
    campaign: new Campaign(),
    classe: new Class(),
    event: new Event(),
    gear: new Gear(),
    group: new Group(),
    item: new Item(),
    location: new Location(),
    monster: new Monster(),
    npc: new Npc(),
    quest: new Quest(),
    race: new Race(),
    randomTable: new RandomTable(),
    selection: new Selection(),
    spell: new Spell(),
    subclasse: new Subclass(),
    subrace: new Subrace(),
    world: new World(),
    feat: new Feat(),
    background: new Background(),
    note: new Note(),
  };

  const makeComands = (): string[] => {
    let newComands: string[] = [];
    comandNames.forEach((c) => {
      entityNames.forEach((e) => {
        newComands.push(c + " " + e + " 'name'");
      });
    });
    newComands.push("go home");
    newComands.push("go options");
    newComands.push("go statistics");
    newComands.push("help");
    return newComands.sort();
  };

  const makeDefault = (): string[] => {
    let newComands: string[] = [];
    newComands.push("go ...");
    newComands.push("new ...");
    newComands.push("edit ...");
    newComands.push("search ...");
    newComands.push("help");
    return newComands.sort();
  };

  const applyComand = (com: string[]) => {
    if (com[1] === "class") com[1] = com[1] + "e";
    switch (com[0]) {
      case "g":
      case "go":
        if (com[1] === "home") history.push(`/home`);
        else if (com[1] === "statistics") history.push(`/statistics`);
        else if (com[1] === "options") history.push(`/options`);
        else if (com.length > 2)
          history.push(`/${com[1]}-detail/name/${com[2].replaceAll("'", "")}`);
        else history.push(`/${com[1]}-overview`);
        break;
      case "e":
      case "edit":
        history.push(`/${com[1]}-detail/name/${com[2].replaceAll("'", "")}?editMode`);
        break;
      case "n":
      case "new":
        if (com[1] === "char") {
          history.push(`/char-lab?name=${com[2]}`);
        } else {
          let newEntity: IEntity = entities[com[1]];
          delete newEntity.id;
          if (com.length > 2) newEntity.name = com[2];
          createNewWithId(com[1] + "s", newEntity, (id) => {
            history.push(`/${com[1]}-detail/id/${id}`);
          });
        }
        break;
      case "s":
      case "search":
        history.push(
          `/${com[1]}-overview?filter=[{"fieldName":"name","value":"${com[2].replaceAll(
            "'",
            ""
          )}","sort":0}]`
        );
        break;
      case "help":
        history.push(`/help`);
        break;
    }
  };

  return (
    <>
      {showDiceRoller && <DiceRoller />}
      <Bar>
        <NameWrapper>
          <Logo src={LogoImg} />
          <Name>DnDTome</Name>
        </NameWrapper>
        <ComandStringField
          options={makeComands()}
          defaultComands={makeDefault()}
          value={""}
          label=">"
          onChange={applyComand}
        />
        <Roller
          className={showDiceRoller ? "menuItemActiv" : ""}
          onClick={() => setDiceRoller((val) => !val)}
        >
          <GiRollingDices />
          <RightTooltip>Dice Roller</RightTooltip>
        </Roller>
        <HomeCredits>v{packageJson.version}</HomeCredits>
      </Bar>
    </>
  );
};

export default Header;

const Bar = styled.div`
  width: calc(100% - 20px);
  height: 30px;
  line-height: 30px;
  padding: 10px 10px 10px 10px;
  background-color: ${({ theme }) => theme.header.backgroundColor};
  color: ${({ theme }) => theme.header.color};
  box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  position: fixed;
  justify-content: space-between;
  z-index: 1000;
  top: 0px;
  left: 0px;
  right: 0px;

  @media (max-width: 576px) {
    width: calc(100% - 60px);
    padding: 10px 10px 10px 50px;
  }
`;

const NameWrapper = styled.div`
  width: 150px;
  svg {
    float: left;
    font-size: 30px;
    margin-right: 5px;
  }
`;

const Name = styled.div`
  width: 95px;
  height: 30px;
  font-size: 20px;
  font-family: "Quicksand", sans-serif;
  -webkit-font-smoothing: antialiased;
  text-shadow: none;
  line-height: 30px;
  float: left;
  margin-left: 5px;
`;

const HomeCredits = styled.div`
  width: 60px;
  height: 30px;
  font-size: 10px;
  font-family: "Quicksand", sans-serif;
  -webkit-font-smoothing: antialiased;
  text-shadow: none;
  line-height: 30px;
  text-align: center;
`;

const Logo = styled.img`
  height: 30px;
  float: left;
`;

const Roller = styled.div`
  height: 20px;
  font-size: 20px;
  text-align: center;
  margin: 5px;
  cursor: pointer;
  color: ${({ theme }) => theme.tile.color};
  text-decoration: none;
  transition: color 0.3s linear;

  svg {
    padding: 0px;
    margin: 0px;
  }

  &:hover {
    color: ${({ theme }) => theme.tile.color};
    ${RightTooltip} {
      opacity: 1;
      visibility: visible;
    }
  }

  &.menuItemActiv {
    color: ${({ theme }) => theme.main.highlight};
  }
`;
