import React from "react";
import styled from "styled-components";
import packageJson from "../../../package.json";

const Header = () => {
  return (
    <Bar>
      <Name>DnDTome</Name>
      <HomeCredits>v{packageJson.version}</HomeCredits>
    </Bar>
  );
};

export default Header;

const Bar = styled.div`
  width: calc(100% - 60px);
  height: 30px;
  line-height: 30px;
  padding: 10px 10px 10px 50px;
  background-color: ${({ theme }) => theme.buttons.backgroundColor};
  color: ${({ theme }) => theme.buttons.color};
  box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.75);
  display: flex;
  position: fixed;
  justify-content: space-between;
  z-index: 1000;
  top: 0px;
  left: 0px;
  right: 0px;
`;

const Name = styled.div`
  width: 80px;
  height: 30px;
  font-size: 20px;
  font-family: "Quicksand", sans-serif;
  -webkit-font-smoothing: antialiased;
  text-shadow: none;
  line-height: 30px;
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
