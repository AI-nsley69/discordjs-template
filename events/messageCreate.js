import { commandHandler } from '../handler/handler.js';

async function run(bot, message) {
	commandHandler(bot, message);
}

export default { run };