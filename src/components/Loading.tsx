import React from "react";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiceD20 } from "@fortawesome/free-solid-svg-icons";

export const LoadingSpinner = () => (
  <SpinnerWrapper>
    <Spinner>
      <Icon icon={faDiceD20} className="animated bounce" />
    </Spinner>
  </SpinnerWrapper>
);

const SpinnerWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 1000;
  top: unset;
  left: unset;
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  position: relative;
  z-index: 1000;
  top: calc(50% - 20px);
  right: calc(50% - 20px);
`;

const Icon = styled(FontAwesomeIcon)`
  width: 40px;
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
