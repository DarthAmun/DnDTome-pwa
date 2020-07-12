import React, { useCallback } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHourglassHalf,
  faMortarPestle,
  faHistory,
  faPowerOff,
  faUser,
  faLink,
} from "@fortawesome/free-solid-svg-icons";
import Gear from "../../../Data/Gear";

interface $Props {
  gear: Gear;
}

const GearView = ({ gear }: $Props) => {
  let history = useHistory();

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
            <Icon icon={faUser} />
            {gear.type}
          </Prop>
          <Prop>
            <Icon icon={faLink} />
            {gear.cost}
          </Prop>
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
