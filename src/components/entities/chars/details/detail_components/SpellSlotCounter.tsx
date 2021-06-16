import { faCheckSquare, faSquare } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";
import BuildChar from "../../../../../data/chars/BuildChar";

interface $Props {
  char: BuildChar;
  saveChar: (char: BuildChar) => void;
}

const SpellSlotCounter = ({ char, saveChar }: $Props) => {
  const burnSpellSlot = (index: number, slot: number, i: number) => {
    let newSlots = [...char.character.spellSlots];
    if (newSlots[index].slots[slot] === i + 1) {
      newSlots[index].slots[slot] = i;
    } else {
      newSlots[index].slots[slot] = i + 1;
    }
    saveChar({ ...char, character: { ...char.character, spellSlots: newSlots } });
  };

  const changeSlotIcon = (aviable: number, i: number) => {
    if (aviable > i) {
      return faCheckSquare;
    } else {
      return faSquare;
    }
  };

  return (
    <>
      {char.character.spellSlots.map(
        (
          classSlots: {
            origin: string;
            slots: number[];
            max: number[];
          },
          index: number
        ) => {
          return (
            <Slots key={index}>
              <SlotTitle>{classSlots.origin}</SlotTitle>
              {classSlots.max
                .filter((slot) => slot > 0)
                .map((slot: number, slotIndex: number) => {
                  return (
                    <SlotRow key={index + "" + slotIndex}>
                      <SlotTitle>{slotIndex + 1}:</SlotTitle>
                      {(() => {
                        const options = [];
                        for (let i = 0; i <= slot - 1; i++) {
                          options.push(
                            <SlotIcon
                              key={index + "" + slotIndex + "" + i}
                              onClick={(e) => burnSpellSlot(index, slotIndex, i)}
                            >
                              <FontAwesomeIcon
                                icon={changeSlotIcon(
                                  char.character.spellSlots[index].slots[slotIndex],
                                  i
                                )}
                              />
                            </SlotIcon>
                          );
                        }
                        return options;
                      })()}
                    </SlotRow>
                  );
                })}
            </Slots>
          );
        }
      )}
    </>
  );
};

export default SpellSlotCounter;

const Slots = styled.div`
  color: ${({ theme }) => theme.tile.color};
  background-color: ${({ theme }) => theme.tile.backgroundColor};
  overflow: hidden;
  flex: 1 1 auto;
  padding: 5px;
  margin: 2px;
  border-radius: 5px;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;
const SlotRow = styled.div`
  flex: 1 1 100%;
  line-height: 24px;

  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
`;
const SlotIcon = styled.div`
  font-size: 24px;
  flex: 1 1;
  margin-right: 5px;
  cursor: pointer;
`;

const SlotTitle = styled.span`
  display: inline-block;
  color: ${({ theme }) => theme.tile.backgroundColorLink};
  text-decoration: none;
  margin: 0px 5px 0px 5px;
`;
