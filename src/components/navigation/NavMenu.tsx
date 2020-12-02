import React from "react";
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
} from "@fortawesome/free-solid-svg-icons";
import {
  GiBackpack,
  GiWomanElfFace,
  GiCrystalWand,
  GiPlagueDoctorProfile,
  GiSwordClash,
  GiBookmarklet,
} from "react-icons/gi";
import { BiSelectMultiple } from "react-icons/bi";

interface $Props {
  open: boolean;
}

const NavMenu = ({ open }: $Props) => {
  const location = useLocation();

  return (
    <Menu open={open}>
      <Link
        to="/home"
        className={
          location.pathname === "/home" || location.pathname === "/" ? "menuItemActiv" : ""
        }
      >
        <FontAwesomeIcon icon={faHome} />
        <Tooltip>Home</Tooltip>
      </Link>
      <Seperator />
      <Link
        to="/spell-overview"
        className={location.pathname === "/spell-overview" ? "menuItemActiv" : ""}
      >
        <FontAwesomeIcon icon={faMeteor} />
        <Tooltip>Spells</Tooltip>
      </Link>
      <Link
        to="/item-overview"
        className={location.pathname === "/item-overview" ? "menuItemActiv" : ""}
      >
        <GiCrystalWand />
        <Tooltip>Magic Items</Tooltip>
      </Link>
      <Link
        to="/gear-overview"
        className={location.pathname === "/gear-overview" ? "menuItemActiv" : ""}
      >
        <GiBackpack />
        <Tooltip>Gear</Tooltip>
      </Link>
      <Link
        to="/race-overview"
        className={location.pathname === "/race-overview" ? "menuItemActiv" : ""}
      >
        <GiWomanElfFace />
        <Tooltip>Races</Tooltip>
      </Link>
      <Link
        to="/class-overview"
        className={location.pathname === "/class-overview" ? "menuItemActiv" : ""}
      >
        <GiPlagueDoctorProfile />
        <Tooltip>Classes</Tooltip>
      </Link>
      <Link
        to="/selection-overview"
        className={location.pathname === "/selection-overview" ? "menuItemActiv" : ""}
      >
        <BiSelectMultiple />
        <Tooltip>Selections</Tooltip>
      </Link>
      <Link
        to="/char-overview"
        className={location.pathname === "/char-overview" ? "menuItemActiv" : ""}
      >
        <FontAwesomeIcon icon={faIdCard} />
        <Tooltip>Chars</Tooltip>
      </Link>
      <Seperator />
      <Link
        to="/monster-overview"
        className={location.pathname === "/monster-overview" ? "menuItemActiv" : ""}
      >
        <FontAwesomeIcon icon={faDragon} />
        <Tooltip>Monsters</Tooltip>
      </Link>
      <Link
        to="/encounter-overview"
        className={location.pathname === "/encounter-overview" ? "menuItemActiv" : ""}
      >
        <GiSwordClash />
        <Tooltip>Encounters</Tooltip>
      </Link>
      <Seperator />
      <Link
        to="/randomTable-overview"
        className={location.pathname === "/randomTable-overview" ? "menuItemActiv" : ""}
      >
        <FontAwesomeIcon icon={faTable} />
        <Tooltip>Random Tables</Tooltip>
      </Link>
      <Seperator />
      <Link to="/library" className={location.pathname === "/library" ? "menuItemActiv" : ""}>
        <GiBookmarklet />
        <Tooltip>Library</Tooltip>
      </Link>
      <Seperator />
      <Link to="/statistics" className={location.pathname === "/statistics" ? "menuItemActiv" : ""}>
        <FontAwesomeIcon icon={faChartPie} />
        <Tooltip>Statistics</Tooltip>
      </Link>
      <Link to="/options" className={location.pathname === "/options" ? "menuItemActiv" : ""}>
        <FontAwesomeIcon icon={faCog} />
        <Tooltip>Options</Tooltip>
      </Link>
    </Menu>
  );
};

export default NavMenu;

const Tooltip = styled.span`
  visibility: hidden;
  width: 120px;
  font-size: 16px;
  background-color: ${({ theme }) => theme.main.highlight};
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  left: 150%;
  opacity: 0.6;
  transition: 0.3s;

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    right: 100%;
    margin-top: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent ${({ theme }) => theme.main.highlight} transparent transparent;
  }
`;

type MenuType = {
  open?: boolean;
};

export const Menu = styled.div<MenuType>`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background: ${({ theme }) => theme.main.backgroundColor};
  height: calc(100vh - 2em - 50px);
  text-align: left;
  padding: 1rem;

  overflow: visible;

  position: fixed;
  z-index: 950;
  top: 50px;
  left: 0;

  svg {
    margin-right: 5px;
  }

  @media (max-width: 576px) {
    transition: transform 0.3s ease-in-out;
    transform: ${({ open }) => (open ? "translateX(0)" : "translateX(-100%)")};
  }

  a {
    flex: 1 1 auto;
    max-height: 20px;
    font-size: 20px;
    text-align: center;
    padding: 1rem 0;
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
    ${Tooltip} {
      opacity: 1;
      visibility: visible;
    }
  }

  a.menuItemActiv {
    color: ${({ theme }) => theme.main.highlight};
  }
`;

const Seperator = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.tile.color};
  flex: 1 1 auto;
  min-width: 100%;
  max-height: 0px;
`;
