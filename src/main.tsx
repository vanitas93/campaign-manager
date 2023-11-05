import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { CampaignProvider } from "./context/CampaignContext";

ReactDOM.render(
  <React.StrictMode>
    <CampaignProvider>
      <App />
    </CampaignProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
