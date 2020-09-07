import React, { useCallback, useState, useEffect } from "react";
import styled from "styled-components";
import Char from "../../../../../Data/Chars/Char";
import Item from "../../../../../Data/Item";
import Gear from "../../../../../Data/Gear";
import { reciveByAttribute } from "../../../../../Services/DatabaseService";
import Class from "../../../../../Data/Classes/Class";
import FeatureSet from "../../../../../Data/Classes/FeatureSet";
import FormatedText from "../../../../GeneralElements/FormatedText";
import Feature from "../../../../../Data/Classes/Feature";

interface $Props {
  char: Char;
  classes: Class[];
  classesFeatures: FeatureSet[];
  items: Item[];
  gears: Gear[];
}

const CharCombat = ({
  char,
  items,
  gears,
  classes,
  classesFeatures,
}: $Props) => {
  const [baseItems, setBaseItems] = useState<{ base: Gear; item: Item }[]>([]);
  const [prof, setProf] = useState<number>(0);

  const [actions, setActions] = useState<Feature[]>([]);
  const [bonusActions, setBonusActions] = useState<Feature[]>([]);
  const [reactions, setReactions] = useState<Feature[]>([]);

  useEffect(() => {
    if (classesFeatures && classesFeatures.length > 0) {
      let newActions: Feature[] = [];
      let newBonusActions: Feature[] = [];
      let newReactions: Feature[] = [];
      classesFeatures
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
  }, [classesFeatures]);

  useEffect(() => {
    items.forEach((item) => {
      if (item.base !== "") {
        reciveByAttribute("gears", "name", item.base, (result) => {
          setBaseItems((b) => [...b, { item: item, base: result as Gear }]);
        });
      }
    });
  }, [items]);

  const calcLevel = useCallback(() => {
    let level = 0;
    char.classes.forEach((classe) => {
      level += classe.level;
    });
    return level;
  }, [char]);

  useEffect(() => {
    if (classes && classes.length > 0) {
      const level = calcLevel();
      classes[0].featureSets.forEach((featureSet: FeatureSet) => {
        if (featureSet.level === level) {
          setProf(featureSet.profBonus);
        }
      });
    }
  }, [char, classes, calcLevel]);

  return (
    <>
      <MinView>
        {baseItems &&
          baseItems.length > 0 &&
          baseItems.map((baseitem, index: number) => {
            if (baseitem.item.type.toLocaleLowerCase().includes("weapon")) {
              const strBonus = Math.floor((char.str - 10) / 2);
              const dexBonus = Math.floor((char.dex - 10) / 2);
              if (
                baseitem.base.properties.toLocaleLowerCase().includes("finesse")
              ) {
                return (
                  <PropWrapper key={index}>
                    <Prop>{baseitem.item.name}</Prop>
                    <Prop>
                      {strBonus > dexBonus ? (
                        <>+{strBonus + prof + baseitem.item.magicBonus}</>
                      ) : (
                        ""
                      )}
                      {dexBonus > strBonus ? (
                        <>+{dexBonus + prof + baseitem.item.magicBonus}</>
                      ) : (
                        ""
                      )}
                    </Prop>
                    <Prop>{`${baseitem.base.damage} +${baseitem.item.magicBonus}`}</Prop>
                    <Prop>{baseitem.base.properties}</Prop>
                  </PropWrapper>
                );
              } else {
                return (
                  <PropWrapper key={index}>
                    <Prop>{baseitem.item.name}</Prop>
                    <Prop>+{strBonus + prof + baseitem.item.magicBonus}</Prop>
                    <Prop>{`${baseitem.base.damage} +${baseitem.item.magicBonus}`}</Prop>
                    <Prop>{baseitem.base.properties}</Prop>
                  </PropWrapper>
                );
              }
            } else {
              return "";
            }
          })}
        {gears &&
          gears.length > 0 &&
          gears.map((gear, index: number) => {
            if (gear.type.toLocaleLowerCase().includes("weapon")) {
              const strBonus = Math.floor((char.str - 10) / 2);
              const dexBonus = Math.floor((char.dex - 10) / 2);
              if (gear.properties.toLocaleLowerCase().includes("finesse")) {
                return (
                  <PropWrapper key={index}>
                    <Prop>{gear.name}</Prop>
                    <Prop>
                      {strBonus > dexBonus ? <>+{strBonus + prof}</> : ""}
                      {dexBonus > strBonus ? <>+{dexBonus + prof}</> : ""}
                    </Prop>
                    <Prop>{gear.damage}</Prop>
                    <Prop>{gear.properties}</Prop>
                  </PropWrapper>
                );
              } else {
                return (
                  <PropWrapper key={index}>
                    <Prop>{gear.name}</Prop>
                    <Prop>+{strBonus + prof}</Prop>
                    <Prop>{gear.damage}</Prop>
                    <Prop>{gear.properties}</Prop>
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
            <FormatedText text={char.actions} />
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
