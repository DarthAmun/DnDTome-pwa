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
} from "@fortawesome/free-solid-svg-icons";
import {
  GiBackpack,
  GiWomanElfFace,
  GiCrystalWand,
  GiPlagueDoctorProfile,
  GiSwordClash,
  GiBookmarklet,
} from "react-icons/gi";

interface $Props {
  open: boolean;
}

const NavMenu = ({ open }: $Props) => {
  const location = useLocation();

  return (
    <Menu open={open}>
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
        to="/monster-overview"
        className={
          location.pathname === "/monster-overview" ? "menuItemActiv" : ""
        }
      >
        <FontAwesomeIcon icon={faDragon} />
        Monsters
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
      <Link
        to="/encounter-overview"
        className={location.pathname === "/encounters" ? "menuItemActiv" : ""}
      >
        <GiSwordClash />
        Encounters
      </Link>
      <Link
        to="/library"
        className={location.pathname === "/library" ? "menuItemActiv" : ""}
      >
        <GiBookmarklet />
        library
      </Link>
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
  justify-content: center;
  background: ${({ theme }) => theme.main.backgroundColor};
  height: calc(100vh - 4em);
  text-align: left;
  padding: 2rem;
  position: fixed;
  z-index: 950;
  top: 0;
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
    font-size: 20px;
    padding: 1rem 0;
    color: ${({ theme }) => theme.main.highlight};
    text-decoration: none;
    transition: color 0.3s linear;

    @media (max-width: 576px) {
      font-size: 16px;
      text-align: center;
    }

    &:hover {
      color: ${({ theme }) => theme.primaryHover};
    }
  }
`;
