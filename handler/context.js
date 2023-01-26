import { EmbedBuilder } from '@discordjs/builders';

/**
 * @param instance instance of message/interaction object.
 */
export class Context {
	constructor(instance) {
		this.instance = instance;
	}

	setArgs(args) {
		this.args = args;
	}

	getArgs() {
		return this.args;
	}

	getAuthor() {
		return this.instance.author;
	}

	getGuild() {
		return this.instance.guild;
	}

	getChannel() {
		return this.instance.channel;
	}

	getInstance() {
		return this.instance;
	}

	respond(str) {
		this.instance.channel.send(str);
	}

	respondEmbed(embeds) {
		this.instance.channel.send({ embeds: embeds });
	}

	err(str) {
		const embed = new EmbedBuilder()
			.setTitle('Something went wrong when running this command!')
			.setColor(0xFF0000)
			.setDescription(str);

		this.respondEmbed([embed]);
	}
}