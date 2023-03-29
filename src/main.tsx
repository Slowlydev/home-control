import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./styles/globals.scss";

import App from "./App";

const element = document.getElementById("app");

if (!element) {
	throw new Error("element with id app was not found");
}

createRoot(element).render(
	<StrictMode>
		<App />
	</StrictMode>,
);
