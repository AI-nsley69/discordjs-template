import { Client, GatewayIntentBits } from 'discord.js';
import { ReqArg, OptArg } from '../handler/args.js';
import { CommandBuilder } from '../handler/builders.js';
import { Logger } from './logger.js';
import fs from 'fs';

export class Bot {
	constructor(promises) {
		this.logger = new Logger('bot.log');
		this.startedAt = performance.now();
		this.config = JSON.parse(fs.readFileSync('./config.json'));

		this.initClient();

		promises.push(this.loadCommands());
		promises.push(this.loadEvents());
	}

	initClient() {
		this.client = new Client({
			intents: [
				GatewayIntentBits.Guilds,
				GatewayIntentBits.GuildMessages,
				GatewayIntentBits.DirectMessages,
				GatewayIntentBits.MessageContent,
			],
		});
	}

	async loadCommands() {
		this.commandGroups = fs.readdirSync('./commands', { withFileTypes: true })
			.filter(d => d.isDirectory())
			.map(d => d.name);

		this.commands = new Map();
		this.commandGroups.forEach(group => {
			fs.readdirSync(`./commands/${group}`)
				.filter(f => f.endsWith('.js'))
				.forEach(async f => {
					const cmd = await import(`../commands/${group}/${f}`);
					cmd.default.setGroup(group);
					this.commands.set(f.replace('.js', ''), cmd.default);
				});
		});

		validateCommands(this, this.commands);
	}

	async loadEvents() {
		this.events = new Map();
		const events = fs.readdirSync('./events')
			.filter(f => f.endsWith('.js'));
		for (const name of events) {
			const event = await import(`../events/${name}`);
			this.events.set(name.replace('.js', ''), event.default);
		}
	}
}

function validateCommands(bot, commands) {
	for (const [name, command] of commands) {
		// Validate the command object
		if (!(command instanceof CommandBuilder)) {
			bot.logger.err(
				`Invalid command structure for the ${name} command. Please use the newcmd script to remake this command.`,
			);
			continue;
		}
		// Validate the run function
		if (!command.run) bot.logger.err(`Invalid run function for the ${name} command.`);
		if (typeof command.description !== 'string') bot.logger.err(`Description for the ${name} command is not a string.`);
		if (typeof command.usage !== 'string') bot.logger.err(`Usage for the ${name} command is not a string.`);
		if (!(command.args instanceof Object)) {bot.logger.log(`Args for the ${name} command is not an object.`);}
		else if (Object.keys(command.args).length > 0) {
			const validArgs = Object.entries(ReqArg)
				.map(a => a[1])
				.concat(Object.entries(OptArg)
					.map(a => a[1]),
				);
			for (const [, type] of Object.entries(command.args)) {
				if (!validArgs.includes(type)) bot.logger.log(`${name} argument for ${command} is an invalid argument type!`);
			}
		}
	}
}