import { Database } from "bun:sqlite";
import type { Storage } from "../types";

export class SqliteStorage implements Storage {
	private db: Database;

	constructor({ fileName }: { fileName?: string }) {
		this.db = new Database(fileName);

		this.db
			.prepare(
				"CREATE TABLE IF NOT EXISTS kv_store (key TEXT PRIMARY KEY, value TEXT NOT NULL)",
			)
			.run();
	}

	async get(key: string): Promise<string | null> {
		if (typeof key !== "string") throw new Error("key must be a string");

		const row = this.db
			.query("SELECT value FROM kv_store WHERE key = ?")
			.get(key) as { value: string } | null;
		return row?.value ?? null;
	}

	async find(pattern: string, options?: { offset?: number; limit?: number }) {
		if (typeof pattern !== "string")
			throw new Error("pattern must be a string");

		let sql = "SELECT key, value FROM kv_store WHERE key LIKE ?";
		const params: (string | number)[] = [pattern];

		if (typeof options?.limit === "number") {
			sql += " LIMIT ?";
			params.push(options.limit);
		}
		if (typeof options?.offset === "number") {
			sql += " OFFSET ?";
			params.push(options.offset);
		}

		const rows = this.db.query(sql).all(...params) as {
			key: string;
			value: string;
		}[];
		return rows;
	}

	async count(pattern: string) {
		if (typeof pattern !== "string")
			throw new Error("pattern must be a string");

		const row = this.db
			.query("SELECT COUNT(*) as count FROM kv_store WHERE key LIKE ?")
			.get(pattern) as { count: number } | null;
		return row?.count ?? 0;
	}

	async set(key: string, value: string): Promise<void> {
		if (typeof key !== "string") throw new Error("key must be a string");
		if (typeof value !== "string") throw new Error("value must be a string");

		this.db
			.prepare(
				"INSERT INTO kv_store (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value=excluded.value",
			)
			.run(key, value);
	}

	async delete(key: string): Promise<void> {
		if (typeof key !== "string") throw new Error("key must be a string");

		this.db.prepare("DELETE FROM kv_store WHERE key = ?").run(key);
	}

	async deleteMany(pattern: string): Promise<void> {
		if (typeof pattern !== "string")
			throw new Error("pattern must be a string");

		this.db.prepare("DELETE FROM kv_store WHERE key LIKE ?").run(pattern);
	}
}
