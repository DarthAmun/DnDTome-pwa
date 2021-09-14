import React, { useState, useEffect } from "react";
import { Avatar, Button, Divider, Input, Modal, SelectPicker } from "rsuite";
import Card, { Cards } from "../general/Card";
import { reciveAll } from "../../services/DatabaseService";
import Char from "../../data/chars/Char";
import styled from "styled-components";
import { FaUserPlus } from "react-icons/fa";

const Group = () => {
  const [showAddPlayer, setShowAddPlayer] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const [chars, setChars] = useState<Char[]>([]);
  let [data, setData] = useState<
    {
      label: string;
      value: string;
      role: string;
    }[]
  >([]);

  useEffect(() => {
    reciveAll("chars", (results: any[]) => {
      let newdata: {
        label: string;
        value: string;
        role: string;
      }[] = [];
      newdata.push({
        label: "GM",
        value: "GM",
        role: "Main",
      });
      results.forEach((result) => {
        newdata.push({
          label: result.name,
          value: result.name,
          role: "Chars",
        });
      });
      setData(newdata);
      setChars(results);
    });
  }, []);

  const addPlayer = () => {
    setShowAddPlayer(false);
  };

  return (
    <>
      {/* {peer !== undefined && (
        <Cards>
          <Card>
            Your ID: <Input value={peer.isConnected} />
            <Divider />
            You are: <SelectPicker data={data} groupBy="role" />
          </Card>
          {peer.listAllPeers((peerIds: string[]) => {
            return peerIds.map((peerId: string) => {
              return (
                <Card>
                  <Avatar
                    circle
                    src="https://avatars2.githubusercontent.com/u/12592949?s=460&v=4"
                  />
                  <Divider />
                  <Input value={peerId} />
                </Card>
              );
            });
          })}
        </Cards>
      )}

      <CreateButton onClick={() => setShowAddPlayer(true)}>
        <FaUserPlus />
      </CreateButton>
      <Modal backdrop={true} show={showAddPlayer} onHide={() => setShowAddPlayer(false)}>
        <Modal.Header>
          <Modal.Title>Add new Player</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Please add the peerId of the new player.
          <Input value={value} onChange={setValue} />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => addPlayer()} appearance="primary">
            Ok
          </Button>
          <Button onClick={() => setShowAddPlayer(false)} appearance="subtle">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal> */}
    </>
  );
};

export default Group;

const CreateButton = styled.button`
  position: fixed;
  bottom: 10px;
  left: 10px;
  top: auto;
  z-index: 10;

  background-color: ${({ theme }) => theme.highlight};
  color: ${({ theme }) => theme.textColor};
  box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.75);
  border: none;
  padding: 10px;
  box-sizing: content-box;
  line-height: 20px;
  cursor: pointer;

  width: 30px;
  height: 30px;
  border-radius: 40px;
  text-decoration: none;
`;
function usePeerState(): [any, any, any, any, any] {
  throw new Error("Function not implemented.");
}
