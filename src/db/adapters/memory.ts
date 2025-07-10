import type { Storage } from "../types";

export class MemoryStorage implements Storage {
	private store = new Map<string, string>();

	async get(key: string): Promise<string | null> {
		if (typeof key !== "string") throw new Error("key must be a string");

		return this.store.get(key) ?? null;
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

		const regex = new RegExp(`^${pattern.replace(/%/g, ".*")}$`);

		let entries = Array.from(this.store.entries())
			.filter(([key]) => regex.test(key))
			.map(([key, value]) => ({ key, value }));

		if (typeof options?.offset === "number") {
			entries = entries.slice(options.offset);
		}
		if (typeof options?.limit === "number") {
			entries = entries.slice(0, options.limit);
		}

		return entries;
	}

	async count(pattern: string): Promise<number> {
		if (typeof pattern !== "string") {
			throw new Error("pattern must be a string");
		}

		const regex = new RegExp(`^${pattern.replace(/%/g, ".*")}$`);
		let count = 0;
		for (const key of this.store.keys()) {
			if (regex.test(key)) count++;
		}
		return count;
	}

	async set(key: string, value: string): Promise<void> {
		if (typeof key !== "string") throw new Error("key must be a string");
		if (typeof value !== "string") throw new Error("value must be a string");

		this.store.set(key, value);
	}

	async delete(key: string): Promise<void> {
		if (typeof key !== "string") throw new Error("key must be a string");

		this.store.delete(key);
	}

	async deleteMany(pattern: string): Promise<void> {
		if (typeof pattern !== "string") {
			throw new Error("pattern must be a string");
		}

		const regex = new RegExp(`^${pattern.replace(/%/g, ".*")}$`);
		for (const key of Array.from(this.store.keys())) {
			if (regex.test(key)) {
				this.store.delete(key);
			}
		}
	}
}
