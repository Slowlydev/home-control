import { Token } from "@/types/Token.type";

import { cloudToken } from "./axios.service";

export const requestToken = async (code: string): Promise<Token> => {
	const { data } = await cloudToken.post(
		"/oauth2/token",
		new URLSearchParams({
			grant_type: "authorization_code",
			code,
		}),
	);
	return data;
};

export const refreshToken = async ({ refreshToken }: { refreshToken: string }): Promise<Token> => {
	const { data } = await cloudToken.post(
		"/oauth2/token",
		new URLSearchParams({
			grant_type: "refresh_token",
			refresh_token: refreshToken,
		}),
	);
	return data;
};
