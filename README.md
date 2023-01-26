## What is this?
This is a discord.js bot template derived from the work done in [AinsBOT](https://github.com/AI-nsley69/AinsBOT) with some stripped features. The bot currently works with message-based commands like the ol' fashion bots.

## How do I get started?
You can use this as a template for a new github repository, then you can start modifying the code on that repository!

After you have cloned your own repository, please edit the `config.json` and `.env` to your liking or use the configure script with the following command:
```
yarn configure
```

You can then install the dependencies with 
```
yarn install
```

To start the bot, you can run
```
yarn start
```


## Creating your own command
To get started with a new command, run the following command
```
yarn newcmd <category> <command>
```
where category is replaced with the category and command is replaced with the command name you want. This will create a simple command that you can start working on. If you're curious as to what the commands can do, feel free to check out the `handler/builders.js` file, as it has setters for every parameter you can set for the bot, and then `handler/args.js` file for checking the types of arguments the bot can have.

The following part is where you put all of the code for the command
```js
.setRun((bot, ctx) => {
    // code goes here
})
```

It is important to note that you pass an object to the `.setArgs()` function for the command builder, these arguments are expected to be in order and optional arguments should ALWAYS be after all of your required ones. The handler will then parse all of the arguments and return an object with the same fields as to what you did in the setArgs function. For example if the following is the arguments you want for a command ()
```js
.setArgs({
    example: ReqArg.User
})
```
then in your code you can call it with `ctx.getArgs().example` and it will return the user object you expected. Note that it will be the first user passed to the command, and it also accepts ids as the argument. 

## What is ctx?
ctx is short for context, which is a class the bot uses to contain all of the information important to the command, I highly recommend you check out the `handler/context.js` file to see what it can do, as you most likely will only need to get the arguments or call the other functions to get things like author, guild and channel objects.

The following calls can be made to the ctx variable:
```js
// This will get the user object of the author of the message
ctx.getAuthor()
// This will get the channel object of the channel the message was sent in
ctx.getChannel()
// This will get the guild object of the guild the message was sent in
ctx.getGuild()
// This will get the instance of the message object that called this command
ctx.getInstance()
// This will get the arguments passed to the command
ctx.getArgs()
```

## What is bot?
It is an object containing some information about the bot, it is important to note that if you wish to get the client information, you would call `bot.client` and continue from there.


## Logger
The bot has a simple logger that will log the time of the event to console and write it to a file called `bot.log`, if you wish to report your own error, please use the `bot.logger.log()` function and pass the error to it. It will handle the rest.

## I found some issues or I need help
Feel free to report any issues you've found on the issue tracker or join the [AinsBOT](https://discord.gg/GBN3xdbSMR) discord server for assistance in the #template-support channel.