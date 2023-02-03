import { CommandBuilder } from '../../handler/builders.js';
import { OptArg } from '../../handler/args.js';
import { EmbedBuilder } from 'discord.js';

export default new CommandBuilder()
	.setDescription('Good ol\' help command')
	.setUsage('(group)')
	.setArgs({
		group: OptArg.String,
	})
	.setRun(async (bot, ctx) => {
		const group = ctx.getArgs().group;

		if (!group || !Object.values(bot.commandGroups).includes(group)) {
			const embed = new EmbedBuilder()
				.setTitle('List of command groups!')
				.setAuthor({
					name: ctx.getAuthor().tag,
					iconURL: ctx.getAuthor().displayAvatarURL(),
				})
				.setDescription(
					Array.from(
						bot.commandGroups,
						(name) => name[0].toUpperCase() + name.substr(1),
					).join('\n'),
				)
				.setColor(0x00FF00)
				.setFooter({
					text: `Use ${bot.config.prefix}help <group> to learn about commands in the group!`,
				});

			ctx.respondEmbed([embed]);
			return;
		}

		const cmds = await fetchCommands(bot, ctx, group);
		const embed = new EmbedBuilder()
			.setTitle(`List of commands in the ${group} group!`)
			.setAuthor({
				name: ctx.getAuthor().tag,
				iconURL: ctx.getAuthor().displayAvatarURL(),
			})
			.setDescription(cmds)
			.setColor(0x00ff00)
			.setTimestamp();

		ctx.respondEmbed([embed]);
	});

async function fetchCommands(bot, ctx, group) {
	// Setup an array for all the commands, then append the info as needed and join each command to a string
	const cmds = [...bot.commands.keys()]
		.filter(
			(name) =>
				bot.commands.get(name).group === group,
		)
		.map((name) => {
			// eslint-disable-next-line no-shadow
			const { description, usage } = bot.commands.get(name);
			return `${bot.config.prefix}${name} ${usage} - ${description}`;
		});

	return cmds.join('\n');
}