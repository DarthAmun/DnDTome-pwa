import React, { useCallback, useState } from "react";
import Npc from "../../../../data/campaign/Npc";
import styled from "styled-components";

import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import FormatedText from "../../../general_elements/FormatedText";
import TextButton from "../../../form_elements/TextButton";
import P2PSender from "../../../p2p/P2PSender";

interface $Props {
  npc: Npc;
}

const NpcView = ({ npc }: $Props) => {
  const [send, setSend] = useState<boolean>(false);

  const getPicture = useCallback(() => {
    if (npc !== undefined) {
      if (npc.pic === "" || npc.pic === null) {
        return "";
      }
      return npc.pic;
    }
    return "";
  }, [npc]);

  return (
    <CenterWrapper>
      <View>
        {getPicture() !== "" ? (
          <ImageName>
            <Image pic={getPicture()}></Image>
            <b>{npc.name}</b>
          </ImageName>
        ) : (
          <Name>
            <b>{npc.name}</b>
          </Name>
        )}

        <PropWrapper>
          <Text>
            <FormatedText text={npc.description} />
          </Text>
          <Text>
            <PropTitle>Traits: </PropTitle>
            <FormatedText text={npc.traits} />
          </Text>
        </PropWrapper>
        <PropWrapper>
          {!send && (
            <TextButton
              text={`Send ${npc.name}`}
              icon={faPaperPlane}
              onClick={() => setSend(true)}
            />
          )}
          {!!send && <P2PSender data={npc} mode={"THIS"} />}
        </PropWrapper>
      </View>
    </CenterWrapper>
  );
};

export default NpcView;

const CenterWrapper = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
`;

const View = styled.div`
  color: ${({ theme }) => theme.tile.color};
  font-size: 16px;
  max-width: 800px;
  padding: 5px;
  margin-left: auto;
  margin-right: auto;
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

const ImageName = styled.div`
  height: 30px;
  float: left;
  padding: 10px;
  margin: 5px 5px 10px 5px;
  width: calc(100% - 30px);
  color: var(--card-title-color);
  text-align: center;
  border-radius: 50px 5px 5px 50px;
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

const Text = styled.div`
  height: auto;
  width: 100%;
  margin: 2px;
  float: left;
  line-height: 18px;
  padding: 10px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.tile.backgroundColor};
`;

const PropTitle = styled.span`
  display: inline-block;
  color: ${({ theme }) => theme.tile.backgroundColorLink};
  text-decoration: none;
  margin: 0px 5px 0px 5px;
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
  background-color: white;
  overflow: hidden;
`;
const Empty = styled.div``;
