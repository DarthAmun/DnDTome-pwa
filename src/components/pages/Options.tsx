import { useState } from "react";
import { FaTools } from "react-icons/fa";
import { RiHomeGearFill, RiPaintBrushFill } from "react-icons/ri";
import { Nav, Navbar } from "rsuite";
import styled from "styled-components";
import { TopBar } from "../generic/details/EntityDetail";
import General from "./Options/General";

const Options = () => {
  const [activeKey, setActiveKey] = useState("1");

  return (
    <>
      {/* <TopBar>
        <Nav appearance="subtle" activeKey={activeKey} onSelect={setActiveKey}>
          <Nav.Item eventKey="1" icon={<RiHomeGearFill />}>
            General
          </Nav.Item>
          <Nav.Item eventKey="2" icon={<FaTools />}>
            5eTools
          </Nav.Item>
          <Nav.Item eventKey="3" icon={<RiPaintBrushFill />}>
            Theme
          </Nav.Item>
        </Nav>
      </TopBar> */}
      <ContentWrapper>
        <OptionContent>{activeKey === "1" && <General />}</OptionContent>
      </ContentWrapper>
    </>
  );
};

export default Options;

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
`;
const OptionContent = styled.div`
  width: 100%;
`;
