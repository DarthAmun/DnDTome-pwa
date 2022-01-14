import { IndexableType } from "dexie";
import { useCallback, useEffect, useState } from "react";
import {
  FaBookOpen,
  FaCheck,
  FaHistory,
  FaHourglassHalf,
  FaImage,
  FaLink,
  FaMortarPestle,
  FaUser,
} from "react-icons/fa";
import { GiBullseye } from "react-icons/gi";
import { IoSchool } from "react-icons/io5";
import {
  Button,
  Checkbox,
  Input,
  InputGroup,
  InputNumber,
  InputPicker,
  Tag,
  TagGroup,
  TagPicker,
} from "rsuite";
import styled from "styled-components";

import Spell from "../../../data/Spell";
import { stringToColour } from "../../../services/ColorService";
import { reciveAttributeSelection } from "../../../services/DatabaseService";
import EditCompletableStringField from "../../generic/editFields/EditCompletableStringField";
import EditSearchableStringField from "../../generic/editFields/EditSearchableStringField";
import EditSearchableTextField from "../../generic/editFields/EditSearchableTextField";

interface $Props {
  entity: Spell;
  isNew: boolean;
  onEdit: (value: any) => void;
}

const SpellDetail = ({ entity, isNew, onEdit }: $Props) => {
  const [currentSpell, changeSpell] = useState<Spell>({ ...entity });
  const [levelEdit, editLevel] = useState<boolean>(isNew);
  const [schoolEdit, editSchool] = useState<boolean>(isNew);
  const [schoolList, setSchoolList] = useState<{ value: string; label: string }[]>([]);
  const [nameEdit, editName] = useState<boolean>(isNew);
  const [classesEdit, editClasses] = useState<boolean>(isNew);
  const [classList, setClassList] = useState<{ value: string; label: string }[]>([]);
  const [sourcesEdit, editSources] = useState<boolean>(isNew);
  const [ritualEdit, editRitual] = useState<boolean>(isNew);

  useEffect(() => {
    reciveAttributeSelection("spells", "school", (schools: IndexableType[]) => {
      setSchoolList(
        schools.map((text: IndexableType) => {
          const newText: string = text as string;
          return { value: newText, label: newText };
        })
      );
    });
    reciveAttributeSelection("classes", "name", (classes: IndexableType[]) => {
      setClassList(
        classes.map((text: IndexableType) => {
          const newText: string = text as string;
          return { value: newText, label: newText };
        })
      );
    });
  }, [entity]);

  const formatLevel = useCallback(() => {
    if (entity !== undefined) {
      if (entity.level === 0) {
        return "C";
      }
      return entity.level;
    }
    return "";
  }, [entity]);

  const hasRitual = useCallback(() => {
    if (entity !== undefined) {
      if (entity.ritual) {
        return <FlagContent>Ritual</FlagContent>;
      }
    }
    return (
      <FlagContent>
        <del>Ritual</del>
      </FlagContent>
    );
  }, [entity]);

  const hasConcentration = useCallback(() => {
    if (entity !== undefined) {
      let search = entity.duration.toLowerCase();
      if (search.includes("concentration")) {
        return <FlagContent>C</FlagContent>;
      }
    }
    return "";
  }, [entity]);

  const getPicture = useCallback(() => {
    if (entity !== undefined) {
      if (entity.picBase64 !== "" && entity.picBase64 !== null && entity.picBase64 !== undefined) {
        return entity.picBase64;
      } else if (entity.pic !== "" && entity.pic !== null && entity.pic !== undefined) {
        return entity.pic;
      }
    }
    return "";
  }, [entity]);

  return (
    <CenterWrapper>
      <View>
        <Level isEditing={levelEdit} onClick={() => editLevel(true)}>
          {levelEdit && (
            <InputGroup>
              <InputNumber
                value={currentSpell.level}
                onChange={(val: any) => changeSpell({ ...entity, level: val })}
                min={1}
                step={1}
                style={{ width: "60px" }}
              />
              <InputGroup.Button
                onClick={(e) => {
                  e.stopPropagation();
                  editLevel(false);
                  onEdit(currentSpell);
                }}
              >
                <FaCheck />
              </InputGroup.Button>
            </InputGroup>
          )}
          {!levelEdit && <b>{formatLevel()}</b>}
        </Level>
        <School school={entity.school} isEditing={schoolEdit} onClick={() => editSchool(true)}>
          {schoolEdit && (
            <InputGroup>
              <InputGroup.Addon>
                <IoSchool />
              </InputGroup.Addon>
              <InputPicker
                creatable
                value={currentSpell.school}
                data={schoolList}
                onChange={(val: any) => changeSpell({ ...entity, school: val })}
              />
              <InputGroup.Button
                onClick={(e) => {
                  e.stopPropagation();
                  editSchool(false);
                  onEdit(currentSpell);
                }}
              >
                <FaCheck />
              </InputGroup.Button>
            </InputGroup>
          )}
          {!schoolEdit && (
            <>
              <IoSchool />
              {entity.school}
            </>
          )}
        </School>
        <Flag>
          <b>{hasConcentration()}</b>
        </Flag>
        <Flag isEditing={ritualEdit} onClick={() => editRitual(true)}>
          {ritualEdit && (
            <Checkbox
              checked={entity.ritual}
              onCheckboxClick={(e) => {
                e.stopPropagation();
                editRitual(false);
                onEdit({ ...entity, ritual: !entity.ritual });
              }}
            >
              Ritual
            </Checkbox>
          )}
          {!ritualEdit && <>{hasRitual()}</>}
        </Flag>
        {getPicture() !== "" ? (
          <ImageName isEditing={nameEdit} onClick={() => editName(true)}>
            {nameEdit && (
              <>
                <InputGroup style={{ width: "max-content" }}>
                  <InputGroup.Addon>
                    <FaImage />
                  </InputGroup.Addon>
                  <Input
                    placeholder={"Link to image"}
                    value={currentSpell.pic}
                    onChange={(val: any) => changeSpell({ ...entity, pic: val })}
                    onKeyPress={(e: any) => {
                      if (e.key === "Enter") {
                        editName(false);
                        onEdit(currentSpell);
                      }
                    }}
                  />
                  <InputGroup.Button
                    onClick={(e) => {
                      e.stopPropagation();
                      editName(false);
                      onEdit(currentSpell);
                    }}
                  >
                    <FaCheck />
                  </InputGroup.Button>
                </InputGroup>
                <InputGroup style={{ width: "max-content" }}>
                  <Input
                    placeholder={"Spell name"}
                    value={currentSpell.name}
                    onChange={(val: any) => changeSpell({ ...entity, name: val })}
                    onKeyPress={(e: any) => {
                      if (e.key === "Enter") {
                        editName(false);
                        onEdit(currentSpell);
                      }
                    }}
                    style={{ width: "max-content", minWidth: "200px" }}
                  />
                  <InputGroup.Button
                    onClick={(e) => {
                      e.stopPropagation();
                      editName(false);
                      onEdit(currentSpell);
                    }}
                  >
                    <FaCheck />
                  </InputGroup.Button>
                </InputGroup>
              </>
            )}
            {!nameEdit && (
              <>
                <Image pic={getPicture()}></Image>
                <b>{entity.name}</b>
              </>
            )}
          </ImageName>
        ) : (
          <Name isEditing={nameEdit} onClick={() => editName(true)}>
            {nameEdit && (
              <>
                <InputGroup style={{ width: "max-content" }}>
                  <InputGroup.Addon>
                    <FaImage />
                  </InputGroup.Addon>
                  <Input
                    placeholder={"Link to image"}
                    value={currentSpell.pic}
                    onChange={(val: any) => changeSpell({ ...entity, pic: val })}
                    onKeyPress={(e: any) => {
                      if (e.key === "Enter") {
                        editName(false);
                        onEdit(currentSpell);
                      }
                    }}
                  />
                  <InputGroup.Button
                    onClick={(e) => {
                      e.stopPropagation();
                      editName(false);
                      onEdit(currentSpell);
                    }}
                  >
                    <FaCheck />
                  </InputGroup.Button>
                </InputGroup>
                <InputGroup style={{ width: "max-content" }}>
                  <Input
                    placeholder={"Spell name"}
                    value={currentSpell.name}
                    onChange={(val: any) => changeSpell({ ...entity, name: val })}
                    onKeyPress={(e: any) => {
                      if (e.key === "Enter") {
                        editName(false);
                        onEdit(currentSpell);
                      }
                    }}
                    style={{ width: "max-content", minWidth: "200px" }}
                  />
                  <InputGroup.Button
                    onClick={(e) => {
                      e.stopPropagation();
                      editName(false);
                      onEdit(currentSpell);
                    }}
                  >
                    <FaCheck />
                  </InputGroup.Button>
                </InputGroup>
              </>
            )}
            {!nameEdit && <b>{entity.name}</b>}
          </Name>
        )}
        <PropWrapper>
          <EditCompletableStringField
            placeholder={"Casting time"}
            icon={<FaHistory />}
            value={currentSpell.time}
            isNew={isNew}
            changeEntity={(val: any) => changeSpell({ ...entity, time: val })}
            triggerEdit={() => onEdit(currentSpell)}
          />
          <EditCompletableStringField
            placeholder={"Spell duration"}
            icon={<FaHourglassHalf />}
            value={currentSpell.duration}
            isNew={isNew}
            changeEntity={(val: any) => changeSpell({ ...entity, duration: val })}
            triggerEdit={() => onEdit(currentSpell)}
          />
          <EditCompletableStringField
            placeholder={"Spell range"}
            icon={<GiBullseye />}
            value={currentSpell.range}
            isNew={isNew}
            changeEntity={(val: any) => changeSpell({ ...entity, range: val })}
            triggerEdit={() => onEdit(currentSpell)}
          />
          <EditSearchableStringField
            placeholder={"Spell components"}
            icon={<FaMortarPestle />}
            value={currentSpell.components}
            isNew={isNew}
            changeEntity={(val: any) => changeSpell({ ...entity, components: val })}
            triggerEdit={() => onEdit(currentSpell)}
          />
          <Prop isEditing={classesEdit} onClick={() => editClasses(true)}>
            {classesEdit && (
              <>
                <TagPicker
                  data={classList}
                  trigger={"Enter"}
                  placeholder={"Classes"}
                  value={currentSpell.classes}
                  onChange={(val: any[]) => changeSpell({ ...entity, classes: val })}
                  onKeyPress={(e: any) => {
                    if (e.key === "Enter") {
                      editClasses(false);
                      onEdit(currentSpell);
                    }
                  }}
                  style={{ minWidth: "300px" }}
                />
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    editClasses(false);
                    onEdit(currentSpell);
                  }}
                >
                  <FaCheck />
                </Button>
              </>
            )}
            {!classesEdit && (
              <>
                <FaUser />
                <TagGroup>
                  {entity.classes.map((classe: string, index: number) => (
                    <Tag key={index}>{classe}</Tag>
                  ))}
                </TagGroup>
              </>
            )}
          </Prop>
          <Prop isEditing={sourcesEdit} onClick={() => editSources(true)}>
            {sourcesEdit && (
              <InputGroup style={{ width: "max-content" }}>
                <InputGroup.Addon>
                  <FaLink />
                </InputGroup.Addon>
                <Input
                  placeholder={"Sources"}
                  value={currentSpell.sources}
                  onChange={(val: any) => changeSpell({ ...entity, sources: val })}
                  onKeyPress={(e: any) => {
                    if (e.key === "Enter") {
                      editSources(false);
                      onEdit(currentSpell);
                    }
                  }}
                />
                <InputGroup.Button
                  onClick={(e) => {
                    e.stopPropagation();
                    editSources(false);
                    onEdit(currentSpell);
                  }}
                >
                  <FaCheck />
                </InputGroup.Button>
              </InputGroup>
            )}
            {!sourcesEdit && (
              <>
                <FaLink />
                {entity.sources}
              </>
            )}
          </Prop>
        </PropWrapper>
        <EditSearchableTextField
          placeholder={"Spell description"}
          icon={<FaBookOpen />}
          value={currentSpell.description}
          isNew={isNew}
          changeEntity={(val: any) => changeSpell({ ...entity, description: val })}
          triggerEdit={() => onEdit(currentSpell)}
        />
      </View>
    </CenterWrapper>
  );
};

export default SpellDetail;

const CenterWrapper = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
`;

const View = styled.div`
  color: ${({ theme }) => theme.textColor};
  font-size: 16px;
  max-width: 800px;
  padding: 5px;
  margin-left: auto;
  margin-right: auto;
`;

const School = styled.div<{
  school?: string;
  isEditing?: boolean;
}>`
  height: auto;
  float: left;
  padding: 5px 10px 7px 10px;
  line-height: 30px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.secondColor};
  color: ${(props) => {
    if (props.school === "" || props.school === null) {
      return "white";
    } else if (props.school === "Necromancy") {
      return "#bef28e";
    } else if (props.school === "Conjuration") {
      return "#fce97a";
    } else if (props.school === "Evocation") {
      return "#db5740";
    } else if (props.school === "Divination") {
      return "#9ebed2";
    } else if (props.school === "Enchantment") {
      return "#ce90ca";
    } else if (props.school === "Transmutation") {
      return "#e19c60";
    } else if (props.school === "Abjuration") {
      return "#278ae4";
    } else if (props.school === "Illusion") {
      return "#8b42f9";
    } else {
      return stringToColour(props.school);
    }
  }};

  svg {
    margin-right: 5px;
    width: 15px;
    height: auto;
    border-radius: 150px;
    color: ${({ theme }) => theme.highlight};
  }
`;

const Level = styled.div<{
  isEditing?: boolean;
}>`
  height: auto;
  padding: ${(props) => (props.isEditing ? "3px" : "10px")};
  min-width: 40px;
  width: ${(props) => (props.isEditing ? "fit-content" : "40px")};
  height: ${(props) => (props.isEditing ? "fit-content" : "40px")};
  line-height: 20px;
  float: left;
  text-align: center;
  border-radius: ${(props) => (props.isEditing ? "5px" : "30px")};
  margin: 0px 5px 5px 5px;
  background-color: ${({ theme }) => theme.secondColor};
`;

const Name = styled.div<{
  isEditing?: boolean;
}>`
  height: auto;
  float: left;
  padding: 10px;
  margin: 5px 5px 10px 5px;
  width: calc(100% - 15px);
  color: ${({ theme }) => theme.textColor};
  text-align: center;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.secondColor};
  display: ${(props) => (props.isEditing ? "flex" : "block")};
  flex-wrap: wrap;
  gap: 5px;
`;

const ImageName = styled(Name)`
  height: auto;
  border-radius: 50px 5px 5px 50px;
`;

const PropWrapper = styled.div`
  height: auto;
  width: calc(100% - 6px);
  float: left;
  padding: 3px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const Prop = styled.div<{
  isEditing?: boolean;
}>`
  flex: 1 1 auto;
  max-width: 100%;
  height: auto;
  margin: 2px;
  float: left;
  padding: ${(props) => (props.isEditing ? "3px" : "10px")};
  border-radius: 5px;
  background-color: ${({ theme }) => theme.secondColor};
  display: flex;
  gap: 5px;

  & > svg {
    margin-right: 5px;
    width: 15px;
    height: auto;
    border-radius: 150px;
    color: ${({ theme }) => theme.highlight};
  }
`;

const Flag = styled.div<{
  isEditing?: boolean;
}>`
  height: auto;
  float: left;
  padding: 5px 10px 7px 10px;
  margin-left: 5px;
  font-size: 12px;
  line-height: 30px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.secondColor};
`;

const FlagContent = styled.div`
  width: fit-content;
  height: fit-content;
`;

interface $ImageProps {
  pic: string;
}

const Image = ({ pic }: $ImageProps) => {
  const style = {
    backgroundImage: `url('${pic}')`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  if (pic !== "") {
    return <ImageElm style={style}></ImageElm>;
  } else {
    return <Empty />;
  }
};

const ImageElm = styled.div`
  margin: -10px 5px -10px -10px;
  height: 47px;
  width: 47px;
  float: left;
  border-radius: 100px;
  border: 3px solid ${({ theme }) => theme.highlight};
  background-color: white;
  overflow: hidden;
`;
const Empty = styled.div``;
