import readline from 'readline';
import fs from 'fs';

function ask(q) {
	const input = readline.createInterface(process.stdin, process.stdout);

	return new Promise(resolve => {
		input.question(q, r => {
			resolve(r);
			input.close();
		});
	});

}

async function main() {
	const editEnv = await ask('Do you wish to edit .env? (y/n) ');
	console.log(editEnv);
	if (editEnv.toLowerCase() === 'y') await editEnvFile();

	const editConf = await ask('Do you wish to edit config.json? (y/n) ');
	if (editConf.toLowerCase() === 'y') await editJsonConf();
}

async function editEnvFile() {
	const token = await ask('Bot token: ');
	const content = `token=${token}`;

	fs.writeFileSync('./.env', content, (err) => {
		if (err) console.log(err);
		return;
	});
}

async function editJsonConf() {
	const confObj = {};
	confObj.prefix = await ask('Bot prefix: ');
	confObj.adminPrefix = await ask('Admin prefix: ');
	confObj.adminIds = [await ask('Your user id: ')];

	writeJsonObject(confObj);
}

function writeJsonObject(obj) {
	fs.writeFileSync('./config.json', JSON.stringify(obj, null, '\t'), (err) => {
		if (err) console.log(err);
		return;
	});
}

main();