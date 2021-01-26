import React from "react";
import { RouteComponentProps } from "react-router";
import { MyAppDatabase } from "../../../../../database/MyDatabase";
import { useItem } from "../../../../../hooks/DexieHooks";

import AppWrapper from "../../../../AppWrapper";
import { LoadingSpinner } from "../../../../Loading";
import CampaignDetail from "../CampaignDetail";

type TParams = { id: string };

const IdToCampaign = ({ match }: RouteComponentProps<TParams>) => {
  const db = new MyAppDatabase();
  const [campaign, loading, error] = useItem(db.campaigns, +match.params.id);

  return (
    <AppWrapper>
      {!error && loading && <LoadingSpinner />}
      {error && !loading && <>Fail by Id</>}
      {!error && !loading && campaign === undefined && <>Fail by Id</>}
      {!error && !loading && campaign !== undefined ? (
        <CampaignDetail campaign={campaign} isNew={campaign.name === "" ? true : false} />
      ) : (
        ""
      )}
    </AppWrapper>
  );
};

export default IdToCampaign;
