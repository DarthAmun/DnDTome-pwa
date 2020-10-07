import React, {  useState } from "react";
import { useReceivePeerState  } from 'react-peer';
 
const P2PReciver = () => {
    const [state, isConnected, error] = useReceivePeerState('ahdlasnlasgdvkahvskhd');

  return (
    <div>
        {console.log(isConnected)}{console.log(state)}{console.log(error)}
    </div>
  );
};

export default P2PReciver;