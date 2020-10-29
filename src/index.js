import React from "react";
import ReactDOM from "react-dom";
import "./main.scss";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(<App />, document.getElementById("root"));

console.log = () => {}

serviceWorker.unregister();
