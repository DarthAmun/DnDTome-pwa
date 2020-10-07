import React, { useEffect, useState } from "react";
import { usePeerState } from "react-peer";
import { reciveAllPromise } from "../../Services/DatabaseService";

import { faSyncAlt } from "@fortawesome/free-solid-svg-icons";
import IconButton from "../FormElements/IconButton";
import StringField from "../FormElements/StringField";

interface $Props {
  data: string;
}

const P2PSender = ({ data }: $Props) => {
  const generateBrokerId = () => {
    return Math.random().toString(36).slice(-8);
  };

  const [id, setId] = useState<string>(generateBrokerId);
  const [state, setState, brokerId, error] = usePeerState({}, { brokerId: id });

  useEffect(() => {
    reciveAllPromise(data).then((results) => {
      setState(results);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <StringField value={brokerId} label={`Your ${data} ID:`} onChange={() => {}} />
      <IconButton icon={faSyncAlt} onClick={() => setId(generateBrokerId)} />
      {state && console.log(state)}
      {error && console.log(error)}
    </>
  );
};

export default P2PSender;
