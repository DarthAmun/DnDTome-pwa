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
} from "../../services/DatabaseService";
import {
  downloadAllFromTable,
  downloadAllFromTableByAttr,
  downloadBackup,
} from "../../services/DownloadService";
import { importDTFile } from "../../services/UploadService";
import styled from "styled-components";
import Gear from "../../data/Gear";
import Spell from "../../data/Spell";

const Options = () => {
  let location = useLocation();
  const [showResetDialog, setResetDialog] = useState<boolean>(false);
  const [files, setFiles] = useState<FileType[]>([]);
  const [progress, updateBackupProgress] = useState<number>(0);
  const [entity, setEntity] = useState<string>("spells");
  const [entityAmount, setEntityAmount] = useState<number>(0);
  const [attr, setAttr] = useState<string>("");
  const [attrLike, setAttrLike] = useState<string>("");
  const [attrs, setAttrs] = useState<{ value: string; label: string }[]>([]);

  const [webhook, setWebhook] = useState<string>(localStorage.getItem("webhook") + "");
  const [webhookUser, setWebhookUser] = useState<string>(localStorage.getItem("webhook_user") + "");

  useEffect(() => {
    if (webhook !== localStorage.getItem("webhook")) localStorage.setItem("webhook", webhook);
  }, [webhook]);

  useEffect(() => {
    if (webhookUser !== localStorage.getItem("webhook_user"))
      localStorage.setItem("webhook_user", webhookUser);
  }, [webhookUser]);

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
    <ContentWrapper>
      <OptionContent>
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
        <Divider>General</Divider>
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
            <Wrapper>
              Create a backup of the database with all the homebrew in it to download.
              <br />
              <br />
              <Button
                appearance="primary"
                onClick={() => downloadBackup("DnDTome_all.dndtome", updateBackupProgress)}
              >
                <FaFileExport /> Download Backup
              </Button>
              {progress > 0 && <Progress percent={progress} strokeColor="#F55C5C" />}
            </Wrapper>
          </StyledPanel>
          <StyledPanel header="Reset Database">
            <Wrapper>
              Reset the database which will result in all data been permanently deleted.
              <br />
              <br />
              <Button appearance="primary" onClick={() => setResetDialog(true)}>
                <FaTrashAlt /> Reset Database
              </Button>
            </Wrapper>
          </StyledPanel>
        </PanelGroup>
        <Divider>Data Management</Divider>
        <PanelGroup>
          <StyledPanel style={{ width: "500px" }}>
            <Wrapper>
              <InputGroup style={{ width: "200px" }}>
                <InputGroup.Addon>Entity</InputGroup.Addon>
                <InputPicker
                  value={entity}
                  onChange={setEntity}
                  data={entities}
                  cleanable={false}
                />
              </InputGroup>
              <Divider>Filter</Divider>
              <InputGroup style={{ width: "200px" }}>
                <InputGroup.Addon>Attribute</InputGroup.Addon>
                <InputPicker
                  value={attr}
                  onChange={setAttr}
                  data={attrs}
                  style={{ width: 150 }}
                  cleanable={true}
                />
              </InputGroup>
              <InputGroup style={{ width: "200px" }}>
                <InputGroup.Addon>=</InputGroup.Addon>
                <Input value={attrLike} onChange={(val: any) => setAttrLike(val)} />
              </InputGroup>
            </Wrapper>
            <VerticalDivider />
            <FlexWrapper>
              {!attr && (
                <Button
                  appearance="primary"
                  onClick={() => downloadAllFromTable(entity, `DnDTome_${entity}.dndtome`)}
                  disabled={entity === ""}
                >
                  <FaFileExport /> Backup all {entityAmount} {entity}
                </Button>
              )}
              {attr && (
                <Button
                  appearance="primary"
                  onClick={() =>
                    downloadAllFromTableByAttr(
                      entity,
                      attr,
                      attrLike,
                      `DnDTome_${entity}_${attr}(${attrLike}).dndtome`
                    )
                  }
                  disabled={entity === ""}
                >
                  <FaFileExport /> Backup {attr}({attrLike}) {entity}
                </Button>
              )}
              <br />
              {!attr && (
                <Button
                  appearance="primary"
                  onClick={() => deleteAll(entity)}
                  disabled={entity === ""}
                >
                  <FaTrashAlt /> Delete all {entityAmount} {entity}
                </Button>
              )}
              {attr && (
                <Button
                  appearance="primary"
                  onClick={() => deleteAllByAttr(entity, attr, attrLike)}
                  disabled={entity === ""}
                >
                  <FaTrashAlt /> Delete {attr}({attrLike}) {entity}
                </Button>
              )}
              {/* <Tag size="lg">{entityAmount}</Tag> {entity} currently in the Database. */}
            </FlexWrapper>
          </StyledPanel>
        </PanelGroup>
        <Divider>Discord</Divider>
        <PanelGroup>
          <StyledPanel header="Webhook">
            <InputGroup>
              <InputGroup.Addon>PlayerName</InputGroup.Addon>
              <Input value={webhookUser} onChange={(val: any) => setWebhookUser(val)} />
            </InputGroup>
            <InputGroup>
              <InputGroup.Addon>Webhook</InputGroup.Addon>
              <Input value={webhook} onChange={(val: any) => setWebhook(val)} />
            </InputGroup>
          </StyledPanel>
        </PanelGroup>
      </OptionContent>
    </ContentWrapper>
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

const PanelGroup = styled.div`
  margin-left: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
`;

const StyledPanel = styled(Panel)`
  width: 400px;
  background-color: ${({ theme }) => theme.secondColor};
  border-radius: 10px;
  box-shadow: ${({ theme }) => theme.mainColor};

  & .rs-panel-body {
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
  }

  & .rs-input-group {
    margin-bottom: 5px;
  }
`;

const Wrapper = styled.div`
  flex: 1 1;
`;
const FlexWrapper = styled(Wrapper)`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 10px;
`;

const VerticalDivider = styled.div`
  flex: 1 1;
  max-width: 1px;
  margin: 10px;
  border-left: 1px solid var(--rs-divider-border);
`;
