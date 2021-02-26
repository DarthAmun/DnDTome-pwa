import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import BuildChar from "../../../../../data/chars/BuildChar";

import FormatedText from "../../../../general_elements/FormatedText";
import Feature from "../../../../../data/classes/Feature";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import { useWebhook } from "../../../../../hooks/webhookHook";
import { rollCommand } from "../../../../../services/DiceService";
import { sendEmbedMessage } from "../../../../../services/DiscordService";
import IconButton from "../../../../form_elements/IconButton";

interface $Props {
  buildChar: BuildChar;
}

const CharCombat = ({ buildChar }: $Props) => {
  let history = useHistory();
  let webhook = useWebhook();
  const [actions, setActions] = useState<Feature[]>([]);
  const [bonusActions, setBonusActions] = useState<Feature[]>([]);
  const [reactions, setReactions] = useState<Feature[]>([]);

  const rollDiscord = (title: string, value: number, damage: string) => {
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

    let newDamage = "";
    damage
      .split(" ")
      .filter((command) => /\d+/g.test(command))
      .forEach((command) => {
        newDamage += command;
      });
    newDamage = newDamage.trim();
    let damageRoll = rollCommand(newDamage, krit);

    if (webhook !== undefined) {
      const newName = value >= 0 ? title + "(+" + value + ")" : title + "(" + value + ")";
      let newJson = {
        username: webhook.name + " (DnDTome)",
        embeds: [
          {
            author: {
              name: buildChar.character.name,
              icon_url: buildChar.character.pic,
            },
            fields: [
              {
                name: newName + " to hit",
                value:
                  roll +
                  (fail ? " :red_circle:" : "") +
                  (krit ? " :green_circle:" : "") +
                  " ||" +
                  rollString +
                  "||",
              },
              {
                name: "Damage",
                value: damageRoll + " ||" + newDamage + "||",
              },
            ],
          },
        ],
      };
      sendEmbedMessage(webhook, JSON.stringify(newJson));
    }
  };

  useEffect(() => {
    if (buildChar.classFeatures && buildChar.classFeatures.length > 0) {
      let newActions: Feature[] = [];
      let newBonusActions: Feature[] = [];
      let newReactions: Feature[] = [];
      buildChar.classFeatures
        .sort((f1, f2) => f1.level - f2.level)
        .forEach((featureSet) => {
          featureSet.features.forEach((feature: Feature) => {
            if (feature.type.toString() === "action") {
              newActions.push(feature);
            } else if (feature.type.toString() === "bonusAction") {
              newBonusActions.push(feature);
            } else if (feature.type.toString() === "reaction") {
              newReactions.push(feature);
            }
          });
        });
      setActions(newActions);
      setBonusActions(newBonusActions);
      setReactions(newReactions);
    }
  }, [buildChar]);

  return (
    <>
      <MinView>
        {buildChar.items &&
          buildChar.items.length > 0 &&
          buildChar.items.map((baseitem, index: number) => {
            if (baseitem.item.type.toLocaleLowerCase().includes("weapon")) {
              const bonus = Math.floor((buildChar.character[baseitem.attribute] - 10) / 2);
              return (
                <PropWrapper key={index}>
                  <Prop>
                    <MainLink onClick={() => history.push(`/item-detail/name/${baseitem.origin}`)}>
                      {baseitem.item.name}
                    </MainLink>
                  </Prop>
                  <Prop>
                    {bonus + (baseitem.prof ? buildChar.prof : 0) + baseitem.item.magicBonus >= 0
                      ? "+"
                      : ""}
                    {bonus + (baseitem.prof ? buildChar.prof : 0) + baseitem.item.magicBonus}
                  </Prop>
                  <Prop>{`${baseitem.base?.damage} ${
                    (baseitem.item.magicBonus + bonus >= 0 ? "+" : "") +
                    (baseitem.item.magicBonus + bonus)
                  }`}</Prop>
                  <Prop>{baseitem.base?.properties}</Prop>
                  {webhook !== undefined && (
                    <IconButton
                      style={{
                        backgroundColor: "#7289da",
                        float: "right",
                        padding: "5px",
                        height: "18px",
                        lineHeight: "18px",
                        fontSize: "18px",
                      }}
                      icon={faDiscord}
                      onClick={() =>
                        rollDiscord(
                          baseitem.item.name,
                          bonus + (baseitem.prof ? buildChar.prof : 0) + baseitem.item.magicBonus,
                          baseitem.base !== undefined
                            ? baseitem.base.damage + " " + (baseitem.item.magicBonus + bonus)
                            : ""
                        )
                      }
                    />
                  )}
                </PropWrapper>
              );
            } else {
              return "";
            }
          })}
        {buildChar.gears &&
          buildChar.gears.length > 0 &&
          buildChar.gears.map((baseGear, index: number) => {
            if (baseGear.gear.type.toLocaleLowerCase().includes("weapon")) {
              const strBonus = Math.floor((buildChar.character.str - 10) / 2);
              const dexBonus = Math.floor((buildChar.character.dex - 10) / 2);
              if (baseGear.gear.properties.toLocaleLowerCase().includes("finesse")) {
                return (
                  <PropWrapper key={index}>
                    <Prop>{baseGear.gear.name}</Prop>
                    <Prop>
                      {strBonus > dexBonus ? (
                        <>
                          {strBonus + buildChar.prof >= 0 ? "+" : ""}
                          {strBonus + buildChar.prof}
                        </>
                      ) : (
                        ""
                      )}
                      {dexBonus > strBonus ? (
                        <>
                          {dexBonus + buildChar.prof >= 0 ? "+" : ""}
                          {dexBonus + buildChar.prof}
                        </>
                      ) : (
                        ""
                      )}
                    </Prop>
                    <Prop>
                      {strBonus > dexBonus ? (
                        <>
                          {baseGear.gear.damage}
                          {strBonus >= 0 ? " +" : " "}
                          {strBonus}
                        </>
                      ) : (
                        ""
                      )}
                      {dexBonus > strBonus ? (
                        <>
                          {baseGear.gear.damage}
                          {dexBonus >= 0 ? " +" : " "}
                          {dexBonus}
                        </>
                      ) : (
                        ""
                      )}
                    </Prop>
                    <Prop>{baseGear.gear.properties}</Prop>
                    {webhook !== undefined && (
                      <IconButton
                        style={{
                          backgroundColor: "#7289da",
                          float: "right",
                          padding: "5px",
                          height: "18px",
                          lineHeight: "18px",
                          fontSize: "18px",
                        }}
                        icon={faDiscord}
                        onClick={() =>
                          rollDiscord(
                            baseGear.gear.name,
                            strBonus > dexBonus
                              ? strBonus + buildChar.prof
                              : dexBonus + buildChar.prof,
                            baseGear.gear.damage
                          )
                        }
                      />
                    )}
                  </PropWrapper>
                );
              } else {
                return (
                  <PropWrapper key={index}>
                    <Prop>{baseGear.gear.name}</Prop>
                    <Prop>
                      {strBonus + buildChar.prof >= 0 ? "+" : ""}
                      {strBonus + buildChar.prof}
                    </Prop>
                    <Prop>
                      {baseGear.gear.damage}
                      {strBonus >= 0 ? " +" : " "}
                      {strBonus}
                    </Prop>
                    <Prop>{baseGear.gear.properties}</Prop>
                    {webhook !== undefined && (
                      <IconButton
                        style={{
                          backgroundColor: "#7289da",
                          float: "right",
                          padding: "5px",
                          height: "18px",
                          lineHeight: "18px",
                          fontSize: "18px",
                        }}
                        icon={faDiscord}
                        onClick={() =>
                          rollDiscord(
                            baseGear.gear.name,
                            strBonus > dexBonus
                              ? strBonus + buildChar.prof
                              : dexBonus + buildChar.prof,
                            baseGear.gear.damage
                          )
                        }
                      />
                    )}
                  </PropWrapper>
                );
              }
            } else {
              return "";
            }
          })}
      </MinView>
      {actions && actions.length > 0 && (
        <MinView>
          <PropWrapper>
            {actions.map((action: Feature, index: number) => {
              return (
                <Text key={index}>
                  <PropTitle>{action.name}:</PropTitle>
                  <FormatedText text={action.text} />
                </Text>
              );
            })}
          </PropWrapper>
        </MinView>
      )}
      {bonusActions && bonusActions.length > 0 && (
        <MinView>
          <PropWrapper>
            {bonusActions.map((action: Feature, index: number) => {
              return (
                <Text key={index}>
                  <PropTitle>{action.name}:</PropTitle>
                  <FormatedText text={action.text} />
                </Text>
              );
            })}
          </PropWrapper>
        </MinView>
      )}
      {reactions && reactions.length > 0 && (
        <MinView>
          <PropWrapper>
            {reactions.map((action: Feature, index: number) => {
              return (
                <Text key={index}>
                  <PropTitle>{action.name}:</PropTitle>
                  <FormatedText text={action.text} />
                </Text>
              );
            })}
          </PropWrapper>
        </MinView>
      )}
      <MinView>
        <PropWrapper>
          <Text>
            <PropTitle>Action Notes:</PropTitle>
            <FormatedText text={buildChar.character.actions} />
          </Text>
        </PropWrapper>
      </MinView>
    </>
  );
};

export default CharCombat;

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
  flex-direction: column;
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

const Text = styled.div`
  height: auto;
  width: calc(100% - 20px);
  margin: 2px;
  float: left;
  line-height: 18px;
  padding: 10px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.tile.backgroundColor};
`;

const MainLink = styled.span`
  display: inline-block;
  background-color: ${({ theme }) => theme.tile.backgroundColorLink};
  border-radius: 5px;
  text-decoration: none;
  color: ${({ theme }) => theme.tile.backgroundColor};
  font-size: 16px;
  padding: 0px 5px 0px 5px;
  cursor: pointer;
`;
