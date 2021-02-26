import React, { useCallback } from "react";
import styled from "styled-components";
import BuildChar from "../../../../../data/chars/BuildChar";

import SmallNumberArrayField from "../../../../form_elements/SmallNumberArrayField";
import SpellTile from "../../../spells/SpellTile";
import SmallNumberField from "../../../../form_elements/SmallNumberField";
import { useWebhook } from "../../../../../hooks/webhookHook";
import Char from "../../../../../data/chars/Char";
import { rollCommand } from "../../../../../services/DiceService";
import { sendEmbedMessage } from "../../../../../services/DiscordService";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import IconButton from "../../../../form_elements/IconButton";

interface $Props {
  buildChar: BuildChar;
  saveChar: (char: BuildChar) => void;
}

const CharSpell = ({ buildChar, saveChar }: $Props) => {
  const onSpellslotChange = useCallback(
    (
      oldSlots: { origin: string; slots: number[]; max: number[] },
      index: number,
      value: number
    ) => {
      let newSpellSlots = buildChar.character.spellSlots.map(
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
      saveChar({ ...buildChar, character: { ...buildChar.character, spellSlots: newSpellSlots } });
    },
    [buildChar, saveChar]
  );

  const onCurrencyBoniChange = useCallback(
    (oldBoni: { origin: string; value: number; max: number }, value: number) => {
      let newBonis = buildChar.character.currencyBonis.map(
        (boni: { origin: string; value: number; max: number }) => {
          if (boni === oldBoni) {
            return { ...boni, value: value };
          } else {
            return boni;
          }
        }
      );
      saveChar({ ...buildChar, character: { ...buildChar.character, currencyBonis: newBonis } });
    },
    [buildChar, saveChar]
  );

  return (
    <>
      <MinView>
        <PropWrapper>
          <RollableProp
            char={buildChar.character}
            title={"Casting Hit"}
            value={buildChar.character.castingHit}
          />
          <Prop>
            <PropTitle>Casting Dc:</PropTitle>
            {buildChar.character.castingDC}
          </Prop>
          {buildChar.character.currencyBonis &&
            buildChar.character.currencyBonis.map(
              (boni: { origin: string; value: number; max: number }, index: number) => {
                return (
                  <SmallNumberField
                    key={index}
                    max={boni.max}
                    showMax={true}
                    value={boni.value}
                    label={boni.origin}
                    onChange={(boniChange) => onCurrencyBoniChange(boni, boniChange)}
                  />
                );
              }
            )}
          {buildChar.character.spellSlots &&
            buildChar.character.spellSlots.map(
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
                    onChange={(i, value) => onSpellslotChange(classSlots, i, value)}
                  />
                );
              }
            )}
        </PropWrapper>
        <PropWrapper>
          {buildChar.spells &&
            buildChar.spells.map((spell, index: number) => {
              return <SpellTile key={index} spell={spell} />;
            })}
        </PropWrapper>
      </MinView>
    </>
  );
};

export default CharSpell;

interface $RollableProps {
  char: Char;
  title: string;
  value: number;
}

const RollableProp = ({ char, title, value }: $RollableProps) => {
  let webhook = useWebhook();

  const rollDiscord = () => {
    let rollString: string = "";
    let roll: number = 0;

    if (value >= 0) {
      const { result, text } = rollCommand("d20+" + value);
      roll = result;
      rollString = "d20(`" + (result - value) + "`)+" + value + text;
    } else {
      const { result, text } = rollCommand("d20" + value);
      roll = result;
      rollString = "d20(`" + (result - value) + "`)" + value + text;
    }

    let krit = false;
    if (roll - value === 20) krit = true;
    let fail = false;
    if (roll - value === 1) fail = true;

    if (rollString !== "" && webhook !== undefined) {
      const newName = value >= 0 ? title + "(+" + value + ")" : title + "(" + value + ")";
      let newJson = {
        username: webhook.name + " (DnDTome)",
        embeds: [
          {
            author: {
              name: char.name,
              icon_url: char.pic,
            },
            fields: [
              {
                name: newName,
                value:
                  roll +
                  (fail ? " :red_circle:" : "") +
                  (krit ? " :green_circle:" : "") +
                  " ||" +
                  rollString +
                  "||",
              },
            ],
          },
        ],
      };
      sendEmbedMessage(webhook, JSON.stringify(newJson));
    }
  };

  return (
    <PropText
      onClick={() => rollDiscord()}
      style={{ cursor: webhook !== undefined ? "pointer" : "default" }}
    >
      <PropTitle>{title}:</PropTitle>
      {value}
      {webhook !== undefined && (
        <IconButton
          style={{
            backgroundColor: "#7289da",
            float: "right",
            padding: "5px",
            height: "10px",
            lineHeight: "10px",
            fontSize: "10px",
            margin: "0px",
            marginLeft: "5px",
          }}
          icon={faDiscord}
        />
      )}
    </PropText>
  );
};

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

const PropText = styled.div`
  flex: 2 2 auto;
  height: auto;
  margin: 2px;
  padding: 10px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.tile.backgroundColor};
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
