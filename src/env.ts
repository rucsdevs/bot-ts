export const TOKEN = process.env.TOKEN;
export const DATABASE_TYPE = process.env.DATABASE_TYPE;
export const DATABASE_URI = process.env.DATABASE_URI;

if (!["sqlite", "postgresql"].includes(DATABASE_TYPE)) {
	throw new Error("DATABASE_TYPE should be either 'sqlite' or 'postgresql'");
}

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			TOKEN: string;
			DATABASE_TYPE: "sqlite" | "postgresql";
			DATABASE_URI: string;
		}
	}
}
