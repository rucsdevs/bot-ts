import { join } from "node:path";
import { Glob } from "bun";
import chalk from "chalk";

const baseDir = join(import.meta.dir, "../modules");
const glob = new Glob("*/index.{ts,js}");

const files = glob.scanSync(baseDir);

for (const file of files) {
	try {
		await import(`../modules/${file}`);
	} catch (err) {
		console.error(
			chalk.red.bold("[RUCS ERROR]"),
			`Failed to import ${join(`/modules/${file}`)}`,
			err,
		);
	}
}
