import React from "react";
import { RouteComponentProps } from "react-router";
import { MyAppDatabase } from "../../../../../database/MyDatabase";
import { useItemByAttr } from "../../../../../hooks/DexieHooks";
import AppWrapper from "../../../../AppWrapper";
import { LoadingSpinner } from "../../../../Loading";
import CampaignDetail from "../CampaignDetail";

type TParams = { name: string };

const NameToCampaign = ({ match }: RouteComponentProps<TParams>) => {
  const db = new MyAppDatabase();
  const [campaign, loading, error] = useItemByAttr(db.campaigns, "name", match.params.name);

  return (
    <AppWrapper>
      {!error && loading && <LoadingSpinner />}
      {error && !loading && <>Fail by Name</>}
      {!error && !loading && campaign !== undefined ? <CampaignDetail campaign={campaign} /> : ""}
    </AppWrapper>
  );
};

export default NameToCampaign;
