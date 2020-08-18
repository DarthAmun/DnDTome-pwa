import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";

import {
  faArrowLeft,
  faSave,
  faTrash,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import CharView from "./CharView";
import CharEditView from "./CharEditView";
import BackButton from "../../../FormElements/BackButton";
import Char from "../../../../Data/Chars/Char";
import IconButton from "../../../FormElements/IconButton";
import {
  remove,
  updateWithCallback,
} from "../../../../Services/DatabaseService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface $Props {
  char: Char;
}

const CharDetail = ({ char }: $Props) => {
  const [editMode, setMode] = useState<boolean>(false);
  const [charObj, editChar] = useState<Char>(char);
  const [showAlert, setAlert] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [unsavedChanges, setUnsavedChanges] = useState<boolean>(false);
  let history = useHistory();

  const deleteChar = (charId: number | undefined) => {
    remove("chars", charId);
    history.goBack();
  };

  useEffect(() => {
    if (charObj !== char) {
      setUnsavedChanges(true);
    }
  }, [charObj, char]);

  const recalcClasses = (char: Char) => {
        let bonis: { origin: string; value: number; max: number }[] = [];
        let spellSlots: {
          origin: string;
          slots: number[];
          max: number[];
        }[] = [];

        
    //     classes.forEach((classe) => {
    //       reciveByAttribute("classes", "name", classe.classe, (result) => {
    //         const dbClass: Class = result as Class;
    //         if (result !== undefined) {
    //           let featureSet = dbClass.featureSets[classe.level - 1];
    //           if (featureSet.bonis) {
    //             featureSet.bonis.forEach((boni: Boni) => {
    //               if (boni.isCurrency) {
    //                 bonis = [
    //                   ...bonis,
    //                   {
    //                     origin: boni.name,
    //                     value: +boni.value,
    //                     max: +boni.value,
    //                   },
    //                 ];
    //               }
    //             });
    //           }
    //           if (featureSet.spellslots) {
    //             spellSlots = [
    //               ...spellSlots,
    //               {
    //                 origin: dbClass.name,
    //                 slots: featureSet.spellslots,
    //                 max: featureSet.spellslots,
    //               },
    //             ];
    //           }
    //         }
    //       });
    //     });
    //     if (char.currencyBonis && char.currencyBonis.length > 0) {
    //       bonis = bonis.map((newBoni) => {
    //         char.currencyBonis.forEach((old) => {
    //           if (newBoni.origin === old.origin) {
    //             return {
    //               origin: newBoni.origin,
    //               value: old.value,
    //               max: newBoni.max,
    //             };
    //           }
    //         });
    //         return newBoni;
    //       });
    //     }
    //     if (char.spellSlots && char.spellSlots.length > 0) {
    //       spellSlots = spellSlots.map((newSpellSlots) => {
    //         char.spellSlots.forEach((old) => {
    //           if (newSpellSlots.origin === old.origin) {
    //             return {
    //               origin: newSpellSlots.origin,
    //               slots: old.slots,
    //               max: newSpellSlots.max,
    //             };
    //           }
    //         });
    //         return newSpellSlots;
    //       });
    //     }
    //     if (bonis.length > 0 && spellSlots.length > 0) {
    //       onEdit({
    //         ...char,
    //         spellSlots: spellSlots,
    //         currencyBonis: bonis,
    //         classes: classes,
    //       });
    //     } else if (spellSlots.length > 0) {
    //       onEdit({ ...char, spellSlots: spellSlots, classes: classes });
    //     } else if (bonis.length > 0) {
    //       onEdit({ ...char, currencyBonis: bonis, classes: classes });
    //     } else {
    //       onEdit({ ...char, classes: classes });
    //     }
    return char;
  };

  const updateChar = (tableName: string, charObj: Char) => {
    const updatedChar = recalcClasses(charObj)
    updateWithCallback(tableName, updatedChar, (result) => {
      if (result > 0) {
        setUnsavedChanges(false);
        setMessage("Saved successful!");
        setAlert(true);
      } else {
        setMessage("Something went wrong!");
        setAlert(true);
      }
      setTimeout(() => {
        setAlert(false);
      }, 3000);
    });
  };

  return (
    <>
      <TopBar>
        <BackButton icon={faArrowLeft} action={() => history.goBack()} />
        <EditToggle mode={editMode.toString()}>
          <ToggleLeft onClick={() => setMode(false)}>View</ToggleLeft>
          <ToggleRight onClick={() => setMode(true)}>Edit</ToggleRight>
        </EditToggle>
        {unsavedChanges && <Icon icon={faExclamationTriangle} />}
        {editMode && (
          <>
            <IconButton
              onClick={() => updateChar("chars", charObj)}
              icon={faSave}
            />
            <IconButton onClick={() => deleteChar(charObj.id)} icon={faTrash} />
            {message && showAlert && <Message>{message}</Message>}
          </>
        )}
      </TopBar>
      {editMode ? (
        <CharEditView char={charObj} onEdit={(value) => editChar(value)} />
      ) : (
        <CharView character={charObj} />
      )}
    </>
  );
};

export default CharDetail;

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

const Message = styled.div`
  padding: 5px;
  width: 150px;
  height: 30px;
  line-height: 30px;
  border-radius: 5px;
  float: right;
`;

const Icon = styled(FontAwesomeIcon)`
  float: right;
  line-height: 30px;
  display: block;
  height: 30px;
  padding: 10px;
  color: ${({ theme }) => theme.main.highlight};
`;
