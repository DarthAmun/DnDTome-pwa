import { useState } from "react";
import {
  FaArrowLeft,
  FaBookOpen,
  FaHistory,
  FaHourglassHalf,
  FaImage,
  FaLink,
  FaMortarPestle,
  FaPowerOff,
  FaSave,
  FaUser,
} from "react-icons/fa";
import { useHistory } from "react-router-dom";
import {
  Input,
  InputNumber,
  Checkbox,
  InputGroup,
  Form,
  FormGroup,
  ControlLabel,
  Button,
  ButtonToolbar,
} from "rsuite";
import styled from "styled-components";
import Spell from "../../../data/Spell";
import { createNewWithId } from "../../../services/DatabaseService";
import { TopBar } from "../../generic/details/EntityDetail";

const SpellBuilder = () => {
  let history = useHistory();
  const [spell, onEdit] = useState<Spell>(new Spell());

  const create = () => {
    let newSpell = { ...spell };
    delete newSpell.id;
    createNewWithId("spells", newSpell, (id: number) => {
      history.push(`/spell-detail/${id}`);
    });
  };

  return (
    <>
      <TopBar>
        <Button onClick={() => history.goBack()}>
          <FaArrowLeft />
        </Button>
      </TopBar>
      <CenterWrapper>
        <Form layout="inline">
          <FormGroup>
            <ControlLabel>Name</ControlLabel>
            <Input
              size="lg"
              value={spell.name}
              onChange={(name) => onEdit({ ...spell, name: name })}
            />
          </FormGroup>
          <FormGroup>
            <ControlLabel>School</ControlLabel>
            <Input
              size="lg"
              value={spell.school}
              onChange={(school) => onEdit({ ...spell, school: school })}
            />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Level</ControlLabel>
            <InputNumber
              size="lg"
              value={spell.level}
              onChange={(level: any) => onEdit({ ...spell, level: level })}
            />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Ritual</ControlLabel>
            <Checkbox
              checked={spell.ritual}
              onCheckboxClick={() => onEdit({ ...spell, ritual: !spell.ritual })}
            >
              is a Ritual?
            </Checkbox>
          </FormGroup>
          <FormGroup>
            <ControlLabel>Casting Time</ControlLabel>
            <InputGroup>
              <InputGroup.Addon>
                <FaHistory />
              </InputGroup.Addon>
              <Input
                size="lg"
                value={spell.time}
                onChange={(time) => onEdit({ ...spell, time: time })}
              />
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <ControlLabel>Range</ControlLabel>
            <InputGroup>
              <InputGroup.Addon>
                <FaPowerOff />
              </InputGroup.Addon>
              <Input
                size="lg"
                value={spell.range}
                onChange={(range) => onEdit({ ...spell, range: range })}
              />
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <ControlLabel>Duration</ControlLabel>
            <InputGroup>
              <InputGroup.Addon>
                <FaHourglassHalf />
              </InputGroup.Addon>
              <Input
                size="lg"
                value={spell.duration}
                onChange={(duration) => onEdit({ ...spell, duration: duration })}
              />
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <ControlLabel>Components</ControlLabel>
            <InputGroup>
              <InputGroup.Addon>
                <FaMortarPestle />
              </InputGroup.Addon>
              <Input
                size="lg"
                value={spell.components}
                onChange={(components) => onEdit({ ...spell, components: components })}
              />
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <ControlLabel>Classes</ControlLabel>
            <InputGroup>
              <InputGroup.Addon>
                <FaUser />
              </InputGroup.Addon>
              <Input
                size="lg"
                value={spell.classes}
                onChange={(classes) => onEdit({ ...spell, classes: classes })}
              />
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <ControlLabel>Sources</ControlLabel>
            <InputGroup>
              <InputGroup.Addon>
                <FaLink />
              </InputGroup.Addon>
              <Input
                size="lg"
                value={spell.sources}
                onChange={(sources) => onEdit({ ...spell, sources: sources })}
              />
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <ControlLabel>Picture</ControlLabel>
            <InputGroup>
              <InputGroup.Addon>
                <FaImage />
              </InputGroup.Addon>
              <Input
                size="lg"
                value={spell.pic}
                onChange={(pic) => onEdit({ ...spell, pic: pic })}
              />
            </InputGroup>
          </FormGroup>
        </Form>
        <InputGroup>
          <InputGroup.Addon>
            <FaBookOpen />
          </InputGroup.Addon>
          <Input
            componentClass="textarea"
            rows={5}
            value={spell.description}
            onChange={(description) => onEdit({ ...spell, description: description })}
          />
        </InputGroup>
        <ButtonToolbar style={{ marginTop: "20px" }}>
          <Button onClick={() => create()}>
            <FaSave /> Save
          </Button>
          <Button onClick={() => history.goBack()}>Cancel</Button>
        </ButtonToolbar>
      </CenterWrapper>
    </>
  );
};

export default SpellBuilder;

const CenterWrapper = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
`;
