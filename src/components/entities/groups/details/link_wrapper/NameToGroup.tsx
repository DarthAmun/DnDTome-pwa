import React from "react";
import { RouteComponentProps, useHistory } from "react-router";
import Group from "../../../../../data/campaign/Group";
import { MyAppDatabase } from "../../../../../database/MyDatabase";
import { useItemByAttr } from "../../../../../hooks/DexieHooks";
import { createNewWithId } from "../../../../../services/DatabaseService";
import AppWrapper from "../../../../AppWrapper";
import ErrorTile from "../../../../general_elements/ErrorTile";
import { LoadingSpinner } from "../../../../Loading";
import GroupDetail from "../GroupDetail";

type TParams = { name: string };

const NameToGroup = ({ match }: RouteComponentProps<TParams>) => {
  let history = useHistory();
  const db = new MyAppDatabase();
  const [group, loading, error] = useItemByAttr(db.groups, "name", match.params.name);

  const createNewGroup = () => {
    let newGroup = new Group(0, match.params.name);
    delete newGroup.id;
    createNewWithId("groups", newGroup, (id) => {
      history.push(`/group-detail/id/${id}`);
    });
  };

  return (
    <AppWrapper>
      {!error && loading && <LoadingSpinner />}
      {error && !loading && <>Error occured</>}
      {!error && !loading && group === undefined && (
        <ErrorTile
          text={"No such group exists. Want to creat such group?"}
          buttonText={"Add"}
          onButton={() => createNewGroup()}
        />
      )}
      {!error && !loading && group !== undefined ? (
        <GroupDetail group={group} isNew={group.name === "" ? true : false} />
      ) : (
        ""
      )}
    </AppWrapper>
  );
};

export default NameToGroup;
