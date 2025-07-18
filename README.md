# RUCS Typescript Discord bot

This is the Typescript Discord bot for RUCS, written in [Discord.JS](https://discord.js.org) (<https://discord.js.org>).

## Contributing

If you're a Rutgers student, you're allowed to contribute to the bot!

This bot is in the [RUCS Discord server](https://discord.gg/bdhQFrT5fD) (<https://discord.gg/bdhQFrT5fD>).

1. Follow the "setup" guide below.
2. You can start by creating a folder in `modules` with any name you want, then add a `index.js` or `index.ts` file. This file will automatically be imported by the bot. If you don't know what to name the folder, just name it your GitHub username.
3. In this file, you can find the boilerplate template guide below.
4. Before committing, make sure you run `bun check:fix` to format and lint your code.
5. When commiting, we highly recommend you to follow the [conventional commit messages](https://www.conventionalcommits.org/en/v1.0.0/) (<https://www.conventionalcommits.org/en/v1.0.0>).

## Boilerplate template

This is the boilerplate template you will need to use in the `index.js` or `index.ts` file in a folder in the `modules` folder.

You can import `@/client` to access the Discord.JS client and `@/kv` for the key value database.

```ts
import { Events } from "discord.js";
import client from "@/client";
import kv from "@/kv";

client.on(Events.MessageCreate, async (msg) => {
  if (msg.author.bot) return;

  if (msg.content === "!YOUR_COMMAND_HERE") {
    msg.channel.send("Hello world!");
  }
});
```

## KV storage / database

There is a built in key value storage for the database on this bot. It can only store strings.

> **Please start all your key names with your module name followed by a semi-colon.**

### SQLite vs PostgreSQL storage

You can choose between using the database [SQLite](https://www.sqlite.org) (<https://www.sqlite.org>) or [PostgreSQL](https://www.postgresql.org) (<https://www.postgresql.org>).

For beginners, it'll be easier to use SQLite instead.

- If you want to use SQLite, set `DATABASE_TYPE` to "`sqlite`" and `DATABASE_URI` to either "`:memory:`" or a file path in `.env`.
- If you want to use PostgreSQL, set `DATABASE_TYPE` to "`postgresql`" and provide the proper connection url in the `DATABASE_URI` field in `.env`.

### Functions / methods

```ts
import kv from "@/kv";

await kv.get("module_name:your_key"); // get a single key
await kv.find("module_name:list-%"); // get all keys that start with "module_name:list-"
await kv.find("module_name:list-%", { offset: 0, limit: 10 }); // the same function above with pagination support
await kv.count("module_name:list-%"); // get the count of how many keys start with "module_name:list-"
await kv.set("module_name:your_key", "value"); // set a key
await kv.delete("module_name:your_key"); // delete a key
await kv.deleteMany("module_name:list-%"); // delete all keys that start with "module_name:list-"
```

## Setup

This bot uses [Bun](https://bun.sh), instead of Node.JS.

Go to <https://bun.sh> and follow the instructions to install Bun!

Afterwards, you can run this to install dependencies:

```bash
bun i
```

Make sure to copy the `.env.example` file and rename it into `.env`.

In `.env`, replace the "`YOUR_BOT_TOKEN`" text with your Discord bot token! You can obtain a Discord bot token in <https://discord.dev>.

Then, you can use this following script to run the bot!

```bash
bun dev
```

## Code formatter and linter

The code uses a singular tab for indenting. Please run `bun check:fix` before pushing.

[Biome](https://biomejs.dev/) (<https://biomejs.dev>) is used as the code formatter and linter for this project.

You can use this following scripts format and lint every file:

```bash
bun check # checks what can be formatted and linted
bun check:fix # formats and lints everything it can
```
