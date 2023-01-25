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
}