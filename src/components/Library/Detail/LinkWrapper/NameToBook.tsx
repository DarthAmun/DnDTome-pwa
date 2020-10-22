import React from "react";
import { RouteComponentProps } from "react-router";
import { MyAppDatabase } from "../../../../Database/MyDatabase";
import { useItemByAttr } from "../../../../Hooks/DexieHooks";
import AppWrapper from "../../../AppWrapper";
import { LoadingSpinner } from "../../../Loading";
import BookDetail from "../BookDetail";

type TParams = { name: string };

const NameToBook = ({ match }: RouteComponentProps<TParams>) => {
  const db = new MyAppDatabase();
  const [book, loading, error] = useItemByAttr(
    db.books,
    "name",
    match.params.name
  );

  return (
    <AppWrapper>
      {!error && loading && <LoadingSpinner />}
      {error && !loading && <>Fail by Name</>}
      {!error && !loading && book !== undefined && (
        <BookDetail book={book} isNew={book.name === "" ? true : false} />
      )}
    </AppWrapper>
  );
};

export default NameToBook;
