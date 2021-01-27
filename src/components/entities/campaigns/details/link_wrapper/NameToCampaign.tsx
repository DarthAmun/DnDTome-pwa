import React from "react";
import { RouteComponentProps, useHistory } from "react-router";
import Campaign from "../../../../../data/campaign/Campaign";
import { MyAppDatabase } from "../../../../../database/MyDatabase";
import { useItemByAttr } from "../../../../../hooks/DexieHooks";
import { createNewWithId } from "../../../../../services/DatabaseService";
import ErrorTile from "../../../../general_elements/ErrorTile";
import { LoadingSpinner } from "../../../../Loading";
import CampaignDetail from "../CampaignDetail";

type TParams = { name: string };

const NameToCampaign = ({ match }: RouteComponentProps<TParams>) => {
  let history = useHistory();
  const db = new MyAppDatabase();
  const [campaign, loading, error] = useItemByAttr(db.campaigns, "name", match.params.name);

  const createNewCampaign = () => {
    let newCampaign = new Campaign(0, match.params.name);
    delete newCampaign.id;
    createNewWithId("campaigns", newCampaign, (id) => {
      history.push(`/campaign-detail/id/${id}`);
    });
  };

  return (
    <>
      {!error && loading && <LoadingSpinner />}
      {error && !loading && <>Error occured</>}
      {!error && !loading && campaign === undefined && (
        <ErrorTile
          text={"No such campaign exists. Want to creat such campaign?"}
          buttonText={"Add"}
          onButton={() => createNewCampaign()}
        />
      )}
      {!error && !loading && campaign !== undefined ? (
        <CampaignDetail campaign={campaign} isNew={campaign.name === "" ? true : false} />
      ) : (
        ""
      )}
    </>
  );
};

export default NameToCampaign;
