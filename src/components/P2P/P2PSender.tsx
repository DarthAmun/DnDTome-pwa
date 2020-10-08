import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Peer from "peerjs";
import { reciveAllPromise } from "../../Services/DatabaseService";
import IEntity from "../../Data/IEntity";

import {
  faExclamationCircle,
  faSyncAlt,
} from "@fortawesome/free-solid-svg-icons";
import IconButton from "../FormElements/IconButton";
import StringField from "../FormElements/StringField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface $Props {
  data: string | IEntity;
  mode: "ALL" | "THIS";
}

const P2PSender = ({ data, mode }: $Props) => {
  const generateBrokerId = () => {
    return Math.random().toString(36).slice(-11);
  };

  const [id, setId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [state, setState] = useState<any>();
  const [error, setError] = useState<any>();
  const [peer] = useState<Peer>(
    new Peer(generateBrokerId(), {
      host: "peerjs.thedndtome.com",
      secure: true,
    })
  );

  useEffect(() => {
    setId(peer.id);
    peer.on("connection", function (conn) {
      conn.on("error", function (data) {
        setError(data);
      });
      conn.on("open", function () {
        // Send messages
        conn.send(state);
      });
    });
  }, [peer, state]);

  useEffect(() => {
    if (mode === "ALL" && typeof data === "string") {
      reciveAllPromise(data).then((results) => {
        setState(results);
        setName(data);
      });
    } else if (mode === "THIS" && typeof data !== "string") {
      setState(data);
      setName(data.name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <StringField value={id} label={`Your ${name} ID:`} onChange={() => {}} />
      <IconButton icon={faSyncAlt} onClick={() => setId(generateBrokerId)} />
      {state && console.log(state)}
      {error && <Icon icon={faExclamationCircle} />}
    </>
  );
};

export default P2PSender;

const Icon = styled(FontAwesomeIcon)`
  margin-right: 5px;
  width: 20px;
  height: auto;
  border-radius: 150px;
  color: ${({ theme }) => theme.main.highlight};
`;
