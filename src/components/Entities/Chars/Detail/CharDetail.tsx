import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";

import Char from "../../../../Data/Chars/Char";
import Class from "../../../../Data/Classes/Class";
import ClassSet from "../../../../Data/Chars/ClassSet";
import Boni from "../../../../Data/Classes/Boni";
import {
  remove,
  updateWithCallback,
  recivePromiseByAttribute,
} from "../../../../Services/DatabaseService";

import {
  faArrowLeft,
  faSave,
  faTrash,
  faExclamationTriangle,
  faSlidersH,
  faList,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CharView from "./CharView";
import CharEditView from "./CharEditView";
import BackButton from "../../../FormElements/BackButton";
import IconButton from "../../../FormElements/IconButton";
import Dialog from "../../../GeneralElements/Dialog";

interface $Props {
  char: Char;
  isNew: boolean;
}

const CharDetail = ({ char, isNew }: $Props) => {
  const [editMode, setMode] = useState<boolean>(isNew);
  const [modMode, setModMode] = useState<boolean>(true);

  const [charObj, editChar] = useState<Char>(char);

  const [showAlert, setAlert] = useState<boolean>(false);
  const [showDeleteDialog, setDeleteDialog] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [unsavedChanges, setUnsavedChanges] = useState<boolean>(false);
  let history = useHistory();

  const deleteChar = () => {
    setDeleteDialog(true);
  };

  useEffect(() => {
    if (charObj !== char) {
      setUnsavedChanges(true);
    }
  }, [charObj, char]);

  const recalcClasses = async (char: Char) => {
    let bonis: { origin: string; value: number; max: number }[] = [];
    let spellSlots: {
      origin: string;
      slots: number[];
      max: number[];
    }[] = [];
    let fullClassList: { class: Class; classSet: ClassSet }[] = [];
    let classList: Promise<Class>[] = [];

    char.classes.forEach((classe) => {
      classList.push(recivePromiseByAttribute("classes", "name", classe.classe));
    });
    const results = await Promise.all(classList);
    results.forEach((classe: Class) => {
      char.classes.forEach((classSet) => {
        if (classe.name === classSet.classe) {
          fullClassList.push({ class: classe, classSet: classSet });
        }
      });
    });

    fullClassList.forEach((classe: { class: Class; classSet: ClassSet }) => {
      let featureSet = classe.class.featureSets[classe.classSet.level - 1];
      if (featureSet.bonis) {
        featureSet.bonis.forEach((boni: Boni) => {
          if (boni.isCurrency) {
            bonis = [
              ...bonis,
              {
                origin: boni.name,
                value: +boni.value,
                max: +boni.value,
              },
            ];
          }
        });
      }
      if (featureSet.spellslots && featureSet.spellslots.length > 0) {
        spellSlots = [
          ...spellSlots,
          {
            origin: classe.class.name,
            slots: featureSet.spellslots,
            max: featureSet.spellslots,
          },
        ];
      }
    });

    if (char.currencyBonis && char.currencyBonis.length > 0) {
      let updatedBonis = bonis.map((newBoni) => {
        let updatedOldBonis = char.currencyBonis.map((old) => {
          if (newBoni.origin === old.origin) {
            return {
              origin: newBoni.origin,
              value: old.value,
              max: newBoni.max,
            };
          } else {
            return null;
          }
        });
        if (
          updatedOldBonis &&
          updatedOldBonis.length > 0 &&
          updatedOldBonis[0] !== undefined &&
          updatedOldBonis[0] !== null
        ) {
          return updatedOldBonis[0];
        } else {
          return newBoni;
        }
      });
      if (updatedBonis && updatedBonis.length > 0) {
        bonis = Array.from(updatedBonis);
      }
    }

    if (char.spellSlots && char.spellSlots.length > 0) {
      let updatedSpellSlots = spellSlots.map((newSpellSlots) => {
        let updatedOldSlots = char.spellSlots.map((old) => {
          if (newSpellSlots.origin === old.origin) {
            return {
              origin: newSpellSlots.origin,
              slots: old.slots,
              max: newSpellSlots.max,
            };
          } else {
            return null;
          }
        });
        if (
          updatedOldSlots &&
          updatedOldSlots.length > 0 &&
          updatedOldSlots[0] !== undefined &&
          updatedOldSlots[0] !== null
        ) {
          return updatedOldSlots[0];
        } else {
          return newSpellSlots;
        }
      });
      if (updatedSpellSlots && updatedSpellSlots.length > 0) {
        spellSlots = Array.from(updatedSpellSlots);
      }
    }

    let updatedChar = {
      ...char,
      spellSlots: spellSlots,
      currencyBonis: bonis,
    };
    editChar(updatedChar);
    return updatedChar;
  };

  const updateChar = (tableName: string, charObj: Char) => {
    recalcClasses(charObj)
      .then((updatedChar) => {
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
      })
      .catch((error) => {
        setMessage("Something went wrong!");
        setAlert(true);
        setTimeout(() => {
          setAlert(false);
        }, 3000);
      });
  };

  return (
    <>
      {showDeleteDialog && (
        <Dialog
          message={`Delete ${char.name}?`}
          icon={faExclamationTriangle}
          confirmeText={"Delete"}
          confirmeClick={() => {
            remove("chars", char.id);
            history.goBack();
          }}
          abortText={"Back"}
          abortClick={() => {
            setDeleteDialog(false);
          }}
        />
      )}
      <TopBar>
        <BackButton icon={faArrowLeft} action={() => history.goBack()} />
        <EditToggle mode={(!modMode).toString()}>
          <ToggleLeft onClick={() => setModMode(true)}>
            <FontAwesomeIcon icon={faSlidersH} />
          </ToggleLeft>
          <ToggleRight onClick={() => setModMode(false)}>
            <FontAwesomeIcon icon={faList} />
          </ToggleRight>
        </EditToggle>
        <EditToggle mode={editMode.toString()}>
          <ToggleLeft onClick={() => setMode(false)}>View</ToggleLeft>
          <ToggleRight onClick={() => setMode(true)}>Edit</ToggleRight>
        </EditToggle>
        {unsavedChanges && <Icon icon={faExclamationTriangle} title={"Unsaved changes!"} />}
        {editMode && (
          <>
            <IconButton onClick={() => updateChar("chars", charObj)} icon={faSave} />
            <IconButton onClick={() => deleteChar()} icon={faTrash} />
            {message && showAlert && <Message>{message}</Message>}
          </>
        )}
      </TopBar>
      {editMode ? (
        <CharEditView character={charObj} onEdit={(value) => editChar(value)} />
      ) : (
        <CharView character={charObj} modifications={modMode} />
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
