import React, { useEffect, useState } from "react";
import Peer from "peerjs";
import { reciveAllPromise } from "../../services/DatabaseService";
import IEntity from "../../data/IEntity";
import { generateBrokerId } from "../../services/PeerIdService";
import { FaExclamationCircle } from "react-icons/fa";

interface $Props {
  data: string | IEntity;
  mode: "ALL" | "THIS";
}

const P2PSender = ({ data, mode }: $Props) => {
  const [name, setName] = useState<string>("");
  const [peer, setPeer] = useState<Peer>();
  const [error, setError] = useState<any>();

  useEffect(() => {
    if (peer === undefined) {
      const brokerId = generateBrokerId();
      const newPeer = new Peer(brokerId, {
        host: "peerjs.thorbenkuck.de",
        secure: true,
      });
      console.log(newPeer);
      newPeer.on("connection", function (conn) {
        conn.on("error", function (errorData) {
          setError(errorData);
        });
        conn.on("open", function () {
          conn.send(data);
        });
      });
      setPeer(newPeer);
    }
  }, [data, peer]);

  useEffect(() => {
    if (peer !== undefined) {
      if (peer.disconnected && !peer.destroyed) {
        peer.reconnect();
      }
      if (mode === "ALL" && typeof data === "string") {
        reciveAllPromise(data).then((results) => {
          console.log(results);
          setName(data);
          peer.on("connection", function (conn) {
            conn.on("error", function (errorData) {
              setError(errorData);
            });
            conn.on("open", function () {
              conn.send(results);
            });
          });
        });
      } else if (mode === "THIS" && typeof data !== "string") {
        setName(data.name);
        peer.on("connection", function (conn) {
          conn.on("error", function (errorData) {
            setError(errorData);
          });
          conn.on("open", function () {
            conn.send(data);
          });
        });
      }
    }
  }, [data, mode, peer]);

  return (
    <>
      {peer !== undefined && peer.id !== null && <></>}
      {error && <FaExclamationCircle />}
    </>
  );
};

export default P2PSender;
