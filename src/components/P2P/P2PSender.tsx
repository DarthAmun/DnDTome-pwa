import React, { useEffect, useState } from "react";
import { usePeerState  } from 'react-peer';
import StringField from "../FormElements/StringField";
import TextButton from "../FormElements/TextButton";
 
const P2PSender = () => {
    const [msg, setMsg] = useState<string>("");
    const [state, setState, brokerId, connections, error] = usePeerState({}, {brokerId: "ahdlasnlasgdvkahvskhd"});

    useEffect(() =>{
        setState({ message: 'hello' });
    },[])

  return (
    <div>
      {console.log(brokerId)}{console.log(connections)}{console.log(state)}{console.log(error)}
        <StringField value={msg} label={"Msg"} onChange={(id) => setMsg(id)}/>
        <TextButton text={"Send"} onClick={() => setState({message: msg})} /> 
    </div>
  );
};

export default P2PSender;