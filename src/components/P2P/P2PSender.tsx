import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { usePeerState } from "react-peer";
import { reciveAllPromise } from "../../Services/DatabaseService";
import IEntity from "../../Data/IEntity";

import {
  faExclamationCircle,
  faSyncAlt,
  faWifi,
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

  const [id, setId] = useState<string>(generateBrokerId);
  const [name, setName] = useState<string>("");
  const [state, setState, brokerId, connections, error] = usePeerState(
    {},
    {
      brokerId: id,
    }
  );

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
      <StringField
        value={brokerId}
        label={`Your ${name} ID:`}
        onChange={() => {}}
      />
      <IconButton icon={faSyncAlt} onClick={() => setId(generateBrokerId)} />
      {brokerId && console.log(brokerId)}
      {state && console.log(state)}
      {connections && connections.length > 1 && (
        <Icon icon={faWifi} />
      )}
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
