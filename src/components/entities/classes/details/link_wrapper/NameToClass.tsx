import React from "react";
import { RouteComponentProps, useHistory } from "react-router";
import { MyAppDatabase } from "../../../../../database/MyDatabase";
import { useItemByAttr } from "../../../../../hooks/DexieHooks";
import { LoadingSpinner } from "../../../../Loading";
import AppWrapper from "../../../../AppWrapper";
import ClassDetail from "../ClassDetail";
import Class from "../../../../../data/classes/Class";
import { createNewWithId } from "../../../../../services/DatabaseService";
import ErrorTile from "../../../../general_elements/ErrorTile";

type TParams = { name: string };

const NameToClass = ({ match }: RouteComponentProps<TParams>) => {
  let history = useHistory();
  const db = new MyAppDatabase();
  const [classe, loading, error] = useItemByAttr(db.classes, "name", match.params.name);

  const createNewClass = () => {
    let newClass = new Class(0, match.params.name);
    delete newClass.id;
    createNewWithId("classes", newClass, (id) => {
      history.push(`/class-detail/id/${id}`);
    });
  };

  return (
    <AppWrapper>
      {!error && loading && <LoadingSpinner />}
      {error && !loading && <>Error occured</>}
      {!error && !loading && classe === undefined && (
        <ErrorTile
          text={"No such class exists. Want to creat such class?"}
          buttonText={"Add"}
          onButton={() => createNewClass()}
        />
      )}
      {!error && !loading && classe !== undefined && (
        <ClassDetail classe={classe} isNew={classe.name === "" ? true : false} />
      )}
    </AppWrapper>
  );
};

export default NameToClass;
