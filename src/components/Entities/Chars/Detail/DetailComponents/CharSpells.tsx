import React, { useCallback, useState, useEffect } from "react";
import styled from "styled-components";
import Char from "../../../../../Data/Chars/Char";
import Spell, { isSpell } from "../../../../../Data/Spell";
import { reciveByAttribute } from "../../../../../Services/DatabaseService";

import SmallNumberArrayField from "../../../../FormElements/SmallNumberArrayField";
import SpellTile from "../../../Spells/SpellTile";
import SmallNumberField from "../../../../FormElements/SmallNumberField";

interface $Props {
  char: Char;
  saveChar: (char: Char) => void;
}

const CharSpell = ({ char, saveChar }: $Props) => {
  const [spells, setSpells] = useState<Spell[]>([]);

  useEffect(() => {
    char.spells.forEach((spell) => {
      reciveByAttribute("spells", "name", spell, (result) => {
        if (result && isSpell(result)) {
          setSpells((s) => [...s, result]);
        }
      });
    });
  }, [char.spells]);

  const onSpellslotChange = useCallback(
    (
      oldSlots: { origin: string; slots: number[]; max: number[] },
      index: number,
      value: number
    ) => {
      let newSpellSlots = char.spellSlots.map(
        (slots: { origin: string; slots: number[]; max: number[] }) => {
          if (slots.origin === oldSlots.origin) {
            let oldSlotValues = Array.from(oldSlots.slots);
            oldSlotValues[index] = value;
            return {
              origin: oldSlots.origin,
              slots: oldSlotValues,
              max: oldSlots.max,
            };
          } else {
            return slots;
          }
        }
      );
      saveChar({ ...char, spellSlots: newSpellSlots });
    },
    [char, saveChar]
  );

  const onCurrencyBoniChange = useCallback(
    (
      oldBoni: { origin: string; value: number; max: number },
      value: number
    ) => {
      let newBonis = char.currencyBonis.map(
        (boni: { origin: string; value: number; max: number }) => {
          if (boni === oldBoni) {
            return { ...boni, value: value };
          } else {
            return boni;
          }
        }
      );
      saveChar({ ...char, currencyBonis: newBonis });
    },
    [char, saveChar]
  );

  return (
    <>
      <MinView>
        <PropWrapper>
          <Prop>
            <PropTitle>Casting Hit:</PropTitle>
            {char.castingHit}
          </Prop>
          <Prop>
            <PropTitle>Casting Dc:</PropTitle>
            {char.castingDC}
          </Prop>
          {char.currencyBonis &&
            char.currencyBonis.map(
              (
                boni: { origin: string; value: number; max: number },
                index: number
              ) => {
                return (
                  <SmallNumberField
                    key={index}
                    max={boni.max}
                    value={boni.value}
                    label={boni.origin}
                    onChange={(boniChange) =>
                      onCurrencyBoniChange(boni, boniChange)
                    }
                  />
                );
              }
            )}
          {char.spellSlots &&
            char.spellSlots.map(
              (
                classSlots: {
                  origin: string;
                  slots: number[];
                  max: number[];
                },
                index: number
              ) => {
                return (
                  <SmallNumberArrayField
                    key={index}
                    values={classSlots.slots}
                    max={classSlots.max}
                    label={classSlots.origin}
                    onChange={(i, value) =>
                      onSpellslotChange(classSlots, i, value)
                    }
                  />
                );
              }
            )}
        </PropWrapper>
        <PropWrapper>
          {spells &&
            spells.map((spell, index: number) => {
              return <SpellTile key={index} spell={spell} />;
            })}
        </PropWrapper>
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
