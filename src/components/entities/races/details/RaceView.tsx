import React, { useCallback, useState, useEffect } from "react";
import { useHistory } from "react-router";
import { reciveAllFiltered, createNewWithId } from "../../../../services/DatabaseService";
import Race from "../../../../data/races/Race";
import Trait from "../../../../data/races/Trait";
import Subrace from "../../../../data/races/Subrace";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileExport,
  faLink,
  faPaperPlane,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
import { GiUpgrade } from "react-icons/gi";
import FormatedText from "../../../general_elements/FormatedText";
import TextButton from "../../../form_elements/TextButton";
import P2PSender from "../../../p2p/P2PSender";

interface $Props {
  race: Race;
}

const RaceView = ({ race }: $Props) => {
  const [send, setSend] = useState<boolean>(false);
  const [subraces, setSubraces] = useState<Subrace[]>([]);
  let history = useHistory();

  useEffect(() => {
    reciveAllFiltered(
      "subraces",
      [{ fieldName: "type", value: race.name, sort: 0 }],
      (results: any[]) => {
        setSubraces(results);
      }
    );
  }, [race]);

  const getPicture = useCallback(() => {
    if (race !== undefined) {
      if (race.picBase64 !== "" && race.picBase64 !== null && race.picBase64 !== undefined) {
        return race.picBase64;
      } else if (race.pic !== "" && race.pic !== null && race.pic !== undefined) {
        return race.pic;
      }
    }
    return "";
  }, [race]);

  const createNewSubrace = () => {
    let newSubrace = new Subrace();
    delete newSubrace.id;
    newSubrace.type = race.name + "|" + race.sources;
    createNewWithId("subraces", newSubrace, (id) => {
      history.push(`/subrace-detail/id/${id}`);
    });
  };

  const exportThis = () => {
    console.time("Remove Base64 Images");
    let newRace = { ...race };
    newRace.picBase64 = "";
    console.timeEnd("Remove Base64 Images");

    let all: any = {
      races: [newRace],
      subraces: subraces,
    };
    let contentType = "application/json;charset=utf-8;";

    var a = document.createElement("a");
    a.download = race.name + "|" + race.sources + ".json";
    a.href = "data:" + contentType + "," + encodeURIComponent(JSON.stringify(all));
    a.target = "_blank";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <CenterWrapper>
      {getPicture() !== "" ? (
        <ImageView>
          <Image pic={getPicture()}></Image>
        </ImageView>
      ) : (
        ""
      )}
      <View>
        <Name>
          <b>{race.name}</b>
        </Name>
        <PropWrapper>
          <Prop>
            <GiUpgrade />
            {race.abilityScores}
          </Prop>
          <Text>
            <PropTitle>Age:</PropTitle>
            <FormatedText text={race.age} />
          </Text>
          <Text>
            <PropTitle>Alignment:</PropTitle>
            <FormatedText text={race.alignment} />
          </Text>
          <Text>
            <PropTitle>Size:</PropTitle>
            <FormatedText text={race.size} />
          </Text>
          <Text>
            <PropTitle>Speed:</PropTitle>
            <FormatedText text={race.speed} />
          </Text>
          <Text>
            <PropTitle>Language:</PropTitle>
            <FormatedText text={race.lang} />
          </Text>
          <Text>
            <PropTitle>Subraces:</PropTitle>
            {subraces.length !== 0 &&
              subraces.map((subrace: Subrace, index: number) => {
                const link: string = "/subrace-detail/id/" + subrace.id;
                return (
                  <SubraceLink key={index} onClick={() => history.push(link)}>
                    {subrace.name}
                  </SubraceLink>
                );
              })}
            <CreateButton onClick={() => createNewSubrace()}>
              <FontAwesomeIcon icon={faPlusCircle} />
            </CreateButton>
          </Text>
          <Prop>
            <Icon icon={faLink} />
            {race.sources}
          </Prop>
        </PropWrapper>
        <PropWrapper>
          <TextButton
            text={`Export ${race.name}`}
            icon={faFileExport}
            onClick={() => exportThis()}
          />
          {!send && (
            <TextButton
              text={`Send ${race.name}`}
              icon={faPaperPlane}
              onClick={() => setSend(true)}
            />
          )}
          {!!send && <P2PSender data={race} mode={"THIS"} />}
        </PropWrapper>
      </View>
      <View>
        {race.traits.map((trait: Trait, index: number) => {
          return (
            <TraitWrapper>
              <TraitName>{trait.name}</TraitName>
              <TraitLevel>{trait.level}</TraitLevel>
              <TraitText>
                <FormatedText text={trait.text} />
              </TraitText>
            </TraitWrapper>
          );
        })}
      </View>
    </CenterWrapper>
  );
};

export default RaceView;

const CenterWrapper = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const View = styled.div`
  color: ${({ theme }) => theme.tile.color};
  font-size: 16px;
  flex: 1 1 auto;
  max-width: 600px;
  padding: 5px;
  margin: 5px;
  height: 100%;

  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;
`;

const ImageView = styled(View)`
  justify-content: flex-end;
  flex: 1 1 300px;
`;

const Name = styled.div`
  height: auto;
  float: left;
  padding: 10px;
  margin: 5px 5px 10px 5px;
  width: calc(100% - 30px);
  color: var(--card-title-color);
  text-align: center;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.tile.backgroundColor};
`;

const PropWrapper = styled.div`
  height: auto;
  width: calc(100% - 6px);
  float: left;
  padding: 3px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const Prop = styled.div`
  flex: 1 1 auto;
  max-width: 100%;
  height: auto;
  margin: 2px;
  float: left;
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

const TraitWrapper = styled(PropWrapper)``;
const TraitName = styled.div`
  background-color: ${({ theme }) => theme.tile.backgroundColor};
  padding: 10px;
  border-radius: 5px;
  margin: 2px;
  flex: 3 3 auto;
`;
const TraitLevel = styled(TraitName)`
  flex: 1 1 auto;
`;
const TraitText = styled(TraitName)`
  flex: 4 4 auto;
`;

const Text = styled.div`
  height: auto;
  width: calc(100% - 24px);
  margin: 2px;
  float: left;
  line-height: 18px;
  padding: 10px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.tile.backgroundColor};
`;

const Link = styled.span`
  display: inline-block;
  background-color: ${({ theme }) => theme.tile.backgroundColorLink};
  border-radius: 5px;
  text-decoration: none;
  color: ${({ theme }) => theme.tile.backgroundColor};
  font-size: 10px;
  padding: 0px 5px 0px 5px;
  cursor: pointer;
`;

const SubraceLink = styled(Link)`
  font-size: 16px;
  margin: 5px;
  padding: 5px;
  cursor: pointer;
`;

const Icon = styled(FontAwesomeIcon)`
  margin-right: 5px;
  width: 20px;
  height: auto;
  border-radius: 150px;
  transition: color 0.2s;
  color: ${({ theme }) => theme.main.highlight};
`;

interface $ImageProps {
  pic: string;
}

const Image = ({ pic }: $ImageProps) => {
  if (pic !== "") {
    return <ImageElm src={pic}></ImageElm>;
  } else {
    return <Empty />;
  }
};

const ImageElm = styled.img`
  margin: 5px;
  max-height: 60vh;
`;
const Empty = styled.div``;

const CreateButton = styled.button`
  background-color: ${({ theme }) => theme.tile.backgroundColorLink};
  border-radius: 5px;
  color: ${({ theme }) => theme.tile.backgroundColor};
  font-size: 10px;
  padding: 0px 5px 0px 5px;
  margin: 5px;
  border: none;
  box-sizing: content-box;
  height: 28px;
  line-height: 28px;
  float: right;
  cursor: pointer;
`;
