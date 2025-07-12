export interface Storage {
	/**
	 * Retrieves the value associated with the given key.
	 * @param key - The key to look up.
	 * @returns The string value for the key, or null if not found.
	 */
	get(key: string): Promise<string | null>;

	/**
	 * Finds all key-value pairs where the key matches the given pattern.
	 * The pattern supports simple wildcard matching with `%` representing any sequence of characters (e.g., 'user-%').
	 * Supports optional pagination with offset and limit.
	 * @param pattern - The pattern to match keys.
	 * @param options - Optional offset and limit for pagination.
	 * @returns An array of objects containing matching keys and their values.
	 */
	find(
		pattern: string,
		options?: { offset?: number; limit?: number },
	): Promise<{ key: string; value: string }[]>;

	/**
	 * Counts the number of keys matching the given pattern.
	 * The pattern supports simple wildcard matching with `%`.
	 * @param pattern - The pattern to match keys.
	 * @returns The count of matching keys.
	 */
	count(pattern: string): Promise<number>;

	/**
	 * Sets the value for a given key.
	 * Inserts a new key-value pair or updates the value if the key exists.
	 * @param key - The key to set.
	 * @param value - The string value to associate with the key.
	 */
	set(key: string, value: string): Promise<void>;

	/**
	 * Deletes the value associated with the given key.
	 * @param key - The key to delete.
	 */
	delete(key: string): Promise<void>;

	/**
	 * Deletes all keys (and their values) matching the given pattern.
	 * The pattern supports simple wildcard matching with `%`.
	 * @param pattern - The pattern to match keys for deletion.
	 */
	deleteMany(pattern: string): Promise<void>;
}
