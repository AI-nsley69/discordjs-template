async function run(bot) {
	const info = {
		commands: bot.commands.size,
		events: bot.events.size,
		user: bot.client.user.tag,
	};

	console.table(info);
	const finishedAt = Math.round(performance.now() - bot.startedAt);
	console.log(`Startup took ${finishedAt}ms!`);
}

export default { run };