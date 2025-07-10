import chalk from "chalk";
import { DATABASE_URL } from "../env";
import { MemoryStorage } from "./adapters/memory";
import { PostgresStorage } from "./adapters/psql";

const kv = DATABASE_URL
	? new PostgresStorage({ connectionString: DATABASE_URL })
	: new MemoryStorage();

console.debug(
	chalk.yellow.bold("[RUCS DEBUG]"),
	`Using ${DATABASE_URL ? "PostgreSQL" : "in memory"} database.`,
);

export default kv;
