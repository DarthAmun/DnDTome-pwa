import { useCallback } from "react";
import { FaLink, FaCoins, FaWeightHanging } from "react-icons/fa";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Gear from "../../../data/Gear";

interface $Props {
  entity: Gear;
}

const GearTile = ({ entity }: $Props) => {
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
    <Tile to={"/gear-detail/" + entity.id}>
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
        <Prop>
          <FaCoins />
          {entity.cost}
        </Prop>
        <Prop>
          <FaWeightHanging />
          {entity.weight}
        </Prop>
        <WideProp>{entity.type}</WideProp>
        <WideProp>
          <FaLink />
          {entity.sources}
        </WideProp>
      </PropWrapper>
    </Tile>
  );
};

export default GearTile;

const Tile = styled(Link)`
  flex: 1 1 20em;
  max-width: 300px;
  color: ${({ theme }) => theme.secondTextColor};
  background-color: ${({ theme }) => theme.secondColor};
  border-radius: 10px;
  box-shadow: ${({ theme }) => theme.mainColor};
  overflow: hidden;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.textColor};
  }
`;

const Name = styled.div`
  height: auto;
  float: left;
  padding: 10px;
  margin: 5px;
  font-size: 14px;
  width: calc(100% - 30px);
  color: ${({ theme }) => theme.textColor};
  text-align: center;
  border-radius: 5px;
`;

const ImageName = styled.div`
  height: 30px;
  float: left;
  padding: 10px;
  margin: 5px;
  font-size: 14px;
  width: calc(100% - 30px);
  color: ${({ theme }) => theme.textColor};
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
  height: 30px;
  width: calc(50% - 22.5px);
  margin: 0 0 5px 5px;
  float: left;
  line-height: 10px;
  padding: 10px;
  font-size: 12px;
  color: ${({ theme }) => theme.secondTextColor};
  border-radius: 5px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

  &:nth-child(odd) {
    margin: 0 0 5px 0px;
  }

  svg {
    margin-right: 5px;
    width: 12px;
    height: auto;
    border-radius: 150px;
    color: ${({ theme }) => theme.highlight};
  }
`;

const WideProp = styled(Prop)`
  margin: 0 0 5px 0px;
  width: calc(100% - 20px);
  display: flex;
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
  box-shadow: 0px 0px 10px 0px rgba(172, 172, 172, 0.2);
  background-color: white;
  overflow: hidden;
`;
const Empty = styled.div``;
