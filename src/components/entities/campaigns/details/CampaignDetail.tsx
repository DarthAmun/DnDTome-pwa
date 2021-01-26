import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";

import {
  faArrowLeft,
  faSave,
  faTrash,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Campaign from "../../../../data/campaign/Campaign";
import { remove, updateWithCallback } from "../../../../services/DatabaseService";

import BackButton from "../../../form_elements/BackButton";
import IconButton from "../../../form_elements/IconButton";
import CampaignEditView from "./CampaignEditView";
import CampaignView from "./CampaignView";
import { EditToggle, ToggleLeft, ToggleRight } from "../../../general_elements/ToggleStyle";

interface $Props {
  campaign: Campaign;
  isNew: boolean;
}

const CampaignDetail = ({ campaign, isNew }: $Props) => {
  const [editMode, setMode] = useState<boolean>(isNew);
  const [campaignObj, editCampaign] = useState<Campaign>(campaign);
  const [showAlert, setAlert] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [unsavedChanges, setUnsavedChanges] = useState<boolean>(false);
  let history = useHistory();

  const deleteCampaign = (campaignId: number | undefined) => {
    remove("campaigns", campaignId);
    history.goBack();
  };

  useEffect(() => {
    if (campaignObj !== campaign) {
      setUnsavedChanges(true);
    }
  }, [campaignObj, campaign]);

  const updateCampaign = (tableName: string, campaignObj: Campaign) => {
    console.log(campaignObj);
    updateWithCallback(tableName, campaignObj, (result) => {
      if (result > 0) {
        setUnsavedChanges(false);
        setMessage("Saved successful!");
        setAlert(true);
      } else {
        setMessage("Something went wrong!");
        setAlert(true);
      }
      setTimeout(() => {
        setAlert(false);
      }, 3000);
    });
  };

  const editAndSaveCampaign = (campaign: Campaign) => {
    editCampaign(campaign);
    updateCampaign("campaigns", campaign);
  };

  return (
    <>
      <TopBar>
        <BackButton icon={faArrowLeft} action={() => history.goBack()} />
        <EditToggle mode={editMode.toString()}>
          <ToggleLeft onClick={() => setMode(false)}>View</ToggleLeft>
          <ToggleRight onClick={() => setMode(true)}>Edit</ToggleRight>
        </EditToggle>
        {editMode && unsavedChanges && <Icon icon={faExclamationTriangle} />}
        {editMode && (
          <>
            <IconButton onClick={() => updateCampaign("campaigns", campaignObj)} icon={faSave} />
            <IconButton onClick={() => deleteCampaign(campaignObj.id)} icon={faTrash} />
            {message && showAlert && <Message>{message}</Message>}
          </>
        )}
      </TopBar>
      {editMode ? (
        <CampaignEditView campaign={campaignObj} onEdit={(value) => editCampaign(value)} />
      ) : (
        <CampaignView campaign={campaignObj} onEdit={(value) => editAndSaveCampaign(value)} />
      )}
    </>
  );
};

export default CampaignDetail;

const TopBar = styled.div`
  color: ${({ theme }) => theme.tile.color};
  background-color: ${({ theme }) => theme.main.backgroundColor};
  font-size: 16px;
  overflow: hidden;
  min-width: calc(100% - 20px);
  height: 45px;
  padding: 10px;
  position: relative;
  z-index: 100;
`;

const Message = styled.div`
  padding: 5px;
  width: 150px;
  height: 30px;
  line-height: 30px;
  border-radius: 5px;
  float: right;
`;

const Icon = styled(FontAwesomeIcon)`
  float: right;
  line-height: 30px;
  display: block;
  height: 30px;
  padding: 10px;
  color: ${({ theme }) => theme.main.highlight};
`;
