import { CommandBuilder } from '../../handler/builders.js';
import { ReqArg } from '../../handler/args.js';

export default new CommandBuilder()
	.setDescription('Make the bot copy what you said!')
	.setUsage('[message to repeat]')
	.setArgs({
		string: ReqArg.StringCoalescing,
	})
	.setRun(async (bot, ctx) => {
		ctx.getInstance().delete().catch(err => {
			ctx.err(err);
			console.log(err);
		});
		ctx.respond(ctx.getArgs().string);
	});