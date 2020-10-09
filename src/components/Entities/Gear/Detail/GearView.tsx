import React, { useCallback, useState } from "react";
import Gear from "../../../../Data/Gear";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLink,
  faCoins,
  faWeightHanging,
  faCrosshairs,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import FormatedText from "../../../GeneralElements/FormatedText";
import TextButton from "../../../FormElements/TextButton";
import P2PSender from "../../../P2P/P2PSender";

interface $Props {
  gear: Gear;
}

const GearView = ({ gear }: $Props) => {
  const [send, setSend] = useState<boolean>(false);

  const getPicture = useCallback(() => {
    if (gear !== undefined) {
      if (gear.pic === "" || gear.pic === null) {
        return "";
      }
      return gear.pic;
    }
    return "";
  }, [gear]);

  return (
    <CenterWrapper>
      <View>
        {getPicture() !== "" ? (
          <ImageName>
            <Image pic={getPicture()}></Image>
            <b>{gear.name}</b>
          </ImageName>
        ) : (
          <Name>
            <b>{gear.name}</b>
          </Name>
        )}

        <PropWrapper>
          <Prop>
            <Icon icon={faCoins} />
            {gear.cost}
          </Prop>
          <Prop>
            <Icon icon={faWeightHanging} />
            {gear.weight}
          </Prop>
          <Prop>{gear.type}</Prop>
          <Prop>
            <Icon icon={faLink} />
            {gear.sources}
          </Prop>
          {gear.damage && (
            <Prop>
              <Icon icon={faCrosshairs} />
              {gear.damage}
            </Prop>
          )}
          {gear.properties && <Prop>{gear.properties}</Prop>}
          <Text>
            <FormatedText text={gear.description} />
          </Text>
        </PropWrapper>
        <PropWrapper>
          {!send && (
            <TextButton
              text={`Send ${gear.name}`}
              icon={faPaperPlane}
              onClick={() => setSend(true)}
            />
          )}
          {!!send && <P2PSender data={gear} mode={"THIS"} />}
        </PropWrapper>
      </View>
    </CenterWrapper>
  );
};

export default GearView;

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

const Prop = styled.div`
  flex: 1 1 auto;
  max-width: 100%;
  height: auto;
  margin: 2px;
  float: left;
  padding: 10px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.tile.backgroundColor};
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
  transition: color 0.2s;
  color: ${({ theme }) => theme.main.highlight};
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
