import { Client, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
import fs from 'fs';
import logger from './modules/logger.js';

const time = performance.now();

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.MessageContent,
	],
});

async function main() {
	const bot = {
		client: client,
		config: JSON.parse(fs.readFileSync('config.json')),
		logger: logger,
		startedAt: time,
	};

	bot.commandGroups = fs.readdirSync('./commands', { withFileTypes: true })
		.filter(d => d.isDirectory())
		.map(d => d.name);

	const waits = [];

	bot.commands = new Map();
	await bot.commandGroups.forEach(group => {
		fs.readdirSync(`./commands/${group}`)
			.filter(f => f.endsWith('.js'))
			.forEach(async f => {
				const cmd = (await import(`./commands/${group}/${f}`));
				cmd.default.setGroup(group);
				bot.commands.set(f.replace('.js', ''), cmd.default);
			});
	});

	bot.events = new Map();
	const events = fs.readdirSync('./events')
		.filter(f => f.endsWith('.js'));
	for (const name of events) {
		const event = await import(`./events/${name}`);
		bot.events.set(name.replace('.js', ''), event);
	}

	Promise.all(waits).then(() => {
		for (const [name, event] of bot.events) {
			bot.client.on(name, async (...args) => {
				try {
					await event.default.run(bot, ...args);
				}
				catch (err) {
					console.log(err);
				}
			});
		}
	});
}

dotenv.config();
client.login(process.env.token);

main();