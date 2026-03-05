import { createRoot } from "react-dom/client";
import App from "./components/app/App";
import "./style/style.scss";
import { BrowserRouter } from "react-router";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>
);
