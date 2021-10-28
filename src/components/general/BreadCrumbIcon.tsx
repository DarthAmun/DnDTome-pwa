import { CgMenuGridO } from "react-icons/cg";
import { FaHome, FaMeteor } from "react-icons/fa";
import { GiBackpack } from "react-icons/gi";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const BreadCrumbIcon = () => {
  let location = useLocation();
  const base = location.pathname.split("/")[1];
  switch (base) {
    case "":
    case "home":
      return (
        <IconGroup>
          <FaHome />
        </IconGroup>
      );
    case "spell-detail":
      return (
        <IconGroup>
          <FaMeteor />
        </IconGroup>
      );
    case "spell-overview":
      return (
        <IconGroup>
          <FaMeteor size={10} />
          <FaMeteor size={20} />
          <FaMeteor size={10} />
        </IconGroup>
      );
    case "gear-detail":
      return (
        <IconGroup>
          <GiBackpack />
        </IconGroup>
      );
    case "gear-overview":
      return (
        <IconGroup>
          <GiBackpack size={10} />
          <GiBackpack size={20} />
          <GiBackpack size={10} />
        </IconGroup>
      );
    default:
      return (
        <IconGroup>
          <CgMenuGridO />
        </IconGroup>
      );
  }
};

export default BreadCrumbIcon;

const IconGroup = styled.div`
  margin-right: 10px;
  min-width: 40px;
  padding: 5px;
  height: 42px;
  line-height: 42px;
  text-align: center;
  background-color: ${({ theme }) => theme.highlight};
  border-radius: 5px;
`;
