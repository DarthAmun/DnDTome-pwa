import React, { useEffect, useState } from "react";
import styled from "styled-components";
import StringField from "../form_elements/StringField";

const DiscordOptions = () => {
  const [webhook, setWebhook] = useState<string>(localStorage.getItem("webhook") + "");
  const [webhookUser, setWebhookUser] = useState<string>(localStorage.getItem("webhook_user") + "");

  useEffect(() => {
    if (webhook !== localStorage.getItem("webhook")) localStorage.setItem("webhook", webhook);
  }, [webhook]);

  useEffect(() => {
    if (webhookUser !== localStorage.getItem("webhook_user"))
      localStorage.setItem("webhook_user", webhookUser);
  }, [webhookUser]);

  return (
    <General>
      <OptionSection>
        <SelectionTitle>Discord Webhook</SelectionTitle>
        <StringField value={webhookUser} label="PlayerName" onChange={setWebhookUser} />
        <StringField value={webhook} label="Webhook" onChange={setWebhook} />
      </OptionSection>
    </General>
  );
};

export default DiscordOptions;

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
  border-radius: 10px;
  box-shadow: ${({ theme }) => theme.tile.boxShadow};
  overflow: hidden;

  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
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
