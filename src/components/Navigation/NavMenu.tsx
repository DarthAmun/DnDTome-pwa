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
          location.pathname === "/home" || location.pathname === "/"
            ? "menuItemActiv"
            : ""
        }
      >
        <FontAwesomeIcon icon={faHome} />
        Home
      </Link>
      <Seperator />
      <Link
        to="/spell-overview"
        className={
          location.pathname === "/spell-overview" ? "menuItemActiv" : ""
        }
      >
        <FontAwesomeIcon icon={faMeteor} />
        Spells
      </Link>
      <Link
        to="/item-overview"
        className={
          location.pathname === "/item-overview" ? "menuItemActiv" : ""
        }
      >
        <GiCrystalWand />
        Magic Items
      </Link>
      <Link
        to="/gear-overview"
        className={
          location.pathname === "/gear-overview" ? "menuItemActiv" : ""
        }
      >
        <GiBackpack />
        Gear
      </Link>
      <Link
        to="/race-overview"
        className={
          location.pathname === "/race-overview" ? "menuItemActiv" : ""
        }
      >
        <GiWomanElfFace />
        Races
      </Link>
      <Link
        to="/class-overview"
        className={
          location.pathname === "/class-overview" ? "menuItemActiv" : ""
        }
      >
        <GiPlagueDoctorProfile />
        Classes
      </Link>
      <Link
        to="/selection-overview"
        className={
          location.pathname === "/selection-overview" ? "menuItemActiv" : ""
        }
      >
        <BiSelectMultiple />
        Selections
      </Link>
      <Link
        to="/char-overview"
        className={
          location.pathname === "/char-overview" ? "menuItemActiv" : ""
        }
      >
        <FontAwesomeIcon icon={faIdCard} />
        Chars
      </Link>
      <Seperator />
      <Link
        to="/monster-overview"
        className={
          location.pathname === "/monster-overview" ? "menuItemActiv" : ""
        }
      >
        <FontAwesomeIcon icon={faDragon} />
        Monsters
      </Link>
      <Link
        to="/encounter-overview"
        className={
          location.pathname === "/encounter-overview" ? "menuItemActiv" : ""
        }
      >
        <GiSwordClash />
        Encounters
      </Link>
      <Seperator />
      <Link
        to="/randomTable-overview"
        className={
          location.pathname === "/randomTable-overview" ? "menuItemActiv" : ""
        }
      >
        <FontAwesomeIcon icon={faTable} />
        Random Tables
      </Link>
      <Seperator />
      <Link
        to="/library"
        className={location.pathname === "/library" ? "menuItemActiv" : ""}
      >
        <GiBookmarklet />
        Library
      </Link>
      <Seperator />
      <Link
        to="/options"
        className={location.pathname === "/options" ? "menuItemActiv" : ""}
      >
        <FontAwesomeIcon icon={faCog} />
        Options
      </Link>
      <Link
        to="/statistics"
        className={location.pathname === "/statistics" ? "menuItemActiv" : ""}
      >
        <FontAwesomeIcon icon={faChartPie} />
        Statistics
      </Link>
    </Menu>
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
  background: ${({ theme }) => theme.main.backgroundColor};
  height: calc(100vh - 4em - 50px);
  text-align: left;
  padding: 2rem;
  position: fixed;
  z-index: 950;
  overflow-y: auto;
  overflow-x: hidden;
  top: 50px;
  left: 0;
  transition: transform 0.3s ease-in-out;
  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(-100%)")};

  svg {
    margin-right: 5px;
  }

  @media (max-width: 576px) {
    width: calc(100% - 4rem);
  }

  a {
    flex: 1 1 auto;
    font-size: 20px;
    padding: 1rem 0;
    color: ${({ theme }) => theme.main.highlight};
    text-decoration: none;
    transition: color 0.3s linear;
  }

  a:hover {
    color: ${({ theme }) => theme.tile.color};
  }

  a.menuItemActiv {
    color: ${({ theme }) => theme.tile.color};
  }
`;

const Seperator = styled.div`
  width: 100%;
  height: 1px;
  border-bottom: 1px solid #a64dff;
`;
