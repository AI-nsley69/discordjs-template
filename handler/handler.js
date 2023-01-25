import { Context } from './context.js';
import { argParser } from './arguments.js';

function isGuild(message) {
	return message.guild ? true : false;
}

async function commandHandler(bot, message) {
	if (!message.content.startsWith(bot.config.prefix)) return;
	const args = message.content
		.slice(bot.config.prefix.length)
		.trim()
		.split(' ');
	const cmdName = args.shift().toLowerCase();
	if (!bot.commands.has(cmdName)) return;
	const cmd = bot.commands.get(cmdName);

	const ctx = new Context(message);

	ctx.setArgs((await argParser(bot, args, cmd.args)));

	if (cmd.guild && !isGuild(message)) return;

	cmd.run(bot, ctx)
		.catch(err => {
			console.log(err);
		});
}

export { commandHandler };