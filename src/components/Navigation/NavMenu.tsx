import React from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMeteor, faCog, faDragon } from "@fortawesome/free-solid-svg-icons";
import { GiBackpack, GiWomanElfFace } from "react-icons/gi";

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
      {/* <Link  to="/item-overview" className={location.pathname === "/item-overview" ? "menuItemActiv" : ""}>
        <FontAwesomeIcon icon={faShieldAlt} />
      </Link>n} /> 
      </Link>*/}
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
        to="/monster-overview"
        className={
          location.pathname === "/monster-overview" ? "menuItemActiv" : ""
        }
      >
        <FontAwesomeIcon icon={faDragon} />
        Monsters
      </Link>
      {/* // <Link  to="/char-overview" className={location.pathname === "/char-overview" ? "menuItemActiv" : ""}>
      //   <FontAwesomeIcon icon={faIdCard} />
      // </Link>
      // <Link  to="/encounter" className={location.pathname === "/encounter" ? "menuItemActiv" : ""}>
      //   <img alt="" src={encounterIcon} style={{ width: '20px', marginTop: '10px', marginRight: '5px', float: 'left' }} />
      // </Link> */}
      <Link
        to="/options"
        className={location.pathname === "/options" ? "menuItemActiv" : ""}
      >
        <FontAwesomeIcon icon={faCog} />
        Options
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
  z-index: 10;
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
    font-size: 2rem;
    padding: 2rem 0;
    color: ${({ theme }) => theme.main.highlight};
    text-decoration: none;
    transition: color 0.3s linear;

    @media (max-width: 576px) {
      font-size: 1.5rem;
      text-align: center;
    }

    &:hover {
      color: ${({ theme }) => theme.primaryHover};
    }
  }
`;
