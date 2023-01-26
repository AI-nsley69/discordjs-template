import { Context } from './context.js';
import { argParser } from './arguments.js';

function isGuild(message) {
	return message.guild ? true : false;
}

async function commandHandler(bot, message) {
	if (!message.content.startsWith(bot.config.prefix) && !message.content.startsWith(bot.config.adminPrefix)) return;
	const args = message.content
		.slice(bot.config.prefix.length)
		.trim()
		.split(' ');
	const cmdName = args.shift().toLowerCase();

	if (!bot.commands.has(cmdName)) return;
	const cmd = bot.commands.get(cmdName);
	const ctx = new Context(message);
	// Handle admin commands
	if (cmd.group !== 'admin' && message.content.startsWith(bot.config.adminPrefix)) return;
	if (cmd.group === 'admin' && message.content.startsWith(bot.config.prefix)) return;
	if (cmd.group === 'admin' && !bot.config.adminIds.includes(ctx.getAuthor().id)) {
		ctx.err('You do not have permission to run this command!');
		return;
	}

	try {
		ctx.setArgs((await argParser(bot, args, cmd.args)));
	}
	catch (err) {
		ctx.err(err);
		return;
	}

	if (cmd.guild && !isGuild(message)) return;

	cmd.run(bot, ctx)
		.catch(err => {
			ctx.err(err);
			console.log(err);
		});
}

export { commandHandler };