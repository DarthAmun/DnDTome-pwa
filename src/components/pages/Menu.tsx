import { useHistory } from "react-router";
import { FaHome, FaMeteor } from "react-icons/fa";
import Card, { Cards } from "../general/Card";
import { GiBackpack } from "react-icons/gi";

interface $MenuProps {
  show: (val: boolean) => void;
}

const Menu = ({ show }: $MenuProps) => {
  let history = useHistory();

  const move = (destination: string) => {
    history.push(destination);
    show(false);
  };

  return (
    <Cards>
      <Card onClick={() => move("/home")}>
        <FaHome /> Home
      </Card>
      <Card onClick={() => move("/spell-overview")}>
        <FaMeteor /> Spell
      </Card>
      <Card onClick={() => move("/gear-overview")}>
        <GiBackpack /> Gear
      </Card>
    </Cards>
  );
};

export default Menu;
