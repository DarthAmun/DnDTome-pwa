import React from "react";
import { RouteComponentProps } from "react-router";
import { MyAppDatabase } from "../../../../../database/MyDatabase";
import { useItem } from "../../../../../hooks/DexieHooks";

import AppWrapper from "../../../../AppWrapper";
import { LoadingSpinner } from "../../../../Loading";
import GroupDetail from "../GroupDetail";

type TParams = { id: string };

const IdToGroup = ({ match }: RouteComponentProps<TParams>) => {
  const db = new MyAppDatabase();
  const [group, loading, error] = useItem(db.groups, +match.params.id);

  return (
    <AppWrapper>
      {!error && loading && <LoadingSpinner />}
      {error && !loading && <>Fail by Id</>}
      {!error && !loading && group === undefined && <>Fail by Id</>}
      {!error && !loading && group !== undefined ? (
        <GroupDetail group={group} isNew={group.name === "" ? true : false} />
      ) : (
        ""
      )}
    </AppWrapper>
  );
};

export default IdToGroup;
