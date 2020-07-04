import React from "react";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiceD20 } from "@fortawesome/free-solid-svg-icons";

export const LoadingSpinner = () => (
  <Spinner>
    <Icon icon={faDiceD20} />
    <svg width="0" height="0">
      <radialGradient id="rg" r="150%" cx="30%" cy="107%">
        <stop stopColor="#350069" offset="0" />
        <stop stopColor="#B973FF" offset="0.9" />
      </radialGradient>
    </svg>
  </Spinner>
);

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  font-size: 40px;
  position: fixed;
  z-index: 1000;
  top: calc(50% - 20px);
  right: calc(50% - 20px);

  svg * {
    fill: url(#rg);
  }
`;

const Icon = styled(FontAwesomeIcon)`
  width: 100%;
  height: 100%;
  border-radius: 150px;
  animation: bounce 2s linear infinite;

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
