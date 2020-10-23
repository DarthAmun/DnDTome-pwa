import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";

import Book from "../../Data/Book";
import Class from "../../Data/Classes/Class";
import Subclass from "../../Data/Classes/Subclass";
import Encounter from "../../Data/Encounter/Encounter";
import Gear from "../../Data/Gear";
import Item from "../../Data/Item";
import Monster from "../../Data/Monster";
import Race from "../../Data/Races/Race";
import Subrace from "../../Data/Races/Subrace";
import Spell from "../../Data/Spell";
import {
  createNewWithId,
  reciveAllPromise,
  reciveCount,
} from "../../Services/DatabaseService";

import {
  GiCrystalWand,
  GiBackpack,
  GiWomanElfFace,
  GiPlagueDoctorProfile,
  GiBookmarklet,
  GiSwordClash,
} from "react-icons/gi";
import {
  faChartPie,
  faCog,
  faDragon,
  faIdCard,
  faMeteor,
  faPlusCircle,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AppWrapper from "../AppWrapper";
import TextButton from "../FormElements/TextButton";
import logo from "../../dndtome icon_v2.png";

const Home = () => {
  let history = useHistory();
  const [reload, isReload] = useState<boolean>(true);

  const [spellAmount, setSpellAmount] = useState<number>(0);
  const [gearAmount, setGearAmount] = useState<number>(0);
  const [itemAmount, setItemAmount] = useState<number>(0);
  const [monsterAmount, setMonsterAmount] = useState<number>(0);
  const [raceAmount, setRaceAmount] = useState<number>(0);
  const [subraceAmount, setSubraceAmount] = useState<number>(0);
  const [classAmount, setClassAmount] = useState<number>(0);
  const [subclassAmount, setSubclassAmount] = useState<number>(0);
  const [charAmount, setCharAmount] = useState<number>(0);
  const [encounterAmount, setEncounterAmount] = useState<number>(0);
  const [bookAmount, setBookAmount] = useState<number>(0);

  useEffect(() => {
    if (reload) {
      reciveCount("spells", (result: number) => {
        setSpellAmount(result);
      });
      reciveCount("gears", (result: number) => {
        setGearAmount(result);
      });
      reciveCount("items", (result: number) => {
        setItemAmount(result);
      });
      reciveCount("monsters", (result: number) => {
        setMonsterAmount(result);
      });
      reciveCount("races", (result: number) => {
        setRaceAmount(result);
      });
      reciveCount("subraces", (result: number) => {
        setSubraceAmount(result);
      });
      reciveCount("classes", (result: number) => {
        setClassAmount(result);
      });
      reciveCount("subclasses", (result: number) => {
        setSubclassAmount(result);
      });
      reciveCount("chars", (result: number) => {
        setCharAmount(result);
      });
      reciveCount("encounters", (result: number) => {
        setEncounterAmount(result);
      });
      reciveCount("books", (result: number) => {
        setBookAmount(result);
      });
      reciveAllPromise("chars").then((result: any[]) => {
        return result;
      });
      isReload(false);
    }
  }, [reload]);

  const createNewEncounter = () => {
    let newEncounter = new Encounter();
    delete newEncounter.id;
    createNewWithId("encounters", newEncounter, (id) => {
      history.push(`/encounter-detail/id/${id}`);
    });
  };

  const createNewSpell = () => {
    let newSpell = new Spell();
    delete newSpell.id;
    createNewWithId("spells", newSpell, (id) => {
      history.push(`/spell-detail/id/${id}`);
    });
  };

  const createNewItem = () => {
    let newItem = new Item();
    delete newItem.id;
    createNewWithId("items", newItem, (id) => {
      history.push(`/item-detail/id/${id}`);
    });
  };

  const createNewGear = () => {
    let newGear = new Gear();
    delete newGear.id;
    createNewWithId("gears", newGear, (id) => {
      history.push(`/gear-detail/id/${id}`);
    });
  };

  const createNewRace = () => {
    let newRace = new Race();
    delete newRace.id;
    createNewWithId("races", newRace, (id) => {
      history.push(`/race-detail/id/${id}`);
    });
  };

  const createNewClass = () => {
    let newClass = new Class();
    delete newClass.id;
    createNewWithId("classes", newClass, (id) => {
      history.push(`/class-detail/id/${id}`);
    });
  };

  const createNewMonster = () => {
    let newMonster = new Monster();
    delete newMonster.id;
    createNewWithId("monsters", newMonster, (id) => {
      history.push(`/monster-detail/id/${id}`);
    });
  };

  const createNewSubrace = () => {
    let newSubrace = new Subrace();
    delete newSubrace.id;
    createNewWithId("subraces", newSubrace, (id) => {
      history.push(`/subrace-detail/id/${id}`);
    });
  };

  const createNewSubclass = () => {
    let newSubclass = new Subclass();
    delete newSubclass.id;
    createNewWithId("subclasses", newSubclass, (id) => {
      history.push(`/subclass-detail/id/${id}`);
    });
  };

  const createNewBook = () => {
    let newBook = new Book();
    delete newBook.id;
    createNewWithId("books", newBook, (id) => {
      history.push(`/book-detail/id/${id}`);
    });
  };

  return (
    <AppWrapper>
      <General>
        <HomeSectionLarge>
          <img src={logo} alt="logo"/>
        </HomeSectionLarge>
        <HomeSection>
          <SelectionTitle>
            <FontAwesomeIcon icon={faMeteor} /> Spells
          </SelectionTitle>
          <SectionText>
            {`You have ${spellAmount} spells in your collection. `}
            {spellAmount <= 0 && `Try import some in the options.`}
          </SectionText>
          <ButtonBar>
            <TextButton
              text={"Go to spells"}
              onClick={() => history.push(`/spell-overview`)}
            />
            <TextButton
              icon={faPlusCircle}
              text={"Create"}
              onClick={() => createNewSpell()}
            />
          </ButtonBar>
        </HomeSection>
        <HomeSection>
          <SelectionTitle>
            <GiCrystalWand /> Magic Items
          </SelectionTitle>
          <SectionText>
            {`You have ${itemAmount} magic items in your collection. `}
            {itemAmount <= 0 && `Try import some in the options.`}
          </SectionText>
          <ButtonBar>
            <TextButton
              text={"Go to items"}
              onClick={() => history.push(`/item-overview`)}
            />
            <TextButton
              icon={faPlusCircle}
              text={"Create"}
              onClick={() => createNewItem()}
            />
          </ButtonBar>
        </HomeSection>
        <HomeSection>
          <SelectionTitle>
            <GiBackpack /> Gears
          </SelectionTitle>
          <SectionText>
            {`You have ${gearAmount} gears in your collection. `}
            {gearAmount <= 0 && `Try import some in the options.`}
          </SectionText>
          <ButtonBar>
            <TextButton
              text={"Go to gears"}
              onClick={() => history.push(`/gear-overview`)}
            />
            <TextButton
              icon={faPlusCircle}
              text={"Create"}
              onClick={() => createNewGear()}
            />
          </ButtonBar>
        </HomeSection>
        <HomeSection>
          <SelectionTitle>
            <GiWomanElfFace /> Races
          </SelectionTitle>
          <SectionText>
            {`You have ${raceAmount} races in your collection. `}
            {raceAmount <= 0 && `Try import some in the options.`}
          </SectionText>
          <ButtonBar>
            <TextButton
              text={"Go to races"}
              onClick={() => history.push(`/race-overview`)}
            />
            <TextButton
              icon={faPlusCircle}
              text={"Create"}
              onClick={() => createNewRace()}
            />
          </ButtonBar>
        </HomeSection>
        <HomeSection>
          <SelectionTitle>Subraces</SelectionTitle>
          <SectionText>
            {`You have ${subraceAmount} subraces in your collection. `}
            {subraceAmount <= 0 && `Try import some in the options.`}
          </SectionText>
          <ButtonBar>
            <TextButton
              icon={faPlusCircle}
              text={"Create"}
              onClick={() => createNewSubrace()}
            />
          </ButtonBar>
        </HomeSection>
        <HomeSection>
          <SelectionTitle>
            <GiPlagueDoctorProfile /> Classes
          </SelectionTitle>
          <SectionText>
            {`You have ${classAmount} classes in your collection. `}
            {classAmount <= 0 && `Try import some in the options.`}
          </SectionText>
          <ButtonBar>
            <TextButton
              text={"Go to classes"}
              onClick={() => history.push(`/class-overview`)}
            />
            <TextButton
              icon={faPlusCircle}
              text={"Create"}
              onClick={() => createNewClass()}
            />
          </ButtonBar>
        </HomeSection>
        <HomeSection>
          <SelectionTitle>Subclass</SelectionTitle>
          <SectionText>
            {`You have ${subclassAmount} subclass in your collection. `}
            {subclassAmount <= 0 && `Try import some in the options.`}
          </SectionText>
          <ButtonBar>
            <TextButton
              icon={faPlusCircle}
              text={"Create"}
              onClick={() => createNewSubclass()}
            />
          </ButtonBar>
        </HomeSection>
        <HomeSection>
          <SelectionTitle>
            <FontAwesomeIcon icon={faIdCard} /> Characters
          </SelectionTitle>
          <SectionText>
            {`You have ${charAmount} characters in your collection. `}
            {charAmount <= 0 && `Try creating one.`}
          </SectionText>
          <ButtonBar>
            <TextButton
              text={"Go to characters"}
              onClick={() => history.push(`/char-overview`)}
            />
            <TextButton
              icon={faPlusCircle}
              text={"Create"}
              onClick={() => history.push(`/char-lab`)}
            />
          </ButtonBar>
        </HomeSection>
        <HomeSection>
          <SelectionTitle>
            <FontAwesomeIcon icon={faDragon} /> Monsters
          </SelectionTitle>
          <SectionText>
            {`You have ${monsterAmount} monsters in your collection. `}
            {monsterAmount <= 0 && `Try import some in the options.`}
          </SectionText>
          <ButtonBar>
            <TextButton
              text={"Go to monsters"}
              onClick={() => history.push(`/monster-overview`)}
            />
            <TextButton
              icon={faPlusCircle}
              text={"Create"}
              onClick={() => createNewMonster()}
            />
          </ButtonBar>
        </HomeSection>
        <HomeSection>
          <SelectionTitle>
            <GiSwordClash /> Encounters
          </SelectionTitle>
          <SectionText>
            {`You have ${encounterAmount} encounters in your collection. `}
            {encounterAmount <= 0 && `Try creating one.`}
          </SectionText>
          <ButtonBar>
            <TextButton
              text={"Go to encounters"}
              onClick={() => history.push(`/encounter-overview`)}
            />
            <TextButton
              icon={faPlusCircle}
              text={"Create"}
              onClick={() => createNewEncounter()}
            />
          </ButtonBar>
        </HomeSection>
        <HomeSection>
          <SelectionTitle>
            <GiBookmarklet /> Library
          </SelectionTitle>
          <SectionText>
            {`You have ${bookAmount} pdf's in your collection. `}
            {bookAmount <= 0 && `Try adding one.`}
          </SectionText>
          <ButtonBar>
            <TextButton
              text={"Go to library"}
              onClick={() => history.push(`/library`)}
            />
            <TextButton
              icon={faPlusCircle}
              text={"Add"}
              onClick={() => createNewBook()}
            />
          </ButtonBar>
        </HomeSection>
        <HomeSection>
          <SelectionTitle>
            <FontAwesomeIcon icon={faChartPie} /> Statistics
          </SelectionTitle>
          <SectionText>For more Statistics on your collection...</SectionText>
          <ButtonBar>
            <TextButton
              text={"Go to statistics"}
              onClick={() => history.push(`/statistics`)}
            />
          </ButtonBar>
        </HomeSection>
        <HomeSection>
          <SelectionTitle>
            <FontAwesomeIcon icon={faCog} /> Options
          </SelectionTitle>
          <SectionText>
            To import/export or to make other adjustments to your collection...
          </SectionText>
          <ButtonBar>
            <TextButton
              text={"Go to options"}
              onClick={() => history.push(`/options`)}
            />
          </ButtonBar>
        </HomeSection>
        <HomeSection>
          <SelectionTitle>
            <FontAwesomeIcon icon={faQuestionCircle} /> Help
          </SelectionTitle>
          <SectionText>
            Help on where to find what and how to add tables or hyperlinks inside of text fields.
          </SectionText>
          <ButtonBar>
            <TextButton
              text={"Help"}
              onClick={() => history.push(`/help`)}
            />
          </ButtonBar>
        </HomeSection>
      </General>
    </AppWrapper>
  );
};

export default Home;

const General = styled.div`
  flex: 1 1 auto;

  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  align-content: stretch;
`;

const HomeSection = styled.div`
  flex: 1 1 20em;
  color: ${({ theme }) => theme.tile.color};
  background-color: ${({ theme }) => theme.tile.backgroundColor};
  margin: 0.5em;
  border-radius: 3px;
  box-shadow: ${({ theme }) => theme.tile.boxShadow};
  overflow: hidden;

  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  align-content: space-between;
`;
const HomeSectionLarge = styled(HomeSection)`
  min-width: calc(100% - 1em);
  background-color: transparent;
  box-shadow: none;
`;

const SelectionTitle = styled.div`
  flex: 1 1 auto;
  padding: 5px;
  margin: 5px;
  min-width: calc(100% - 20px);
  max-height: 20px;
  font-weight: bold;
  text-algin: center;
  border-radius: 5px;
  color: ${({ theme }) => theme.input.color};
  background-color: ${({ theme }) => theme.input.backgroundColor};
`;

const SectionText = styled.div`
  flex: 1 1 auto;
  width: calc(100% - 10px);
  padding: 5px;
`;

const ButtonBar = styled(SectionText)`
  align-self: flex-end;
  max-height: 50px;
`;
