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
        <Ribbon>
          <i>
            <span>
              <FaHome />
            </span>
          </i>
        </Ribbon>
      );
    case "spell-builder":
    case "spell-detail":
      return (
        <Ribbon>
          <i>
            <span>
              <FaMeteor />
            </span>
          </i>
        </Ribbon>
      );
    case "spell-overview":
      return (
        <Ribbon>
          <i>
            <span>
              <FaMeteor size={10} />
              <FaMeteor size={20} />
              <FaMeteor size={10} />
            </span>
          </i>
        </Ribbon>
      );
    case "gear-builder":
    case "gear-detail":
      return (
        <Ribbon>
          <i>
            <span>
              <GiBackpack />
            </span>
          </i>
        </Ribbon>
      );
    case "gear-overview":
      return (
        <Ribbon>
          <i>
            <span>
              <GiBackpack size={10} />
              <GiBackpack size={20} />
              <GiBackpack size={10} />
            </span>
          </i>
        </Ribbon>
      );
    default:
      return (
        <Ribbon>
          <i>
            <span>
              <CgMenuGridO />
            </span>
          </i>
        </Ribbon>
      );
  }
};

export default BreadCrumbIcon;

const IconGroup = styled.div`
  margin-right: 10px;
  min-width: 40px;
  padding: 5px;
  height: 42px;
  line-height: 37px;
  text-align: center;
  background-color: ${({ theme }) => theme.highlight};
  border-radius: 5px;
`;

const Ribbon = styled.div`
  margin: 3em;
  /* IE10 Consumer Preview */
  background-image: -ms-radial-gradient(center top, circle farthest-side, #f55c5c 0%, #c24a4a 100%);
  /* Mozilla Firefox */
  background-image: -moz-radial-gradient(
    center top,
    circle farthest-side,
    #f55c5c 0%,
    #c24a4a 100%
  );
  /* Opera */
  background-image: -o-radial-gradient(center top, circle farthest-side, #f55c5c 0%, #c24a4a 100%);
  /* Webkit (Safari/Chrome 10) */
  background-image: -webkit-gradient(
    radial,
    center top,
    0,
    center top,
    487,
    color-stop(0, #f55c5c),
    color-stop(1, #c24a4a)
  );
  /* Webkit (Chrome 11+) */
  background-image: -webkit-radial-gradient(
    center top,
    circle farthest-side,
    #f55c5c 0%,
    #c24a4a 100%
  );
  /* W3C Markup, IE10 Release Preview */
  background-image: radial-gradient(circle farthest-side at center top, #f55c5c 0%, #c24a4a 100%);
  width: 3.5em;
  height: 3em;
  position: relative;
  top: -20px;
  margin: 0px 10px 0px -10px;
  border-top-right-radius: 0.2em;
  border-top-left-radius: 0.2em;
  font-family: "Kite One", sans-serif;

  &:before {
    content: "";
    position: absolute;
    bottom: -2.4em;
    left: 0;
    width: 0;
    height: 0;
    border-top: 2.5em solid #c24a4a;
    border-right: 2.5em solid transparent;
  }
  &:after {
    content: "";
    position: absolute;
    bottom: -2.4em;
    right: 0;
    width: 0;
    height: 0;
    border-top: 2.5em solid #c24a4a;
    border-left: 2.5em solid transparent;
  }

  & i {
    width: 90%;
    height: 160%;
    display: block;
    margin: auto;
    z-index: 100;
    position: relative;
    border-right: dashed 0.0625em #333;
    border-left: dashed 0.0625em #333;
    overflow: hidden;
  }

  & i span {
    color: #fff;
    display: block;
    text-align: center;
    top: 50%;
    margin-top: -1em;
    position: relative;
    text-shadow: 0.0625em 0.0625em 0.0625em #333;
    font-style: normal;
    font-weight: bold;
  }
`;
