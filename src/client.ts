import chalk from "chalk";
import { Client, GatewayIntentBits } from "discord.js";
import { TOKEN } from "./env";

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildExpressions,
		GatewayIntentBits.GuildIntegrations,
		GatewayIntentBits.GuildWebhooks,
		GatewayIntentBits.GuildInvites,
		GatewayIntentBits.GuildPresences,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildMessageReactions,
		GatewayIntentBits.GuildMessageTyping,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildScheduledEvents,
		GatewayIntentBits.GuildMessagePolls,
	],
});

client.once("ready", () => {
	console.info(chalk.blue.bold("[RUCS INFO]"), "The bot is ready!");
});

client.setMaxListeners(Number.MAX_SAFE_INTEGER);
client.login(TOKEN);

export default client;
