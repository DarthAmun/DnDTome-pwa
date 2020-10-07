import React from "react";
import { useHistory } from "react-router";
import TextButton from "../FormElements/TextButton";
 
const P2P = () => {
  let history = useHistory();

  return (
    <div>
      <TextButton text={"Reciver"} onClick={() => history.push(`/p2p-recive`)} /> 
      <TextButton text={"Sender"} onClick={() =>history.push(`/p2p-sender`)} /> 
    </div>
  );
};

export default P2P;