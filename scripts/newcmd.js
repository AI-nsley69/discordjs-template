import { argv } from 'node:process';
import fs from 'fs';

const commandsPath = './commands';

function main() {
	const category = argv[3];
	if (!category) {
		console.log('Missing category argument!');
		process.exit(-1);
	}

	const command = argv[4];
	if (!command) {
		console.log('Missing command argument!');
		process.exit(-1);
	}

	const path = `${loadDir(category)}/${command}.js`;
	const stream = loadFile(path);
	writeCommand(stream);
	console.log(`Successfully added new command ${command} in ${category}`);
}


function loadDir(dir) {
	const path = `${commandsPath}/${dir}`;
	if (!fs.existsSync(path)) {
		fs.mkdirSync(path);
	}

	return path;
}

function loadFile(file) {
	if (fs.existsSync(file)) {
		console.log('Command already exists!');
		process.exit(-1);
	}

	return fs.createWriteStream(file);
}

function writeCommand(stream) {
	const cmd = `import { CommandBuilder } from '../../handler/builders.js';
import { ReqArg } from '../../handler/args.js';

export default new CommandBuilder()
\t.setDescription('Example command!')
\t.setUsage('[Required] (Optional)')
\t.setArgs({
\t\t// This is a required string
\t\texample: ReqArg.String,
\t})
\t.setRun(async (bot, ctx) => {
\t\tctx.respond('Hello World!');
\t});`;

	stream.write(cmd);
	stream.end();
}

main();