import chalk from "chalk";
import { DATABASE_TYPE, DATABASE_URI } from "../env";
import { PostgresStorage } from "./adapters/psql";
import { SqliteStorage } from "./adapters/sqlite";

const kv =
	DATABASE_TYPE === "postgresql"
		? new PostgresStorage({ connectionString: DATABASE_URI })
		: new SqliteStorage({ fileName: DATABASE_URI });

console.debug(
	chalk.yellow.bold("[RUCS DEBUG]"),
	`Using ${DATABASE_TYPE === "postgresql" ? "PostgreSQL" : "SQLite"} database.`,
);

export default kv;
