import React from "react";
import styled from "styled-components";
import BuildChar from "../../../../../data/chars/BuildChar";
import Spell from "../../../../../data/Spell";
import RollableProp from "../../../../general_elements/RollableProp";
import CharSpellView from "./CharSpellView";
import SpellSlotCounter from "./SpellSlotCounter";

interface $Props {
  buildChar: BuildChar;
  saveChar: (char: BuildChar) => void;
}

const CharSpell = ({ buildChar, saveChar }: $Props) => {
  return (
    <>
      <MinView>
        <PropWrapper>
          <RollableProp
            char={buildChar.character}
            title={"Casting Hit"}
            rolledValue={buildChar.character.castingHit}
          />
          <Prop>
            <PropTitle>Casting Dc:</PropTitle>
            {buildChar.character.castingDC}
          </Prop>
        </PropWrapper>
        <PropWrapper>
          {buildChar.character.spellSlots && (
            <SpellSlotCounter char={buildChar} saveChar={saveChar} />
          )}
        </PropWrapper>
        <SpellWrapper>
          {buildChar.spells &&
            buildChar.spells
              .sort(
                (
                  a: { origin: Spell; prepared: boolean },
                  b: { origin: Spell; prepared: boolean }
                ) => {
                  const leveldif = a.origin.level - b.origin.level;
                  if (leveldif === 0) return a.origin.name.localeCompare(b.origin.name);
                  return leveldif;
                }
              )
              .map((spell, index: number) => {
                return (
                  <CharSpellView
                    key={index}
                    char={buildChar}
                    saveChar={saveChar}
                    spell={spell.origin}
                    prepared={spell.prepared}
                  />
                );
              })}
        </SpellWrapper>
      </MinView>
    </>
  );
};

export default CharSpell;

const View = styled.div`
  color: ${({ theme }) => theme.tile.color};
  font-size: 16px;
  flex: 1 1 auto;
  padding: 5px;
  margin: 5px;
  height: 100%;
  width: min-content;
  min-width: 300px;

  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;
`;

const MinView = styled(View)`
  max-width: max-content;
`;

const PropWrapper = styled.div`
  flex: 1 1 auto;
  max-width: 100%;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const SpellWrapper = styled(PropWrapper)`
  align-items: flex-start;
`;

const Prop = styled.div`
  flex: 1 1 auto;
  max-width: 100%;
  height: auto;
  margin: 2px;
  padding: 10px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.tile.backgroundColor};

  svg {
    margin-right: 5px;
    height: auto;
    border-radius: 150px;
    transition: color 0.2s;
    color: ${({ theme }) => theme.main.highlight};
  }
`;

const PropTitle = styled.span`
  display: inline-block;
  color: ${({ theme }) => theme.tile.backgroundColorLink};
  text-decoration: none;
  margin: 0px 5px 0px 5px;
`;
