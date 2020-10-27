import React, { useCallback, useState } from "react";
import Selection from "../../../../Data/Selection";
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
  selection: Selection;
}

const SelectionView = ({ selection }: $Props) => {
  const [send, setSend] = useState<boolean>(false);

  return (
    <CenterWrapper>
      <View>
        <Name>
          <b>{selection.name}</b>
        </Name>

        <PropWrapper></PropWrapper>
        <PropWrapper>
          {!send && (
            <TextButton
              text={`Send ${selection.name}`}
              icon={faPaperPlane}
              onClick={() => setSend(true)}
            />
          )}
          {!!send && <P2PSender data={selection} mode={"THIS"} />}
        </PropWrapper>
      </View>
    </CenterWrapper>
  );
};

export default SelectionView;

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
