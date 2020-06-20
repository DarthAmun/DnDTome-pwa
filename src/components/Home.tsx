import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import packageJson from "../../package.json";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiceD20 } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  return (
    <HomeContainer>
      <Title>DnDTome</Title>
      <Link to="/spell-overview">
        <FontAwesomeIcon icon={faDiceD20} className="animated bounce" />
      </Link>
      <HomeCredits>v{packageJson.version} by DarthAmun</HomeCredits>
    </HomeContainer>
  );
};

export default Home;

const HomeContainer = styled.div`
  position: absolute;
  top: calc(50% - 125px);
  right: calc(50% - 100px);
  width: 200px;
  height: 250px;
  text-align: center;
  z-index: 10;
  color: #8000ff;
  font-size: 120px;
  -webkit-app-region: no-drag;
`;

const Title = styled.div`
  width: 200px;
  height: 60px;
  font-size: 40px;
  text-align: center;
`;

const HomeCredits = styled.div`
  width: 200px;
  height: 30px;
  font-size: 12px;
  color: #8000ff;
  font-family: "Quicksand", sans-serif;
  -webkit-font-smoothing: antialiased;
  text-shadow: none;
  line-height: 30px;
  text-align: center;
`;
