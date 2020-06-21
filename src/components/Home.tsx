import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import packageJson from "../../package.json";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiceD20 } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  let history = useHistory();

  useEffect(() => {
    setTimeout(function () {
      history.push("/spell-overview");
    }, 3000);
  }, [history]);

  return (
    <App>
      <HomeContainer>
        <Title>DnDTome</Title>
        <Link to="/spell-overview">
          <Icon icon={faDiceD20} className="animated bounce" />
        </Link>
        <HomeCredits>v{packageJson.version} by DarthAmun</HomeCredits>
        <svg width="0" height="0">
          <radialGradient id="rg" r="150%" cx="30%" cy="107%">
            <stop stopColor="#350069" offset="0" />
            <stop stopColor="#B973FF" offset="0.9" />
          </radialGradient>
        </svg>
      </HomeContainer>
    </App>
  );
};

export default Home;

const App = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.appBackgroundColor};
`;

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

  svg * {
    fill: url(#rg);
  }
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

const Icon = styled(FontAwesomeIcon)`
  width: 200px;
  height: auto;
  border-radius: 150px;
  cursor: pointer;
  animation-duration: 2s;
  animation-fill-mode: both;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-name: bounce;

  @-webkit-keyframes bounce {
    0%,
    20%,
    40%,
    60%,
    80%,
    100% {
      -webkit-transform: translateY(0);
    }
    50% {
      -webkit-transform: translateY(-5px);
    }
  }

  @keyframes bounce {
    0%,
    20%,
    40%,
    60%,
    80%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-5px);
    }
  }
`;
