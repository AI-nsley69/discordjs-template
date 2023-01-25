/**
 * @param {string} description Command description for the help command
 * @param {string} usage Command usage for the help command
 * @param {Object} args Object for arguments to be returned to the command
 * @param {boolean} guild If set to true, the command can only be ran in a guild
 * @param {Function} run The code to run whenever the command is executed
 * @param {string} group Group name set at startup
*/
export class CommandBuilder {
	constructor() {
		this.description = '';
		this.usage = '';
		this.args = {};
		this.guild = false;
		this.run = null;
		this.group = '';
	}

	setDescription(desc) {
		this.description = desc;
		return this;
	}

	setUsage(usage) {
		this.usage = usage;
		return this;
	}

	setArgs(args) {
		this.args = args;
		return this;
	}

	setRun(run) {
		this.run = run;
		return this;
	}

	setGroup(group) {
		this.group = group;
		return this;
	}
}