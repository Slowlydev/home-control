import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { checkConfig } from "@/lib/config";

export default function HomePage() {
	const navigate = useNavigate();

	useEffect(() => {
		const wrapper = async () => {
			const valid = await checkConfig();
			if (!valid) navigate("/setup");
		};

		wrapper();
	}, []);

	return <div>home</div>;
}
