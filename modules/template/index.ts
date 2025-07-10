import { EmbedBuilder, Events } from "discord.js";
import client from "@/client";
import kv from "@/kv";

client.on(Events.MessageCreate, async (msg) => {
	if (msg.author.bot) return;

	if (msg.content === "!ping") {
		// Handle ping command
		msg.channel.send(`🏓 Pong! (${client.ws.ping}ms)`);
	} else if (msg.content === "!meow") {
		// Get counter of how many times the user ran this command
		let meowCount = Number.parseInt(
			(await kv.get(`template:meow-${msg.author.id}`)) ?? "0",
		);

		// Add 1 to counter
		meowCount++;
		await kv.set(`template:meow-${msg.author.id}`, meowCount.toString());

		// Handle meow command
		const embed = new EmbedBuilder()
			.setColor("Random")
			.setAuthor({
				name: `${msg.author.displayName} meows`,
				iconURL: msg.author.displayAvatarURL(),
			})
			.setImage(`https://cataas.com/cat?_=${Math.random()}`)
			.setFooter({ text: `You have ran this command ${meowCount} times.` });
		msg.channel.send({ embeds: [embed] });
	}
});
