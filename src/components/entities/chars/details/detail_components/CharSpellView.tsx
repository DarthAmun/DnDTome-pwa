import {
  faChevronDown,
  faChevronUp,
  faHistory,
  faHourglassHalf,
  faMortarPestle,
  faPowerOff,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useEffect, useState } from "react";
import { GiBoltSpellCast } from "react-icons/gi";
import styled from "styled-components";
import BuildChar from "../../../../../data/chars/BuildChar";
import Spell from "../../../../../data/Spell";
import { useWebhook } from "../../../../../hooks/webhookHook";
import { formatDiscordText, sendEmbedMessage } from "../../../../../services/DiscordService";
import FormatedText from "../../../../general_elements/FormatedText";

interface $Props {
  spell: Spell;
  prepared: boolean;
  char: BuildChar;
  saveChar: (char: BuildChar) => void;
}

const CharSpellView = ({ spell, prepared, char, saveChar }: $Props) => {
  let webhook = useWebhook();
  const [json, setJson] = useState<string>("");
  const [showText, setShowText] = useState<boolean>(false);
  const [spellLevel, changeLevel] = useState<number>(spell.level);

  useEffect(() => {
    if (webhook !== undefined) {
      let newText = formatDiscordText(spell.text);
      if (newText.length >= 1024) {
        newText = newText.substring(0, 1021) + "...";
      }
      let newJson = {
        username: webhook.name + " (DnDTome)",
        embeds: [
          {
            author: {
              name: char !== undefined ? char.character.name : "???",
              icon_url: char !== undefined ? char.character.pic : "",
            },
            thumbnail: {
              url: spell.pic,
            },
            fields: [
              {
                name: "Name",
                value: spell.name,
                inline: true,
              },
              {
                name: "Level",
                value: spell.level ? `${spell.level} (${spellLevel})` : "-",
                inline: true,
              },
              {
                name: "School",
                value: spell.school ? spell.school : "-",
                inline: true,
              },
              {
                name: "Range",
                value: spell.range ? spell.range : "-",
                inline: true,
              },
              {
                name: "Duration",
                value: spell.duration ? spell.duration : "-",
                inline: true,
              },
              {
                name: "Time",
                value: spell.time ? spell.time : "-",
                inline: true,
              },
              {
                name: "Text",
                value: newText,
              },
            ],
            footer: {
              text:
                char.character?.spellSlots
                  ?.map((slots) => {
                    if (slots.slots[spellLevel - 1] > 0) return true;
                    else return false;
                  })
                  .filter((s) => s).length > 0
                  ? "Spellslot used!"
                  : spellLevel !== 0
                  ? "No spellslot for casting!"
                  : "Cantrip casted!",
            },
          },
        ],
      };
      setJson(JSON.stringify(newJson));
    }
  }, [spell, spellLevel, char, webhook]);

  const formatTime = useCallback(() => {
    if (spell !== undefined) {
      let words = spell.time.split(",");
      return words[0];
    }
    return "";
  }, [spell]);

  const hasRitual = useCallback(() => {
    if (spell !== undefined) {
      if (spell.ritual === 1) {
        return <div className="icon">R</div>;
      }
    }
    return "";
  }, [spell]);

  const isPrepared = useCallback(() => {
    if (spell !== undefined && prepared !== undefined) {
      if (prepared) {
        return <div className="icon">P</div>;
      }
    }
    return "";
  }, [spell, prepared]);

  const hasConcentration = useCallback(() => {
    if (spell !== undefined) {
      let search = spell.duration.toLowerCase();
      if (search.includes("concentration")) {
        return <div className="icon">C</div>;
      }
    }
    return "";
  }, [spell]);

  const formatComponents = useCallback(() => {
    if (spell !== undefined) {
      let words = spell.components.split("(");
      if (words.length > 1) {
        return words[0] + "*";
      }
      return words[0];
    }
    return "";
  }, [spell]);

  const formatDuration = useCallback(() => {
    if (spell !== undefined) {
      let search = spell.duration.toLowerCase();
      if (search.includes("concentration")) {
        if (search.includes("concentration, ")) {
          let words = spell.duration.replace("Concentration,", "").trim();
          return words;
        } else {
          let words = spell.duration.replace("Concentration", "").trim();
          return words;
        }
      }
      return spell.duration;
    }
    return "";
  }, [spell]);

  const getPicture = useCallback(() => {
    if (spell !== undefined) {
      if (spell.pic === "" || spell.pic === null) {
        return "";
      }
      return spell.pic;
    }
    return "";
  }, [spell]);

  const castSpell = useCallback(() => {
    let hasSlot: boolean = false;
    let newSpellslots = char.character.spellSlots.map((slots) => {
      if (slots.slots[spellLevel - 1] > 0) {
        hasSlot = true;
        let newSlots = [...slots.slots];
        newSlots[spellLevel - 1] = newSlots[spellLevel - 1] - 1;
        return { ...slots, slots: newSlots };
      }
      return slots;
    });

    if (hasSlot) {
      saveChar({ ...char, character: { ...char.character, spellSlots: newSpellslots } });
    }
    if (webhook !== undefined) sendEmbedMessage(webhook, json);
  }, [json, spellLevel, char, saveChar, webhook]);

  return (
    <Tile showText={showText ? 1 : 0}>
      <School school={spell.school}>{spell.school}</School>

      <Flag>
        <b>{isPrepared()}</b>
      </Flag>
      <Flag>
        <b>{hasConcentration()}</b>
      </Flag>
      <Flag>
        <b>{hasRitual()}</b>
      </Flag>

      <Level>
        <LevelField
          type={"number"}
          min={spell.level}
          value={spellLevel}
          onChange={(e) => changeLevel(+e.target.value)}
        />
      </Level>
      {getPicture() !== "" ? (
        <ImageName>
          <Image pic={getPicture()}></Image>
          <b>{spell.name}</b>
          <CastButton onClick={() => castSpell()} style={{ padding: "5px" }}>
            <GiBoltSpellCast />
            {"Cast"}
          </CastButton>
        </ImageName>
      ) : (
        <Name>
          <b>{spell.name}</b>
          <CastButton onClick={() => castSpell()} style={{}}>
            <GiBoltSpellCast />
            {"Cast"}
          </CastButton>
        </Name>
      )}

      <PropWrapper>
        <Prop>
          <Icon icon={faHistory} />
          {formatTime()}
        </Prop>
        <Prop>
          <Icon icon={faHourglassHalf} />
          {formatDuration()}
        </Prop>
        <Prop>
          <Icon icon={faPowerOff} transform={{ rotate: 42 }} />
          {spell.range}
        </Prop>
        <Prop>
          <Icon icon={faMortarPestle} />
          {formatComponents()}
        </Prop>
      </PropWrapper>
      {showText && (
        <>
          <Text>
            <FormatedText text={spell.text} />
          </Text>
          <ToggleButton onClick={() => setShowText(false)}>
            <FontAwesomeIcon icon={faChevronUp} />
          </ToggleButton>
        </>
      )}
      {!showText && (
        <ToggleButton onClick={() => setShowText(true)}>
          <FontAwesomeIcon icon={faChevronDown} />
        </ToggleButton>
      )}
    </Tile>
  );
};

export default CharSpellView;

const CastButton = styled.button`
  color: ${({ theme }) => theme.buttons.color};
  font-size: 16px;
  overflow: hidden;
  height: ${({ theme }) => theme.buttons.height};
  line-height: ${({ theme }) => theme.buttons.height};
  float: right;
  margin: 5px;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: inset -2px -2px 5px 0px rgba(0, 0, 0, 0.3);
  box-sizing: content-box;
  border: none;

  transition: color 0.2s;

  padding: 5px;
  background: ${({ theme }) => theme.buttons.backgroundColor};
  background: -moz-linear-gradient(
    -45deg,
    ${({ theme }) => theme.buttons.backgroundColor} 0%,
    ${({ theme }) => theme.buttons.backgroundColor} 50%,
    #7289da 51%,
    #7289da 100%
  );
  background: -webkit-linear-gradient(
    -45deg,
    ${({ theme }) => theme.buttons.backgroundColor} 0%,
    ${({ theme }) => theme.buttons.backgroundColor} 50%,
    #7289da 51%,
    #7289da 100%
  );
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.buttons.backgroundColor} 0%,
    ${({ theme }) => theme.buttons.backgroundColor} 50%,
    #7289da 51%,
    #7289da 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='${({ theme }) =>
    theme.buttons.backgroundColor}', endColorstr='#7289da',GradientType=1 );

  &:hover {
    color: ${({ theme }) => theme.buttons.hoverColor};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.buttons.disabled};
  }
`;

const LevelField = styled.input`
  width: 20px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  padding: 5px;

  background-color: ${({ theme }) => theme.input.backgroundColor};
  color: ${({ theme }) => theme.input.color};

  border: none;
  border-radius: 30px;

  -moz-appearance: textfield;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

type TileType = {
  showText: number;
};

const Tile = styled.div<TileType>`
  ${(props) => {
    if (props.showText) {
      return "flex: 3 3 30em;";
    } else {
      return "flex: 1 1 15em;";
    }
  }}
  color: ${({ theme }) => theme.tile.color};
  background-color: ${({ theme }) => theme.tile.backgroundColor};
  margin: 0.5em;
  border-radius: 10px;
  box-shadow: ${({ theme }) => theme.tile.boxShadow};
  overflow: hidden;
  transition: all 0.5s;
`;

type SchoolType = {
  school?: string;
};

const School = styled.div<SchoolType>`
  height: auto;
  float: left;
  padding: 5px 10px 7px 10px;
  font-size: 12px;
  line-height: 30px;
  border-radius: 0px 0px 10px 0px;
  background-color: ${({ theme }) => theme.tile.backgroundColor};
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

const Level = styled.div`
  margin: 5px;
  line-height: 20px;
  float: right;
  text-align: center;
  border-top-right-radius: 3px;
  border-radius: 30px;
  border-bottom: solid 1px ${({ theme }) => theme.main.highlight};
`;

const Name = styled.div`
  height: 30px;
  float: left;
  padding: 10px;
  margin: 0 5px 5px 5px;
  font-size: 14px;
  width: calc(100% - 30px);
  color: ${({ theme }) => theme.tile.headerColor};
  text-align: center;
  border-radius: 5px;
`;

const ImageName = styled.div`
  height: 30px;
  float: left;
  padding: 10px;
  margin: 0 5px 5px 5px;
  font-size: 14px;
  width: calc(100% - 30px);
  color: ${({ theme }) => theme.tile.headerColor};
  text-align: center;
  border-radius: 50px 5px 5px 50px;
`;

const PropWrapper = styled.div`
  height: auto;
  width: calc(100% - 10px);
  float: left;
  padding: 5px 5px 0 5px;
  display: flex;
  flex-wrap: wrap;
`;

const Prop = styled.div`
  height: 12px;
  width: calc(50% - 22.5px);
  margin: 0 0 5px 5px;
  float: left;
  line-height: 10px;
  padding: 10px;
  font-size: 12px;
  border-radius: 5px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

  &:nth-child(odd) {
  margin: 0 0 5px 0px;
  }
}
`;

const Text = styled.div`
  height: auto;
  width: calc(100% - 30px);
  margin: 10px 5px 5px 5px;
  float: left;
  line-height: 18px;
  padding: 10px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.tile.backgroundColor};
`;

const Icon = styled(FontAwesomeIcon)`
  margin-right: 5px;
  width: 20px;
  height: auto;
  border-radius: 150px;
  color: ${({ theme }) => theme.main.highlight};
`;

const Flag = styled.div`
  height: auto;
  float: left;
  padding: 5px 10px 7px 10px;
  margin-left: 5px;
  font-size: 12px;
  line-height: 30px;
  border-radius: 0px 0px 10px 10px;
`;

interface $ImageProps {
  pic: string;
}

const Image = ({ pic }: $ImageProps) => {
  const style = {
    backgroundImage: `url(${pic})`,
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
  border: 3px solid ${({ theme }) => theme.main.highlight};
  box-shadow: 0px 0px 10px 0px rgba(172, 172, 172, 0.2);
  background-color: white;
  overflow: hidden;
`;
const Empty = styled.div``;

const ToggleButton = styled.div`
  float: left;
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.main.highlight};
  }
`;
