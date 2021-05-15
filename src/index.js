import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { loadLayersModel } from "@tensorflow/tfjs";

const MODEL_JSON = "/model.json";
const MODEL_INDEXEDDB_URL = "indexeddb://mnist-model";

async function fetchModel() {
  try {
    // fetch("model/model.json", {
    //   headers: {
    //     "Content-Type": "application/json",
    //     Accept: "application/json",
    //   },
    // })
    //   .then(function (response) {
    //     console.log(response);
    //     return response.json();
    //   })
    //   .then(function (myJson) {
    //     console.log(myJson);
    //   });

    const model = await loadLayersModel(MODEL_JSON);
    console.log("Model loaded from HTTP.");

    // Store the downloaded model locally for future use
    await model.save(MODEL_INDEXEDDB_URL);
    console.log("Model saved to IndexedDB.");

    return model;
  } catch (error) {
    console.error(error);
  }
}

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
// fetchModel();
