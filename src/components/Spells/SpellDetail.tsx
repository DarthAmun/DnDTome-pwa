import React, { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router";
import { useHistory } from "react-router";
import { MyAppDatabase } from "../../Database/MyDatabase";
import { useItem } from "../../Hooks/DexieHooks";
import styled from "styled-components";

import {
  faArrowLeft,
  faSave,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { LoadingSpinner } from "../Loading";
import AppWrapper from "../AppWrapper";
import SpellView from "./SpellView";
import SpellEditView from "./SpellEditView";
import BackButton from "../FormElements/BackButton";
import Spell from "../../Data/Spell";
import IconButton from "../FormElements/IconButton";
import { update, remove } from "../../Database/DbService";

type TParams = { id: string };

const SpellDetail = ({ match }: RouteComponentProps<TParams>) => {
  const db = new MyAppDatabase();
  const [spell, loading, error] = useItem(db.spells, +match.params.id);
  const [editMode, setMode] = useState<boolean>(false);
  const [spellObj, editSpell] = useState<Spell>();
  let history = useHistory();

  useEffect(() => {
    if (spell !== undefined) {
      editSpell(spell);
    }
  }, [spell, editSpell]);

  const deleteSpell = (spellId: number | undefined) => {
    remove("spells", spellId)
    history.goBack()
  }

  return (
    <AppWrapper>
      <TopBar>
        <BackButton icon={faArrowLeft} action={() => history.goBack()}/>
        <EditToggle mode={editMode.toString()}>
          <ToggleLeft onClick={() => setMode(false)}>View</ToggleLeft>
          <ToggleRight onClick={() => setMode(true)}>Edit</ToggleRight>
        </EditToggle>
        {!error && !loading && editMode && spellObj !== undefined ? (
          <>
            <IconButton
              onClick={() => update("spells", spellObj)}
              icon={faSave}
            />
            <IconButton
              onClick={() => deleteSpell(spellObj.id)}
              icon={faTrash}
            />
          </>
        ) : (
          ""
        )}
      </TopBar>

      {!error && loading && <LoadingSpinner />}
      {!error && !loading && spellObj !== undefined ? (
        editMode ? (
          <SpellEditView
            spell={spellObj}
            onEdit={(value) => editSpell(value)}
          />
        ) : (
          <SpellView spell={spellObj} />
        )
      ) : (
        ""
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
  height: ${({ theme }) => theme.buttons.height};
  line-height: ${({ theme }) => theme.buttons.height};
  float: left;
  cursor: pointer;
  box-shadow: inset -2px -2px 5px 0px rgba(0, 0, 0, 0.3);
  border-radius: 5px 0px 0px 5px;

  transition: color 0.2s, background-color 0.2s;

  &:hover {
    color: white;
  }
`;

const ToggleRight = styled(ToggleLeft)`
  margin: 5px 5px 5px 0px;

  border-radius: 0px 5px 5px 0px;
`;

type EditMode = {
  mode: string;
};

const EditToggle = styled.div<EditMode>`
  width: auto;
  height: ${({ theme }) => theme.buttons.height};
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
