import { z } from "zod";

let envSchema = z.object({
	VITE_APP_CLIENT_ID: z.string().nonempty(),
	VITE_APP_CLIENT_SECRET: z.string().nonempty(),
	VITE_APP_CALLBACK_URL: z.string().nonempty(),
	VITE_APP_HUE_STATE: z.string().nonempty(),
});

let env = envSchema.parse(import.meta.env);

export { env };
