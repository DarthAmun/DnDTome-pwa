import { IndexableType } from "dexie";
import { useCallback, useEffect, useState } from "react";
import {
  FaCheck,
  FaCoins,
  FaCrosshairs,
  FaHistory,
  FaImage,
  FaLink,
  FaWeightHanging,
  FaBookOpen,
} from "react-icons/fa";
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
import Gear from "../../../data/Gear";
import { reciveAttributeSelection } from "../../../services/DatabaseService";

interface $Props {
  entity: Gear;
  isNew: boolean;
  onEdit: (value: any) => void;
}

const GearDetail = ({ entity, isNew, onEdit }: $Props) => {
  const [currentGear, changeGear] = useState<Gear>({ ...entity });
  const [nameEdit, editName] = useState<boolean>(isNew);
  const [descriptionEdit, editDescription] = useState<boolean>(isNew);
  const [damageEdit, editDamage] = useState<boolean>(isNew);
  const [typeEdit, editType] = useState<boolean>(isNew);
  const [typeList, setTypeList] = useState<{ value: string; label: string }[]>([]);
  const [sourcesEdit, editSources] = useState<boolean>(isNew);
  const [costEdit, editCost] = useState<boolean>(isNew);
  const [weightEdit, editWeight] = useState<boolean>(isNew);

  useEffect(() => {
    reciveAttributeSelection("gears", "type", (types: IndexableType[]) => {
      setTypeList(
        types.map((text: IndexableType) => {
          const newText: string = text as string;
          return { value: newText, label: newText };
        })
      );
    });
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
        {getPicture() !== "" ? (
          <ImageName isEditing={nameEdit} onClick={() => editName(true)}>
            {nameEdit && (
              <>
                <InputGroup style={{ width: "max-content" }}>
                  <InputGroup.Addon>
                    <FaHistory />
                  </InputGroup.Addon>
                  <Input
                    placeholder={"Link to image"}
                    value={currentGear.pic}
                    onChange={(val: any) => changeGear({ ...entity, pic: val })}
                    onKeyPress={(e: any) => {
                      if (e.key === "Enter") {
                        editName(false);
                        onEdit(currentGear);
                      }
                    }}
                  />
                  <InputGroup.Button
                    onClick={(e) => {
                      e.stopPropagation();
                      editName(false);
                      onEdit(currentGear);
                    }}
                  >
                    <FaCheck />
                  </InputGroup.Button>
                </InputGroup>
                <InputGroup style={{ width: "max-content" }}>
                  <Input
                    placeholder={"Spell name"}
                    value={currentGear.name}
                    onChange={(val: any) => changeGear({ ...entity, name: val })}
                    onKeyPress={(e: any) => {
                      if (e.key === "Enter") {
                        editName(false);
                        onEdit(currentGear);
                      }
                    }}
                    style={{ width: "max-content", minWidth: "200px" }}
                  />
                  <InputGroup.Button
                    onClick={(e) => {
                      e.stopPropagation();
                      editName(false);
                      onEdit(currentGear);
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
                    value={currentGear.pic}
                    onChange={(val: any) => changeGear({ ...entity, pic: val })}
                    onKeyPress={(e: any) => {
                      if (e.key === "Enter") {
                        editName(false);
                        onEdit(currentGear);
                      }
                    }}
                  />
                  <InputGroup.Button
                    onClick={(e) => {
                      e.stopPropagation();
                      editName(false);
                      onEdit(currentGear);
                    }}
                  >
                    <FaCheck />
                  </InputGroup.Button>
                </InputGroup>
                <InputGroup style={{ width: "max-content" }}>
                  <Input
                    placeholder={"Spell name"}
                    value={currentGear.name}
                    onChange={(val: any) => changeGear({ ...entity, name: val })}
                    onKeyPress={(e: any) => {
                      if (e.key === "Enter") {
                        editName(false);
                        onEdit(currentGear);
                      }
                    }}
                    style={{ width: "max-content", minWidth: "200px" }}
                  />
                  <InputGroup.Button
                    onClick={(e) => {
                      e.stopPropagation();
                      editName(false);
                      onEdit(currentGear);
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
          <Prop isEditing={costEdit} onClick={() => editCost(true)}>
            {costEdit && (
              <InputGroup style={{ width: "max-content" }}>
                <InputGroup.Addon>
                  <FaCoins />
                </InputGroup.Addon>
                <Input
                  placeholder={"Cost"}
                  value={currentGear.cost}
                  onChange={(val: any) => changeGear({ ...entity, cost: val })}
                  onKeyPress={(e: any) => {
                    if (e.key === "Enter") {
                      editCost(false);
                      onEdit(currentGear);
                    }
                  }}
                />
                <InputGroup.Button
                  onClick={(e) => {
                    e.stopPropagation();
                    editCost(false);
                    onEdit(currentGear);
                  }}
                >
                  <FaCheck />
                </InputGroup.Button>
              </InputGroup>
            )}
            {!costEdit && (
              <>
                <FaCoins />
                {entity.cost}
              </>
            )}
          </Prop>
          <Prop isEditing={weightEdit} onClick={() => editWeight(true)}>
            {weightEdit && (
              <InputGroup style={{ width: "max-content" }}>
                <InputGroup.Addon>
                  <FaWeightHanging />
                </InputGroup.Addon>
                <Input
                  placeholder={"Weight"}
                  value={currentGear.weight}
                  onChange={(val: any) => changeGear({ ...entity, weight: val })}
                  onKeyPress={(e: any) => {
                    if (e.key === "Enter") {
                      editWeight(false);
                      onEdit(currentGear);
                    }
                  }}
                />
                <InputGroup.Button
                  onClick={(e) => {
                    e.stopPropagation();
                    editWeight(false);
                    onEdit(currentGear);
                  }}
                >
                  <FaCheck />
                </InputGroup.Button>
              </InputGroup>
            )}
            {!weightEdit && (
              <>
                <FaWeightHanging />
                {entity.weight}
              </>
            )}
          </Prop>
          <Prop isEditing={typeEdit} onClick={() => editType(true)}>
            {typeEdit && (
              <InputGroup style={{ width: "max-content" }}>
                <InputGroup.Addon>Type</InputGroup.Addon>
                <InputPicker
                  placeholder={"Select or create"}
                  creatable
                  value={currentGear.type}
                  data={typeList}
                  onChange={(val: any) => changeGear({ ...entity, type: val })}
                />
                <InputGroup.Button
                  onClick={(e) => {
                    e.stopPropagation();
                    editType(false);
                    onEdit(currentGear);
                  }}
                >
                  <FaCheck />
                </InputGroup.Button>
              </InputGroup>
            )}
            {!typeEdit && <>{entity.type}</>}
          </Prop>
          <Prop isEditing={sourcesEdit} onClick={() => editSources(true)}>
            {sourcesEdit && (
              <InputGroup style={{ width: "max-content" }}>
                <InputGroup.Addon>
                  <FaLink />
                </InputGroup.Addon>
                <Input
                  placeholder={"Sources"}
                  value={currentGear.sources}
                  onChange={(val: any) => changeGear({ ...entity, sources: val })}
                  onKeyPress={(e: any) => {
                    if (e.key === "Enter") {
                      editSources(false);
                      onEdit(currentGear);
                    }
                  }}
                />
                <InputGroup.Button
                  onClick={(e) => {
                    e.stopPropagation();
                    editSources(false);
                    onEdit(currentGear);
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
          <Prop isEditing={damageEdit} onClick={() => editDamage(true)}>
            {damageEdit && (
              <InputGroup style={{ width: "max-content" }}>
                <InputGroup.Addon>
                  <FaCrosshairs />
                </InputGroup.Addon>
                <Input
                  placeholder={"Spell damage"}
                  value={currentGear.damage}
                  onChange={(val: any) => changeGear({ ...entity, damage: val })}
                  onKeyPress={(e: any) => {
                    if (e.key === "Enter") {
                      editDamage(false);
                      onEdit(currentGear);
                    }
                  }}
                />
                <InputGroup.Button
                  onClick={(e) => {
                    e.stopPropagation();
                    editDamage(false);
                    onEdit(currentGear);
                  }}
                >
                  <FaCheck />
                </InputGroup.Button>
              </InputGroup>
            )}
            {!damageEdit && (
              <>
                <FaCrosshairs />
                {entity.damage}
              </>
            )}
          </Prop>
          {entity.properties && <Prop>{entity.properties}</Prop>}
          <Text isEditing={descriptionEdit} onClick={() => editDescription(true)}>
            {descriptionEdit && (
              <InputGroup>
                <Input
                  placeholder="Description"
                  as="textarea"
                  rows={5}
                  value={currentGear.description}
                  onChange={(description: any) =>
                    changeGear({ ...entity, description: description })
                  }
                />
                <InputGroup.Button
                  onClick={(e) => {
                    e.stopPropagation();
                    editDescription(false);
                    onEdit(currentGear);
                  }}
                >
                  <FaCheck />
                </InputGroup.Button>
              </InputGroup>
            )}
            {!descriptionEdit && (
              <>
                <PropTitle>
                  <FaBookOpen />
                </PropTitle>
                {entity.description}
              </>
            )}
            {/* <FormatedText text={entity.description} /> */}
          </Text>
        </PropWrapper>
      </View>
    </CenterWrapper>
  );
};

export default GearDetail;

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

const PropTitle = styled.span`
  display: inline-block;
  color: ${({ theme }) => theme.highlight};
  text-decoration: none;
  margin: 0px 5px 0px 5px;
`;

const Text = styled.div<{
  isEditing?: boolean;
}>`
  height: auto;
  width: calc(100% - 15px);
  margin: 10px 5px 5px 5px;
  padding: 10px;
  float: left;
  line-height: 18px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.secondColor};
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
