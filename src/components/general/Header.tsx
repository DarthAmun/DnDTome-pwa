import { useState } from "react";
import { useHistory } from "react-router";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { CgMenuGridO } from "react-icons/cg";
import { FaUser, FaTerminal, FaCogs } from "react-icons/fa";
import LogoImg from "../../logo192.png";
import { AutoComplete, Drawer, InputGroup, Tooltip, Whisper } from "rsuite";
import IEntity from "../../data/IEntity";
import { createNewWithId } from "../../services/DatabaseService";
import Class from "../../data/classes/Class";
import Background from "../../data/Background";
import Campaign from "../../data/campaign/Campaign";
import Npc from "../../data/campaign/Npc";
import Quest from "../../data/campaign/Quest";
import Subclass from "../../data/classes/Subclass";
import Feat from "../../data/Feat";
import Gear from "../../data/Gear";
import Item from "../../data/Item";
import Monster from "../../data/Monster";
import Note from "../../data/Note";
import Race from "../../data/races/Race";
import Subrace from "../../data/races/Subrace";
import RandomTable from "../../data/RandomTable";
import Spell from "../../data/Spell";
import World from "../../data/world/World";
import Event from "../../data/world/Event";
import Group from "../../data/campaign/Group";
import Location from "../../data/world/Location";
import Selection from "../../data/Selection";
import packageJson from "../../../package.json";
import Menu from "../pages/Menu";

const Header = () => {
  let history = useHistory();
  let location = useLocation();
  const [showMenu, openMenu] = useState<boolean>(false);

  const [code, setCode] = useState<string>("");
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

  const entities: any = {
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

  const makeComands = (): any[] => {
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

  const applyComand = () => {
    let com: string[] = code.split(" ");
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
    <HeaderBar>
      <Drawer size={"xs"} open={showMenu} onClose={() => openMenu(false)} placement={"right"}>
        <Drawer.Header>
          <Drawer.Title>Menu</Drawer.Title>
          <Version>v{packageJson.version}</Version>
        </Drawer.Header>
        <Drawer.Body>
          <Menu show={openMenu} />
        </Drawer.Body>
      </Drawer>

      <HeaderElm>
        <Logo src={LogoImg} />
        <Reducable>DnDTome</Reducable>
      </HeaderElm>
      <HeaderElm reducable>
        <Whisper
          trigger="focus"
          placement={"bottom"}
          speaker={<Tooltip>Type in fast commands</Tooltip>}
        >
          <InputGroup inside>
            <AutoComplete
              data={makeComands()}
              value={code}
              onChange={setCode}
              onKeyPress={(e: any) => {
                if (e.key === "Enter") {
                  applyComand();
                }
              }}
            />
            <InputGroup.Button onClick={() => applyComand()}>
              <FaTerminal />
            </InputGroup.Button>
          </InputGroup>
        </Whisper>
      </HeaderElm>
      <HeaderElm right>
        <NavElm
          active={location.pathname !== "/group" && location.pathname !== "/options"}
          onClick={() => openMenu(true)}
        >
          <CgMenuGridO />
        </NavElm>
        <NavElm active={location.pathname === "/group"} onClick={() => history.push("/group")}>
          <FaUser />
        </NavElm>
        <NavElm active={location.pathname === "/options"} onClick={() => history.push("/options")}>
          <FaCogs />
        </NavElm>
      </HeaderElm>
    </HeaderBar>
  );
};

export default Header;

const HeaderBar = styled.div`
  width: 100%;
  height: 70px;
  padding: 10px;
  display: flex;
  gap: 10px;
  background-color: ${({ theme }) => theme.secondColor};
  color: ${({ theme }) => theme.textColor};
`;

const HeaderElm = styled.div<{ right?: boolean; reducable?: boolean }>`
  flex: 1 1;
  font-size: 30px;
  line-height: 50px;

  display: flex;
  align-items: center;
  gap: 10px;
  ${(props) => (props.right ? "justify-content: flex-end;text-align: right;min-width: 230px;" : "")}

  ${(props) =>
    props.reducable ? "@media only screen and (max-width: 500px) {display: none;}" : ""}
`;

const Logo = styled.img`
  margin-top: 0px;
  margin-right: 0px;
  height: 50px;
`;

const Version = styled.span`
  line-height: 36px;
`;

const NavElm = styled.div<{ active?: boolean }>`
  flex: 1 1;
  max-width: 70px;
  height: 40px;
  text-align: center;
  cursor: pointer;

  ${(props) => {
    if (props.active) {
      return `color: ${props.theme.highlight}`;
    } else {
      return `color: ${props.theme.textColor}`;
    }
  }}
`;

const Reducable = styled.div`
  @media only screen and (max-width: 500px) {
    display: none;
  }
`;
