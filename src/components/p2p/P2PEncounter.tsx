import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Peer from "peerjs";
import { generateBrokerId } from "../../services/PeerIdService";

import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import StringField from "../form_elements/StringField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BuildEncounter from "../../data/encounter/BuildEncounter";

interface $Props {
  encounter?: BuildEncounter;
  isHost: boolean;
  onEdit: (value: BuildEncounter) => void;
}

const P2PEncounter = ({ encounter, isHost, onEdit }: $Props) => {
  const [master, setMaster] = useState<boolean | undefined>();
  const [peerId, setId] = useState<string>("");
  const [peer, setPeer] = useState<Peer>();
  const [error, setError] = useState<any>();
  const [connections, setConn] = useState<any[]>([]);
  const [isChanged, setChanged] = useState<boolean>(false);

  useEffect(() => {
    if (peer === undefined) {
      const brokerId = generateBrokerId();
      const newPeer = new Peer(brokerId, {
        host: "peerjs.thorbenkuck.de",
        secure: true,
      });
      newPeer.on("connection", function (conn) {
        console.log(conn);
        setMaster(true);
        setConn((con) => [...con, conn]);

        conn.on("error", function (errorData) {
          setError(errorData);
        });
        conn.on("data", function (data) {
          if (encounter !== data) {
            onEdit(data);
          }
        });
        conn.on("close", function () {
          setConn((con) => con.filter((con) => con !== conn));
        });
      });
      setPeer(newPeer);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (peer !== undefined && peerId !== "") {
      let conn = peer.connect(peerId);

      conn.on("open", function () {
        setMaster(false);
        setConn((con) => [...con, conn]);
      });
      conn.on("data", function (data) {
        if (encounter !== data) {
          setChanged(true);
          onEdit(data);
        }
      });
      conn.on("close", function () {
        setConn((con) => con.filter((con) => con !== conn));
      });
    }

    // eslint-disable-next-line
  }, [peer, peerId, onEdit]);

  useEffect(() => {
    if (encounter && isHost) {
      connections.forEach((conn) => {
        conn.send(encounter);
      });
    }
  }, [encounter, connections, isHost]);

  useEffect(() => {
    if (encounter && !isHost && !isChanged) {
      connections.forEach((conn) => {
        conn.send(encounter);
      });
    } else if (!isHost && isChanged) {
      setChanged(false);
    }

    // eslint-disable-next-line
  }, [encounter, connections, isHost]);

  return (
    <>
      {peer !== undefined && (master || master === undefined) && (
        <StringField
          value={peer.id}
          label={`Your ID:`}
          onChange={() => {}}
          style={{ minWidth: "250px", float: "right" }}
        />
      )}
      {peer !== undefined && connections.length === 0 && (
        <StringField
          value={peerId}
          label={"ID to recive from"}
          onChange={setId}
          style={{ minWidth: "250px", float: "right" }}
        />
      )}
      {error && <Icon icon={faExclamationCircle} />}
    </>
  );
};

export default P2PEncounter;

const Icon = styled(FontAwesomeIcon)`
  margin-right: 5px;
  width: 20px;
  height: auto;
  border-radius: 150px;
  color: ${({ theme }) => theme.main.highlight};
`;
