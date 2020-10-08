import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Peer from "peerjs";

import {
  faCheck,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
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
  const [error, setError] = useState<any>();
  const [state, setState] = useState<any>();
  const [peer] = useState<Peer>(
    new Peer(undefined, {
      host: "peerjs.thedndtome.com",
      secure: true,
    })
  );

  useEffect(() => {
    const conn = peer.connect(peerId);
    conn.on("open", function () {
      conn.on("error", function (data) {
        setError(data);
      });
      // Receive messages
      conn.on("data", function (data) {
        setState(data);
      });
    });
  }, [peer, peerId]);

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
