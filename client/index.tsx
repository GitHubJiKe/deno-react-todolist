// deno-lint-ignore-file
import { React, ReactDOM } from "../deps.ts";
import App from "./App.tsx";

ReactDOM.hydrate(
  <App />,
  // @ts-ignore
  document.getElementById("root"),
);
