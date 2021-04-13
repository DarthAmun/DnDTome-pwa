import styled from "styled-components";

const Tooltip = styled.span`
  visibility: hidden;
  width: 120px;
  font-size: 16px;
  background-color: ${({ theme }) => theme.main.highlight};
  color: #fff;
  text-align: center;
  border-radius: 10px;
  padding: 5px 0;
  margin-top: -5px;
  position: absolute;
  z-index: 1;
  opacity: 0.6;
  transition: 0.3s;

  &:hover {
    display: none;
  }
`;

export const LeftTooltip = styled(Tooltip)`
  right: 150%;

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 100%;
    margin-top: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent transparent ${({ theme }) => theme.main.highlight};
  }
`;

export const RightTooltip = styled(Tooltip)`
  left: 150%;

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    right: 100%;
    margin-top: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent ${({ theme }) => theme.main.highlight} transparent transparent;
  }
`;

type SearchMode = {
  open?: boolean;
};

export const Bar = styled.div<SearchMode>`
  position: absolute;
  z-index: 50;

  transition: transform 0.3s ease-in-out;
  transform: ${({ open }) => (open ? "translateY(0)" : "translateY(-100%)")};

  height: auto;
  min-height: 30px;
  min-width: calc(100% - 125px);
  padding: 10px 10px 10px 10px;
  background: ${({ theme }) => theme.main.backgroundColor};
  box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.25);

  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
`;

export const FixedBar = styled(Bar)<SearchMode>`
  position: fixed;
  top: 40px;
  left: 100px;
  z-index: 900;

  @media (max-width: 576px) {
    min-width: calc(100% - 20px);
    left: 0px;
  }
`;

export const SearchBar = styled.div<SearchMode>`
  position: absolute;
  bottom: -35px;
  left: calc(50% - 17px);

  height: 40px;
  width: 40px;
  transform: rotate(45deg);
  color: ${({ theme }) => theme.buttons.color};
  box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.25);
  background-color: ${({ theme }) => theme.buttons.backgroundColor};
  text-align: center;
  line-height: 40px;

  @media (max-width: 576px) {
    left: calc(50% - 20px);
  }

  svg {
    transform: rotate(-45deg);
  }
`;

export const CreateButton = styled.button`
    position: fixed;
    bottom: 10px;
    right: 10px;
    top: auto;
    z-index: 10;
  
    background-color: ${({ theme }) => theme.buttons.backgroundColor};
    color: ${({ theme }) => theme.buttons.color};
    box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.75);
    border: none;
    padding 10px;
    box-sizing:content-box;
    line-height: 20px;
    cursor: pointer;
  
    width: 30px;
    height: 30px;
    border-radius: 40px;
    text-decoration: none;
  
    &:hover {
      color: ${({ theme }) => theme.buttons.hoverColor};
      ${LeftTooltip} {
        opacity: 1;
        visibility: visible;
      }
    }
  `;

export const ExportButton = styled(CreateButton)`
  bottom: 70px;
`;

export const JoinButton = styled(CreateButton)`
  font-size: 20px;
  bottom: 130px;
`;

export const FieldGroup = styled.div`
  flex: 2 1 auto;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;
`;
