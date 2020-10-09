import React from "react";
import styled from "styled-components";
import { useTheme } from "../Theme/MyThemeProvider";
import { darkTheme, lightTheme } from "../Theme/Theme";

import { faPatreon, faDiscord } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const GeneralOptions = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === darkTheme) {
      setTheme(lightTheme);
      localStorage.setItem("theme", "light");
    } else {
      setTheme(darkTheme);
      localStorage.setItem("theme", "dark");
    }
  };

  return (
    <General>
      <OptionSection>
        <SelectionTitle>Want to support me?</SelectionTitle>
        <ExternalLink
          href="https://www.patreon.com/bePatron?u=25310394"
          target="_blank"
          rel="noopener noreferrer"
          className="patreon"
        >
          <FontAwesomeIcon icon={faPatreon} /> Become a patron
        </ExternalLink>
      </OptionSection>
      <OptionSection>
        <SelectionTitle>Found some bugs? Or have some feedback?</SelectionTitle>
        <ExternalLink
          href="https://discord.gg/2KB3tzG"
          target="_blank"
          rel="noopener noreferrer"
          className="discord"
        >
          <FontAwesomeIcon icon={faDiscord} /> Join the discord
        </ExternalLink>
      </OptionSection>
      <OptionSection>
        <SelectionTitle>Theme</SelectionTitle>
        <Button onClick={() => toggleTheme()}>Toggle Style</Button>
      </OptionSection>
    </General>
  );
};

export default GeneralOptions;

const General = styled.div`
  flex: 1 1 auto;

  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
`;

const OptionSection = styled(General)`
  flex: 1 1 auto;
  color: ${({ theme }) => theme.tile.color};
  background-color: ${({ theme }) => theme.tile.backgroundColor};
  margin: 0.5em;
  border-radius: 3px;
  box-shadow: ${({ theme }) => theme.tile.boxShadow};
  overflow: hidden;

  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
`;

const Button = styled.button`
  flex: 1 1 auto;
  display: inline-block;
  text-decoration: none;
  background-color: ${({ theme }) => theme.buttons.backgroundColor};
  height: 28px;
  border: none;
  border-radius: 5px;
  padding-left: 10px;
  padding-right: 10px;
  margin: 5px;
  text-align: center;
  font-family: inherit;
  font-size: 14px;
  color: ${({ theme }) => theme.buttons.color};
  cursor: pointer;
  line-height: 26px;
`;

const ExternalLink = styled.a`
  flex: 1 1 auto;
  display: inline-block;
  text-decoration: none;
  background-color: ${({ theme }) => theme.buttons.backgroundColor};
  height: 38px;
  border: none;
  border-radius: 5px;
  padding-left: 10px;
  padding-right: 10px;
  margin: 5px;
  text-align: center;
  font-family: inherit;
  font-size: 14px;
  color: ${({ theme }) => theme.buttons.color};
  cursor: pointer;
  line-height: 36px;

  &.patreon {
    background-color: rgb(232, 91, 70);
  }
  &.discord {
    background-color: #7289da;
  }
`;

const SelectionTitle = styled.div`
  flex: 1 1 auto;
  padding: 5px;
  margin: 5px;
  min-width: calc(100% - 20px);
  font-weight: bold;
  text-algin: center;
  border-radius: 5px;
  color: ${({ theme }) => theme.input.color};
  background-color: ${({ theme }) => theme.input.backgroundColor};
`;
