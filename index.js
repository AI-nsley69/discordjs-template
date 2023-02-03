import dotenv from 'dotenv';
import { Bot } from './modules/bot.js';

async function main() {

	const promises = [];
	const bot = new Bot(promises);

	dotenv.config();
	bot.client.login(process.env.token);

	Promise.all(promises).then(() => {
		for (const [name, event] of bot.events) {
			bot.client.on(name, async (...args) => {
				try {
					await event.run(bot, ...args);
				}
				catch (err) {
					console.log(err);
				}
			});
		}
	});
}

main();