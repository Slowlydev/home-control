import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import "./styles/globals.scss";

const element = document.getElementById("root");

if (!element) {
	throw new Error("element with id app was not found");
}

createRoot(element).render(
	<StrictMode>
		<App />
	</StrictMode>,
);
