import chalk from "chalk";
import { Pool } from "pg";
import type { Storage } from "../types";

export class PostgresStorage implements Storage {
	private pool: Pool;

	constructor({ connectionString }: { connectionString: string }) {
		this.pool = new Pool({ connectionString });

		this.pool.on("error", (err) => {
			console.error(`${chalk.red.bold("[RUCS ERROR]")} PostgreSQL error:`, err);
		});
	}

	async get(key: string): Promise<string | null> {
		if (typeof key !== "string") throw new Error("key must be a string");

		try {
			const res = await this.pool.query(
				"SELECT value FROM kv_store WHERE key=$1 LIMIT 1",
				[key],
			);
			return res?.rows[0]?.value ?? null;
		} catch (err) {
			console.error(
				`${chalk.red.bold("[RUCS ERROR]")} PostgreSQL error (get):`,
				err,
			);
			return null;
		}
	}

	async find(
		pattern: string,
		options?: { offset?: number; limit?: number },
	): Promise<{ key: string; value: string }[]> {
		if (typeof pattern !== "string") {
			throw new Error("pattern must be a string");
		}
		if (options?.offset != null && typeof options.offset !== "number") {
			throw new Error("offset must be a number");
		}
		if (options?.limit != null && typeof options.limit !== "number") {
			throw new Error("limit must be a number");
		}

		const values: (string | number)[] = [pattern];
		let sql = "SELECT key, value FROM kv_store WHERE key LIKE $1";

		if (typeof options?.limit === "number") {
			values.push(options.limit);
			sql += ` LIMIT $${values.length}`;
		}
		if (typeof options?.offset === "number") {
			values.push(options.offset);
			sql += ` OFFSET $${values.length}`;
		}

		try {
			const res = await this.pool.query(sql, values);
			return res.rows;
		} catch (err) {
			console.error(
				`${chalk.red.bold("[RUCS ERROR]")} PostgreSQL error (find):`,
				err,
			);
			return [];
		}
	}

	async count(pattern: string): Promise<number> {
		if (typeof pattern !== "string") {
			throw new Error("pattern must be a string");
		}

		try {
			const res = await this.pool.query(
				"SELECT COUNT(*) FROM kv_store WHERE key LIKE $1",
				[pattern],
			);
			return Number.parseInt(res.rows[0].count, 10);
		} catch (err) {
			console.error(
				`${chalk.red.bold("[RUCS ERROR]")} PostgreSQL error (count):`,
				err,
			);
			return 0;
		}
	}

	async set(key: string, value: string): Promise<void> {
		if (typeof key !== "string") throw new Error("key must be a string");
		if (typeof value !== "string") throw new Error("value must be a string");

		try {
			await this.pool.query(
				"INSERT INTO kv_store (key, value) VALUES ($1, $2) ON CONFLICT (key) DO UPDATE SET value=EXCLUDED.value",
				[key, value],
			);
		} catch (err) {
			console.error(
				`${chalk.red.bold("[RUCS ERROR]")} PostgreSQL error (set):`,
				err,
			);
		}
	}

	async delete(key: string): Promise<void> {
		if (typeof key !== "string") throw new Error("key must be a string");

		try {
			await this.pool.query("DELETE FROM kv_store WHERE key=$1", [key]);
		} catch (err) {
			console.error(
				`${chalk.red.bold("[RUCS ERROR]")} PostgreSQL error (delete):`,
				err,
			);
		}
	}

	async deleteMany(pattern: string): Promise<void> {
		if (typeof pattern !== "string") {
			throw new Error("pattern must be a string");
		}

		try {
			await this.pool.query("DELETE FROM kv_store WHERE key LIKE $1", [
				pattern,
			]);
		} catch (err) {
			console.error(
				`${chalk.red.bold("[RUCS ERROR]")} PostgreSQL error (deelteMany):`,
				err,
			);
		}
	}
}
