import { EmbedBuilder } from '@discordjs/builders';
import { CommandBuilder } from '../../handler/builders.js';

export default new CommandBuilder()
	.setDescription('Simple ping command!')
	.setRun(async (bot, ctx) => {
		const time = Date.now() - ctx.getInstance().createdTimestamp;
		const embed = new EmbedBuilder()
			.setDescription(`🏓 Pong! ${time}ms`);

		ctx.respondEmbed([embed]);
	});