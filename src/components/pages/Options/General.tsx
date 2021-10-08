import { useState, useEffect, useCallback } from "react";
import { FaFileExport, FaTrashAlt } from "react-icons/fa";
import { useLocation } from "react-router";
import {
  Button,
  Notification,
  Modal,
  Panel,
  Progress,
  toaster,
  Uploader,
  Divider,
  InputPicker,
  Input,
  InputGroup,
  Tag,
} from "rsuite";
import { FileType } from "rsuite/esm/Uploader/Uploader";
import {
  deleteAll,
  deleteAllByAttr,
  deleteDatabase,
  reciveCount,
} from "../../../services/DatabaseService";
import { downloadAllFromTable, downloadBackup } from "../../../services/DownloadService";
import { importDTFile } from "../../../services/UploadService";
import styled from "styled-components";
import Gear from "../../../data/Gear";
import Spell from "../../../data/Spell";

const General = () => {
  let location = useLocation();
  const [showResetDialog, setResetDialog] = useState<boolean>(false);
  const [files, setFiles] = useState<FileType[]>([]);
  const [progress, updateBackupProgress] = useState<number>(0);
  const [entity, setEntity] = useState<string>("spells");
  const [entityAmount, setEntityAmount] = useState<number>(0);
  const [attr, setAttr] = useState<string>("");
  const [attrLike, setAttrLike] = useState<string>("");
  const [attrs, setAttrs] = useState<{ value: string; label: string }[]>([]);

  const handleUpload = (file: FileType) => {
    importDTFile(file);
  };

  const handleSuccess = (response: object, file: FileType) => {
    toaster.push(
      <Notification closable header={"Success"} type="success">
        Success: Imported {file.name}.
      </Notification>,
      { placement: "bottomStart" }
    );
  };

  useEffect(() => {
    switch (entity) {
      case "spells":
        makeAttrs(new Spell());
        break;
      case "gears":
        makeAttrs(new Gear());
        break;
    }
    findEntityAmount();
  }, [entity]);

  const findEntityAmount = useCallback(() => {
    reciveCount(entity, (count: number) => {
      setEntityAmount(count);
    });
  }, [entity]);

  const makeAttrs = useCallback(
    (Entity: any) => {
      let newAttrs: { value: string; label: string }[] = [];
      for (let key in Entity) {
        newAttrs.push({ value: key, label: key });
      }
      setAttrs(newAttrs);
    },
    [entity]
  );

  const resetDatabase = () => {
    deleteDatabase();
    setResetDialog(false);
    toaster.push(
      <Notification closable header={"Success"} type="success">
        Success: Reset Database.
      </Notification>,
      { placement: "bottomStart" }
    );
  };

  const entities = [
    { value: "spells", label: "Spells" },
    { value: "gears", label: "Gears" },
  ];

  return (
    <>
      <Modal open={showResetDialog} onClose={() => setResetDialog(false)}>
        <Modal.Header>
          <Modal.Title>Attention</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to rest the database and delete all data stored?
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => resetDatabase()} appearance="primary">
            Yes, reset!
          </Button>
          <Button onClick={() => setResetDialog(false)} appearance="subtle">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <Divider>Backup</Divider>
      <PanelGroup>
        <StyledPanel header="Import Backup(.dndtome or .json)">
          <Uploader
            fileList={files}
            action={location.pathname}
            draggable
            multiple
            autoUpload
            onUpload={handleUpload}
            onSuccess={handleSuccess}
            onChange={setFiles}
            accept={".dndtome, .json"}
          >
            <div style={{ lineHeight: "100px" }}>Click or Drag files to this area to upload</div>
          </Uploader>
        </StyledPanel>
        <StyledPanel header="Backup (.dndtome)">
          <Button onClick={() => downloadBackup("DnDTome_all.dndtome", updateBackupProgress)}>
            <FaFileExport /> Download Backup
          </Button>
          {progress > 0 && <Progress percent={progress} strokeColor="#F55C5C" />}
        </StyledPanel>
        <StyledPanel header="Reset Database">
          <Button onClick={() => setResetDialog(true)}>
            <FaTrashAlt /> Reset Database
          </Button>
        </StyledPanel>
      </PanelGroup>
      <Divider>Data Management</Divider>
      <PanelGroup>
        <StyledPanel header="Select entity">
          <InputPicker
            value={entity}
            onChange={setEntity}
            data={entities}
            style={{ width: 224 }}
            cleanable={false}
          />
          <br />
          <Tag size="lg">{entityAmount}</Tag> {entity} currently in the Database.
        </StyledPanel>
        <StyledPanel header="Export (.dndtome)">
          <Button
            onClick={() => downloadAllFromTable(entity, `DnDTome_${entity}.dndtome`)}
            disabled={entity === ""}
          >
            <FaFileExport /> Export {entity}
          </Button>
        </StyledPanel>
        <StyledPanel header="Remove all">
          <Button onClick={() => deleteAll(entity)} disabled={entity === ""}>
            <FaTrashAlt /> Delete all {entity}
          </Button>
        </StyledPanel>
        <StyledPanel header={`Remove all ${entity} by attribute`}>
          <InputPicker
            value={attr}
            onChange={setAttr}
            data={attrs}
            style={{ width: 150 }}
            cleanable={false}
          />
          <InputGroup style={{ width: "200px" }}>
            <Input value={attrLike} onChange={(val: any) => setAttrLike(val)} />
            <InputGroup.Button
              onClick={() => deleteAllByAttr(entity, attr, attrLike)}
              disabled={attrLike === ""}
            >
              <FaTrashAlt />
            </InputGroup.Button>
          </InputGroup>
        </StyledPanel>
      </PanelGroup>
    </>
  );
};

export default General;

const PanelGroup = styled.div`
  margin-left: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const StyledPanel = styled(Panel)`
  min-width: 200px;
  background-color: ${({ theme }) => theme.secondColor};
  border-radius: 10px;
  box-shadow: ${({ theme }) => theme.mainColor};
  line-height: 40px;
`;
