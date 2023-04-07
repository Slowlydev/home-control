import { Route, Routes } from "react-router-dom";

import SetupPage from "./pages/setup";

export default function App() {
	return (
		<div>
			<Routes>
				<Route path="/" element={<SetupPage />} />
			</Routes>
		</div>
	);
}
