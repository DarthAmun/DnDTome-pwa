import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Peer from "peerjs";
import { scanImportFileTest } from "../../services/OptionService";
import IEntity from "../../data/IEntity";

import { faCheck, faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { LoadingSpinner } from "../general/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface $Props {
  changeData: (data: IEntity[] | IEntity | undefined) => void;
  reload: (value: boolean) => void;
}

const P2PReciver = ({ changeData, reload }: $Props) => {
  const [peerId, setId] = useState<string>("");
  const [loading, isLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();
  const [state, setState] = useState<any>();
  const [peer] = useState<Peer>(
    new Peer(undefined, {
      host: "peerjs.thorbenkuck.de",
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
        console.log(data);
        setState(data);
        changeData(data);
        reload(true);
      });
    });
  }, [peer, peerId, changeData, reload]);

  const acceptData = () => {
    if (state !== undefined) {
      isLoading(true);
      scanImportFileTest(state, "recived", () => {
        setId("");
        changeData(undefined);
        reload(true);
        isLoading(false);
        setState(undefined);
      });
    }
  };

  const declineData = () => {
    setId("");
    changeData(undefined);
    reload(true);
    isLoading(false);
    setState(undefined);
  };

  return (
    <>
      {!!loading && <LoadingSpinner />}
      <>{peerId}</>
      {error && <Icon icon={faExclamationCircle} />}
      {state !== undefined && peerId !== "" && <></>}
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
