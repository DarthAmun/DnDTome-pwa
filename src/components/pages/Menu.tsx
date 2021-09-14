import React from "react";
import { useHistory } from "react-router";
import { FaHome, FaMeteor } from "react-icons/fa";
import Card, { Cards } from "../general/Card";

const Home = () => {
  let history = useHistory();

  return (
    <Cards>
      <Card onClick={() => history.push("/home")}>
        <FaHome /> Home
      </Card>
      <Card onClick={() => history.push("/spell-overview")}>
        <FaMeteor /> Spell
      </Card>
    </Cards>
  );
};

export default Home;
