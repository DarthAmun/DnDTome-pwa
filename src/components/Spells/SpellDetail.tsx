import React, { useState } from "react";
import { RouteComponentProps, useHistory } from "react-router";
import { MyAppDatabase } from "../../Database/MyDatabase";
import { useItem } from "../../Hooks/DexieHooks";
import styled from "styled-components";

import { LoadingSpinner } from "../Loading";
import AppWrapper from "../AppWrapper";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import SpellView from "./SpellView";
import SpellEditView from "./SpellEditView";

type TParams = { id: string };

const SpellDetail = ({ match }: RouteComponentProps<TParams>) => {
  let history = useHistory();
  const db = new MyAppDatabase();
  const [spell, loading, error] = useItem(db.spells, +match.params.id);
  const [editMode, setMode] = useState<boolean>(false);

  return (
    <AppWrapper>
      <TopBar>
        <Back onClick={() => history.goBack()}>
          <Icon icon={faArrowLeft} />
        </Back>
        <EditToggle mode={editMode.toString()}>
          <ToggleLeft onClick={() => setMode(false)}>View</ToggleLeft>
          <ToggleRight onClick={() => setMode(true)}>Edit</ToggleRight>
        </EditToggle>
      </TopBar>
      {!error && loading && <LoadingSpinner />}
      {!error && !loading && spell !== undefined ? (
        editMode ? (
          <SpellEditView spell={spell} />
        ) : (
          <SpellView spell={spell} />
        )
      ) : (
        <>Fail</>
      )}
      {error && <>Fail</>}
    </AppWrapper>
  );
};

export default SpellDetail;

const TopBar = styled.div`
  color: ${({ theme }) => theme.tile.color};
  font-size: 16px;
  overflow: hidden;
  flex: 1 1;
  min-width: calc(100% - 20px);
  height: 45px;
  padding: 10px;
`;

const ToggleLeft = styled.div`
  width: auto;
  padding: 10px;
  margin: 5px 0px 5px 5px;
  height: 20px;
  line-height: 20px;
  float: left;
  cursor: pointer;
  box-shadow: inset -2px -2px 5px 0px rgba(0, 0, 0, 0.3);

  border-radius: 10px 0px 0px 10px;
  -moz-border-radius: 10px 0px 0px 10px;
  -webkit-border-radius: 10px 0px 0px 10px;

  transition: color 0.2s, background-color 0.2s;

  &:hover {
    color: white;
  }
`;

const ToggleRight = styled(ToggleLeft)`
  margin: 5px 5px 5px 0px;

  border-radius: 0px 10px 10px 0px;
  -moz-border-radius: 0px 10px 10px 0px;
  -webkit-border-radius: 0px 10px 10px 0px;
`;

type EditMode = {
  mode: string;
};

const EditToggle = styled.div<EditMode>`
  width: auto;
  height: 30px;
  float: right;
  color: ${({ theme }) => theme.buttons.color};

  ${ToggleLeft} {
    background-color:
    ${(props) => {
      if (props.mode !== "true") {
        return ({ theme }) => theme.buttons.backgroundColor;
      } else {
        return ({ theme }) => theme.tile.backgroundColor;
      }
    }}}
    ;
  }

  ${ToggleRight} {
    background-color:
    ${(props) => {
      if (props.mode === "true") {
        return ({ theme }) => theme.buttons.backgroundColor;
      } else {
        return ({ theme }) => theme.tile.backgroundColor;
      }
    }}}
    ;
  }
`;

const Icon = styled(FontAwesomeIcon)`
  margin-right: 5px;
  width: 20px;
  height: auto;
  border-radius: 150px;
  transition: color 0.2s;
  color: ${({ theme }) => theme.main.highlight};
`;

const Back = styled.div`
  float: left;
  font-size: 30px;
  margin: 10px 0px 0px 10px;
  cursor: pointer;

  &:hover ${Icon} {
    color: ${({ theme }) => theme.buttons.color};
  }
`;
