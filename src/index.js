import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import * as firebase from "firebase";
import { firebaseConfig } from "./firebase.config";
import { ConfigProvider } from "antd";
import es_ES from "antd/es/locale/es_ES";
import "antd/dist/antd.css";

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <ConfigProvider locale={es_ES}>
    <App />
  </ConfigProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
