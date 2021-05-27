import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Peer from "peerjs";
import { generateBrokerId } from "../../services/PeerIdService";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import StringField from "../form_elements/StringField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Encounter from "../../data/encounter/Encounter";

interface $Props {
  encounter?: Encounter;
  isHost: boolean;
  onEdit: (value: Encounter) => void;
}

const P2PEncounter = ({ encounter, isHost, onEdit }: $Props) => {
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
        setConn((con) => [...con, conn]);
        conn.on("open", function () {
          conn.send(JSON.stringify(encounter));
        });
        conn.on("error", function (errorData) {
          setError(errorData);
        });
        conn.on("data", function (data) {
          var newData = JSON.parse(data);
          // if (encounter !== newData && encounter?.name === newData.name) {
          if (encounter !== data) {
            onEdit(newData);
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
        setConn((con) => [...con, conn]);
      });
      conn.on("data", function (data) {
        var newData = JSON.parse(data);
        // if (encounter !== newData && encounter?.name === newData.name) {
        if (encounter !== data) {
          setChanged(true);
          onEdit(newData);
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
        conn.send(JSON.stringify(encounter));
      });
    }
  }, [encounter, connections, isHost]);

  useEffect(() => {
    if (encounter && !isHost && !isChanged) {
      connections.forEach((conn) => {
        conn.send(JSON.stringify(encounter));
      });
    } else if (!isHost && isChanged) {
      setChanged(false);
    }

    // eslint-disable-next-line
  }, [encounter, connections, isHost]);

  return (
    <>
      {peer !== undefined && isHost && (
        <StringField
          value={peer.id}
          label={`Your ID:`}
          onChange={() => {}}
          style={{ minWidth: "250px", float: "right", height: "30px" }}
        />
      )}
      {peer !== undefined && !isHost && (
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
