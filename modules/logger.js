import chalk from 'chalk';
import fs from 'fs';

export class Logger {
	constructor(filename) {
		this.logFile = filename;
	}

	updateTime() {
		this.date = new Date();
		this.time = this.date.toTimeString().split(' ')[0];
	}

	async toConsole(err) {
		const str = `(${chalk.magentaBright(this.time)}) [${chalk.yellow('LOG')}/${chalk.redBright('ERR')}] ${err}`;
		console.log(str);
	}

	async toFile(err) {
		const str = `(${this.time}) [${'LOG'}/ERR] ${err}`;
		fs.appendFile(this.filename, str, (err) => {
			if (err) {
				this.updateTime();
				this.toConsole(err);
			}
		});
	}

	async log(err) {
		this.updateTime();
		this.toConsole(err);
		this.toFile(err);
	}
}