import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import Item from "../../../data/Item";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";

interface $Props {
  item: Item;
}

const ItemTile = ({ item }: $Props) => {
  const hasAttunment = useCallback(() => {
    if (item !== undefined) {
      if (!!item.attunment) {
        return <div className="icon">A</div>;
      }
    }
    return "";
  }, [item]);

  const getPicture = useCallback(() => {
    if (item !== undefined) {
      if (item.picBase64 !== "" && item.picBase64 !== null && item.picBase64 !== undefined) {
        return item.picBase64;
      } else if (item.pic !== "" && item.pic !== null && item.pic !== undefined) {
        return item.pic;
      }
    }
    return "";
  }, [item]);

  return (
    <Tile to={"/item-detail/id/" + item.id}>
      <Rarity rarity={item.rarity}>{item.rarity}</Rarity>

      <Flag>
        <b>{hasAttunment()}</b>
      </Flag>

      {getPicture() !== "" ? (
        <ImageName>
          <Image pic={getPicture()}></Image>
          <b>{item.name}</b>
        </ImageName>
      ) : (
        <Name>
          <b>{item.name}</b>
        </Name>
      )}

      <PropWrapper>
        <Prop>{item.type}</Prop>
        {item.base && (
          <>
            <Prop>{item.base}</Prop>
            <WideProp>
              <Icon icon={faLink} />
              {item.sources}
            </WideProp>
          </>
        )}
        {!item.base && (
          <Prop>
            <Icon icon={faLink} />
            {item.sources}
          </Prop>
        )}
      </PropWrapper>
    </Tile>
  );
};

export default ItemTile;

const Tile = styled(Link)`
  flex: 1 1 15em;
  color: ${({ theme }) => theme.tile.color};
  background-color: ${({ theme }) => theme.tile.backgroundColor};
  margin: 0.5em;
  border-radius: 10px;
  box-shadow: ${({ theme }) => theme.tile.boxShadow};
  overflow: hidden;
  cursor: pointer;
`;

type RarityType = {
  rarity?: string;
};

const Rarity = styled.div<RarityType>`
  height: auto;
  float: left;
  padding: 5px 10px 7px 10px;
  font-size: 12px;
  line-height: 30px;
  border-radius: 0px 0px 10px 0px;
  background-color: ${({ theme }) => theme.tile.backgroundColor};
  color: ${(props) => {
    const rarity = props.rarity?.toLowerCase().trim();
    if (rarity === "artifact") {
      return "#f74646";
    } else if (rarity === "legendary") {
      return "#f7ce46";
    } else if (rarity === "very rare") {
      return "#8000ff";
    } else if (rarity === "rare") {
      return "#4675f7";
    } else if (rarity === "uncommon") {
      return "#4dbd56";
    } else {
      return "inherit";
    }
  }};
`;

const Name = styled.div`
  height: auto;
  float: left;
  padding: 10px;
  margin: 5px;
  font-size: 14px;
  width: calc(100% - 30px);
  color: ${({ theme }) => theme.tile.headerColor};
  text-align: center;
`;

const ImageName = styled.div`
  height: 40px;
  float: left;
  padding: 10px;
  margin: 5px;
  font-size: 14px;
  width: calc(100% - 30px);
  color: ${({ theme }) => theme.tile.headerColor};
  text-align: center;
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

const WideProp = styled(Prop)`
  margin: 0 0 5px 0px;
  width: calc(100% - 20px);
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

const Icon = styled(FontAwesomeIcon)`
  margin-right: 5px;
  width: 20px;
  height: auto;
  border-radius: 150px;
  color: ${({ theme }) => theme.main.highlight};
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
  height: 57px;
  width: 57px;
  float: left;
  border-radius: 100px;
  border: 3px solid ${({ theme }) => theme.main.highlight};
  box-shadow: 0px 0px 10px 0px rgba(172, 172, 172, 0.2);
  background-color: white;
  overflow: hidden;
`;
const Empty = styled.div``;
