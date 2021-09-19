import { useCallback, useEffect, useState } from "react";
import { FaHistory, FaHourglassHalf, FaLink, FaMortarPestle, FaUser } from "react-icons/fa";
import { GiBullseye } from "react-icons/gi";
import { Input, InputGroup, InputNumber } from "rsuite";
import styled from "styled-components";

import Spell from "../../../data/Spell";
import { useWebhook } from "../../../hooks/webhookHook";
import { formatDiscordText, sendEmbedMessage } from "../../../services/DiscordService";

interface $Props {
  entity: Spell;
  onEdit: (value: any) => void;
}

const SpellDetail = ({ entity, onEdit }: $Props) => {
  const [levelEdit, editLevel] = useState<boolean>(false);
  const [timeEdit, editTime] = useState<boolean>(false);

  let webhook = useWebhook();
  const [json, setJson] = useState<string>("");
  const [send, setSend] = useState<boolean>(false);

  //   useEffect(() => {
  //     if (webhook !== undefined) {
  //       let newText = formatDiscordText(entity.description);
  //       if (newText.length >= 1024) {
  //         newText = newText.substring(0, 1021) + "...";
  //       }
  //       let newJson = {
  //         username: webhook.name + " (DnDTome)",
  //         embeds: [
  //           {
  //             author: {
  //               name: entity.name,
  //               icon_url: entity.pic,
  //             },
  //             fields: [
  //               {
  //                 name: "Level",
  //                 value: entity.level ? entity.level : "-",
  //                 inline: true,
  //               },
  //               {
  //                 name: "School",
  //                 value: entity.school ? entity.school : "-",
  //                 inline: true,
  //               },
  //               {
  //                 name: "Range",
  //                 value: entity.range ? entity.range : "-",
  //                 inline: true,
  //               },
  //               {
  //                 name: "Duration",
  //                 value: entity.duration ? entity.duration : "-",
  //                 inline: true,
  //               },
  //               {
  //                 name: "Time",
  //                 value: entity.time ? entity.time : "-",
  //                 inline: true,
  //               },
  //               {
  //                 name: "Text",
  //                 value: newText,
  //               },
  //             ],
  //           },
  //         ],
  //       };
  //       setJson(JSON.stringify(newJson));
  //     }
  //   }, [entity, webhook]);

  const formatLevel = useCallback(() => {
    if (entity !== undefined) {
      if (entity.level === 0) {
        return "C";
      }
      return entity.level;
    }
    return "";
  }, [entity]);

  const hasRitual = useCallback(() => {
    if (entity !== undefined) {
      if (entity.ritual) {
        return <FlagContent>R</FlagContent>;
      }
    }
    return "";
  }, [entity]);

  const hasConcentration = useCallback(() => {
    if (entity !== undefined) {
      let search = entity.duration.toLowerCase();
      if (search.includes("concentration")) {
        return <FlagContent>C</FlagContent>;
      }
    }
    return "";
  }, [entity]);

  const getPicture = useCallback(() => {
    if (entity !== undefined) {
      if (entity.picBase64 !== "" && entity.picBase64 !== null && entity.picBase64 !== undefined) {
        return entity.picBase64;
      } else if (entity.pic !== "" && entity.pic !== null && entity.pic !== undefined) {
        return entity.pic;
      }
    }
    return "";
  }, [entity]);

  return (
    <CenterWrapper>
      <View>
        <Level isEditing={levelEdit} onClick={() => editLevel(true)}>
          {levelEdit && (
            <InputNumber
              value={entity.level}
              onChange={(val: any) => onEdit({ ...entity, level: val })}
              onKeyPress={(e: any) => {
                if (e.key === "Enter") {
                  editLevel(false);
                }
              }}
              min={1}
              step={1}
              style={{ width: "60px" }}
            />
          )}
          {!levelEdit && <b>{formatLevel()}</b>}
        </Level>

        <School school={entity.school}>{entity.school}</School>

        <Flag>
          <b>{hasConcentration()}</b>
        </Flag>
        <Flag>
          <b>{hasRitual()}</b>
        </Flag>

        {getPicture() !== "" ? (
          <ImageName>
            <Image pic={getPicture()}></Image>
            <b>{entity.name}</b>
          </ImageName>
        ) : (
          <Name>
            <b>{entity.name}</b>
          </Name>
        )}

        <PropWrapper>
          <Prop isEditing={timeEdit} onClick={() => editTime(true)}>
            {timeEdit && (
              <InputGroup style={{ width: "max-content" }}>
                <InputGroup.Addon>
                  <FaHistory />
                </InputGroup.Addon>
                <Input
                  value={entity.time}
                  onChange={(val: any) => onEdit({ ...entity, time: val })}
                  onKeyPress={(e: any) => {
                    if (e.key === "Enter") {
                      editTime(false);
                    }
                  }}
                />
              </InputGroup>
            )}
            {!timeEdit && (
              <>
                <FaHistory /> {entity.time}
              </>
            )}
          </Prop>
          <Prop>
            <FaHourglassHalf />
            {entity.duration}
          </Prop>
          <Prop>
            <GiBullseye />
            {entity.range}
          </Prop>
          <Prop>
            <FaMortarPestle />
            {entity.components}
          </Prop>
          <Prop>
            <FaUser />
            {entity.classes}
          </Prop>
          <Prop>
            <FaLink />
            {entity.sources}
          </Prop>
        </PropWrapper>
        <Text>
          {entity.description}
          {/* <FormatedText text={entity.description} /> */}
        </Text>
        {/* <PropWrapper>
          {webhook !== undefined && (
            <TextButton
              style={{
                backgroundColor: "#7289da",
              }}
              text={`Cast ${spell.name}`}
              icon={faDiscord}
              onClick={() => sendEmbedMessage(webhook, json)}
            />
          )}
          {!send && (
            <TextButton
              text={`Send ${spell.name}`}
              icon={faPaperPlane}
              onClick={() => setSend(true)}
            />
          )}
          {!!send && <P2PSender data={spell} mode={"THIS"} />}
        </PropWrapper> */}
      </View>
    </CenterWrapper>
  );
};

export default SpellDetail;

const CenterWrapper = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
`;

const View = styled.div`
  color: ${({ theme }) => theme.textColor};
  font-size: 16px;
  max-width: 800px;
  padding: 5px;
  margin-left: auto;
  margin-right: auto;
`;

const School = styled.div<{
  school?: string;
}>`
  height: auto;
  float: left;
  padding: 5px 10px 7px 10px;
  line-height: 30px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.secondColor};
  color: ${(props) => {
    if (props.school === "Necromancy") {
      return "#bef28e";
    } else if (props.school === "Conjuration") {
      return "#fce97a";
    } else if (props.school === "Evocation") {
      return "#db5740";
    } else if (props.school === "Divination") {
      return "#9ebed2";
    } else if (props.school === "Enchantment") {
      return "#ce90ca";
    } else if (props.school === "Transmutation") {
      return "#e19c60";
    } else if (props.school === "Abjuration") {
      return "#278ae4";
    } else if (props.school === "Illusion") {
      return "#8b42f9";
    } else {
      return "white";
    }
  }};
`;

const Level = styled.div<{
  isEditing?: boolean;
}>`
  height: auto;
  padding: ${(props) => (props.isEditing ? "3px" : "10px")};
  min-width: 40px;
  width: ${(props) => (props.isEditing ? "fit-content" : "40px")};
  height: ${(props) => (props.isEditing ? "fit-content" : "40px")};
  line-height: 20px;
  float: left;
  text-align: center;
  border-radius: ${(props) => (props.isEditing ? "5px" : "30px")};
  margin: 0px 5px 5px 5px;
  background-color: ${({ theme }) => theme.secondColor};
`;

const Name = styled.div`
  height: auto;
  float: left;
  padding: 10px;
  margin: 5px 5px 10px 5px;
  width: calc(100% - 15px);
  color: ${({ theme }) => theme.textColor};
  text-align: center;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.secondColor};
`;

const ImageName = styled(Name)`
  height: 30px;
  border-radius: 50px 5px 5px 50px;
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

const Prop = styled.div<{
  isEditing?: boolean;
}>`
  flex: 1 1 auto;
  max-width: 100%;
  height: auto;
  margin: 2px;
  float: left;
  padding: ${(props) => (props.isEditing ? "3px" : "10px")};
  border-radius: 5px;
  background-color: ${({ theme }) => theme.secondColor};

  svg {
    margin-right: 5px;
    width: 15px;
    height: auto;
    border-radius: 150px;
    color: ${({ theme }) => theme.highlight};
  }
`;

const Text = styled.div`
  height: auto;
  width: calc(100% - 15px);
  margin: 10px 5px 5px 5px;
  padding: 10px;
  float: left;
  line-height: 18px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.secondColor};
`;

const Flag = styled.div`
  height: auto;
  float: left;
  padding: 5px 10px 7px 10px;
  margin-left: 5px;
  font-size: 12px;
  line-height: 30px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.secondColor};
`;

const FlagContent = styled.div`
  width: fit-content;
  height: fit-content;
`;

interface $ImageProps {
  pic: string;
}

const Image = ({ pic }: $ImageProps) => {
  const style = {
    backgroundImage: `url('${pic}')`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  if (pic !== "") {
    return <ImageElm style={style}></ImageElm>;
  } else {
    return <Empty />;
  }
};

const ImageElm = styled.div`
  margin: -10px 5px -10px -10px;
  height: 47px;
  width: 47px;
  float: left;
  border-radius: 100px;
  border: 3px solid ${({ theme }) => theme.highlight};
  background-color: white;
  overflow: hidden;
`;
const Empty = styled.div``;
