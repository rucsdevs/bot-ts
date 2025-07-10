export const TOKEN = process.env.TOKEN;
export const DATABASE_URL = process.env.DATABASE_URL;

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			TOKEN: string;
			DATABASE_URL: string | undefined;
		}
	}
}
