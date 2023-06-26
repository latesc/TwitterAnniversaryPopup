import * as React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./page";
import "./assets/styles.scss";

const domNode = document.getElementById("root");
const root = createRoot(domNode);

root.render(
    <StrictMode>
        <App />
    </StrictMode>
);

if (module.hot) {
    module.hot.accept();
}
