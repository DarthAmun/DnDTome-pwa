import React, { useState } from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMeteor,
  faCog,
  faDragon,
  faIdCard,
  faChartPie,
  faHome,
  faTable,
  faMapMarkedAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  GiBackpack,
  GiWomanElfFace,
  GiCrystalWand,
  GiPlagueDoctorProfile,
  GiSwordClash,
  GiBookmarklet,
  GiBookshelf,
  GiSolarSystem,
  GiScrollUnfurled,
  GiDjinn,
  GiRollingDices,
} from "react-icons/gi";
import { BiSelectMultiple } from "react-icons/bi";
import { HiUserGroup } from "react-icons/hi";
import { RightTooltip } from "../SearchbarStyle";
import { MdEvent } from "react-icons/md";
import DiceRoller from "../DiceRoller";

interface $Props {
  open: boolean;
}

const NavMenu = ({ open }: $Props) => {
  const location = useLocation();
  const [showDiceRoller, setDiceRoller] = useState<boolean>(false);

  return (
    <>
      {showDiceRoller && <DiceRoller />}
      <Menu open={open}>
        <TopSide>
          <Link
            to="/home"
            className={
              location.pathname === "/home" || location.pathname === "/" ? "menuItemActiv" : ""
            }
          >
            <FontAwesomeIcon icon={faHome} />
            <RightTooltip>Home</RightTooltip>
          </Link>
          <Seperator />
        </TopSide>
        <MiddleSide>
          <LeftSide>
            <Link
              to="/campaign-overview"
              className={location.pathname === "/campaign-overview" ? "menuItemActiv" : ""}
            >
              <GiBookmarklet />
              <RightTooltip>Campaigns</RightTooltip>
            </Link>
            <Link
              to="/quest-overview"
              className={location.pathname === "/quest-overview" ? "menuItemActiv" : ""}
            >
              <GiScrollUnfurled />
              <RightTooltip>Quests</RightTooltip>
            </Link>
            <Link
              to="/group-overview"
              className={location.pathname === "/group-overview" ? "menuItemActiv" : ""}
            >
              <HiUserGroup />
              <RightTooltip>Groups</RightTooltip>
            </Link>
            <Link
              to="/npc-overview"
              className={location.pathname === "/npc-overview" ? "menuItemActiv" : ""}
            >
              <GiDjinn />
              <RightTooltip>Npc's</RightTooltip>
            </Link>
            <Seperator />
            <Link
              to="/world-overview"
              className={location.pathname === "/world-overview" ? "menuItemActiv" : ""}
            >
              <GiSolarSystem />
              <RightTooltip>Worlds</RightTooltip>
            </Link>
            <Link
              to="/location-overview"
              className={location.pathname === "/location-overview" ? "menuItemActiv" : ""}
            >
              <FontAwesomeIcon icon={faMapMarkedAlt} />
              <RightTooltip>Locations</RightTooltip>
            </Link>
            <Link
              to="/event-overview"
              className={location.pathname === "/event-overview" ? "menuItemActiv" : ""}
            >
              <MdEvent />
              <RightTooltip>Events</RightTooltip>
            </Link>
            <Seperator />
            <Link
              to="/randomTable-overview"
              className={location.pathname === "/randomTable-overview" ? "menuItemActiv" : ""}
            >
              <FontAwesomeIcon icon={faTable} />
              <RightTooltip>Random Tables</RightTooltip>
            </Link>
            <Seperator />
            <Link
              to="/book-overview"
              className={location.pathname === "/book-overview" ? "menuItemActiv" : ""}
            >
              <GiBookshelf />
              <RightTooltip>Library</RightTooltip>
            </Link>
          </LeftSide>
          <RightSide>
            <Link
              to="/spell-overview"
              className={location.pathname === "/spell-overview" ? "menuItemActiv" : ""}
            >
              <FontAwesomeIcon icon={faMeteor} />
              <RightTooltip>Spells</RightTooltip>
            </Link>
            <Link
              to="/item-overview"
              className={location.pathname === "/item-overview" ? "menuItemActiv" : ""}
            >
              <GiCrystalWand />
              <RightTooltip>Magic Items</RightTooltip>
            </Link>
            <Link
              to="/gear-overview"
              className={location.pathname === "/gear-overview" ? "menuItemActiv" : ""}
            >
              <GiBackpack />
              <RightTooltip>Gear</RightTooltip>
            </Link>
            <Link
              to="/race-overview"
              className={location.pathname === "/race-overview" ? "menuItemActiv" : ""}
            >
              <GiWomanElfFace />
              <RightTooltip>Races</RightTooltip>
            </Link>
            <Link
              to="/classe-overview"
              className={location.pathname === "/classe-overview" ? "menuItemActiv" : ""}
            >
              <GiPlagueDoctorProfile />
              <RightTooltip>Classes</RightTooltip>
            </Link>
            <Link
              to="/selection-overview"
              className={location.pathname === "/selection-overview" ? "menuItemActiv" : ""}
            >
              <BiSelectMultiple />
              <RightTooltip>Selections</RightTooltip>
            </Link>
            <Link
              to="/char-overview"
              className={location.pathname === "/char-overview" ? "menuItemActiv" : ""}
            >
              <FontAwesomeIcon icon={faIdCard} />
              <RightTooltip>Chars</RightTooltip>
            </Link>
            <Seperator />
            <Link
              to="/monster-overview"
              className={location.pathname === "/monster-overview" ? "menuItemActiv" : ""}
            >
              <FontAwesomeIcon icon={faDragon} />
              <RightTooltip>Monsters</RightTooltip>
            </Link>
            <Link
              to="/encounter-overview"
              className={location.pathname === "/encounter-overview" ? "menuItemActiv" : ""}
            >
              <GiSwordClash />
              <RightTooltip>Encounters</RightTooltip>
            </Link>
          </RightSide>
        </MiddleSide>
        <BottomSide>
          <Seperator />
          <Roller
            className={showDiceRoller ? "menuItemActiv" : ""}
            onClick={() => setDiceRoller((val) => !val)}
          >
            <GiRollingDices />
            <RightTooltip>Dice Roller</RightTooltip>
          </Roller>
          <Seperator />
          <Link
            to="/statistics"
            className={location.pathname === "/statistics" ? "menuItemActiv" : ""}
          >
            <FontAwesomeIcon icon={faChartPie} />
            <RightTooltip>Statistics</RightTooltip>
          </Link>
          <Link to="/options" className={location.pathname === "/options" ? "menuItemActiv" : ""}>
            <FontAwesomeIcon icon={faCog} />
            <RightTooltip>Options</RightTooltip>
          </Link>
        </BottomSide>
      </Menu>
    </>
  );
};

export default NavMenu;

type MenuType = {
  open?: boolean;
};

export const Menu = styled.div<MenuType>`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  background: ${({ theme }) => theme.main.backgroundColor};
  height: calc(100vh - 1.5em - 55px);
  text-align: center;
  padding: 1rem;

  overflow: visible;

  position: fixed;
  z-index: 950;
  top: 50px;
  left: 0;

  @media (max-width: 576px) {
    transition: transform 0.3s ease-in-out;
    transform: ${({ open }) => (open ? "translateX(0)" : "translateX(-100%)")};
  }
`;

const Roller = styled.div`
  flex: 1 1 auto;
  max-height: 20px;
  font-size: 20px;
  text-align: center;
  padding: 0.75rem 0;
  cursor: pointer;
  color: ${({ theme }) => theme.tile.color};
  text-decoration: none;
  transition: color 0.3s linear;

  position: relative;
  display: inline-block;

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

const Seperator = styled.div`
  border-bottom: 2px solid ${({ theme }) => theme.tile.backgroundColor};
  flex: 1 1 auto;
  min-width: 100%;
  max-height: 0px;
  margin-top: -1px;
  margin-bottom: -1px;
`;

const TopSide = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: calc(100% - 10px);

  svg {
    margin-right: 5px;
  }

  a {
    flex: 1 1 auto;
    max-height: 20px;
    font-size: 20px;
    text-align: center;
    padding: 0.75rem 0;
    color: ${({ theme }) => theme.tile.color};
    text-decoration: none;
    transition: color 0.3s linear;

    position: relative;
    display: inline-block;

    svg {
      padding: 0px;
      margin: 0px;
    }
  }

  a:hover {
    color: ${({ theme }) => theme.tile.color};
    ${RightTooltip} {
      opacity: 1;
      visibility: visible;
    }
  }

  a.menuItemActiv {
    color: ${({ theme }) => theme.main.highlight};
  }
`;
const MiddleSide = styled.div``;
const BottomSide = styled(TopSide)``;
const LeftSide = styled(TopSide)`
  width: 32px;
  float: left;
`;
const RightSide = styled(LeftSide)`
  margin-left: 5px;
  padding-left: 5px;
  border-left: 2px solid ${({ theme }) => theme.tile.backgroundColor};
`;
