import React from "react";
import { RouteComponentProps } from "react-router";
import { MyAppDatabase } from "../../../../../database/MyDatabase";
import { useItem } from "../../../../../hooks/DexieHooks";
import AppWrapper from "../../../../AppWrapper";
import { LoadingSpinner } from "../../../../Loading";
import BookDetail from "../BookDetail";

type TParams = { id: string };

const IdToBook = ({ match }: RouteComponentProps<TParams>) => {
  const db = new MyAppDatabase();
  const [book, loading, error] = useItem(db.books, +match.params.id);
  return (
    <AppWrapper>
      {!error && loading && <LoadingSpinner />}
      {error && !loading && <>Fail by Id</>}
      {!error && !loading && book !== undefined && (
        <BookDetail book={book} isNew={book.name === "" ? true : false} />
      )}
    </AppWrapper>
  );
};

export default IdToBook;
