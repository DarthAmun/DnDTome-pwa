import React, { useState } from "react";
import styled from "styled-components";
import { useReceivePeerState } from "react-peer";

import { faCheck, faExclamationCircle, faWifi } from "@fortawesome/free-solid-svg-icons";
import StringField from "../FormElements/StringField";
import TextButton from "../FormElements/TextButton";
import { scanImportFileTest } from "../../Services/OptionService";
import { LoadingSpinner } from "../Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface $Props {
  reload: (value: boolean) => void;
}

const P2PReciver = ({ reload }: $Props) => {
  const [peerId, setId] = useState<string>("");
  const [loading, isLoading] = useState<boolean>(false);
  const [state, isConnected, error] = useReceivePeerState(peerId);

  const acceptData = () => {
    if (state !== undefined) {
      isLoading(true);
      scanImportFileTest(state, "recived", () => {
        setId("");
        reload(true);
        isLoading(false);
      });
    }
  };

  return (
    <>
      <StringField
        value={peerId}
        label={"ID to recive from"}
        onChange={(id) => setId(id)}
      />
      {state !== undefined && peerId !== "" && (
        <>
          <TextButton
            text={"Accept"}
            icon={faCheck}
            onClick={() => acceptData()}
          />
          <TextButton
            text={"Decline"}
            icon={faCheck}
            onClick={() => setId("")}
          />
        </>
      )}
      {!!loading && <LoadingSpinner />}
      {isConnected && <Icon icon={faWifi} />}
      {error && <Icon icon={faExclamationCircle} />}
    </>
  );
};

export default P2PReciver;

const Icon = styled(FontAwesomeIcon)`
  margin-right: 5px;
  width: 20px;
  height: auto;
  border-radius: 150px;
  color: ${({ theme }) => theme.main.highlight};
`;
