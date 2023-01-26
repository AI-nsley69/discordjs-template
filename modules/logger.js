import chalk from 'chalk';
import fs from 'fs';

const filename = 'bot.log';
let currentTime;

async function log(err) {
	currentTime = new Date();
	toConsole(err);
	toFile(err);
}

async function toConsole(err) {
	const str = `(${chalk.magentaBright(currentTime.toTimeString().split(' ')[0])}) [${chalk.yellow('LOG')}/${chalk.redBright('ERR')}] ${err}`;
	console.log(str);
}

async function toFile(err) {
	const str = `(${currentTime.toTimeString().split(' ')[0]}) [${'LOG'}/ERR] ${err}`;
	fs.appendFile(filename, str, (err) => {
		if (err) {
			currentTime = new Date();
			toConsole(err);
		}
	});
}

export default { log };