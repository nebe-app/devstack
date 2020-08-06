#!/usr/bin/env node

const _ = require('lodash');
const fs = require('fs');
const chalk = require('chalk');
const checkForUpdate = require('../lib/utils/checkForUpdate.js');
const checkInstall = require('../lib/utils/checkInstall.js');

(async () => {
	checkForUpdate();

	const [, , ...args] = process.argv;

	let commandName = 'help';

	if (args.length > 0) {
		commandName = _.toString(args[0]);
	}

	if (commandName !== 'install' && commandName !== 'login' && commandName !== 'help') {
		await checkInstall();
	}

	if (!fs.existsSync(`${__dirname}/../lib/commands/${commandName}.js`)) {
		console.error(`Command`, chalk.red(commandName), `does not exist. Run`, chalk.blue(`nebe help`), `for the command list`);
		process.exit(0);
	}

	const CommandClass = require(`../lib/commands/${commandName}.js`);
	const command = new CommandClass();
	const commandIndex = process.argv.indexOf(commandName);
	const commandArgs = commandIndex > 0 ? process.argv.slice(commandIndex + 1) : [];
	await command.handle(commandArgs);

	if (command.keepRunning !== true) {
		process.exit(0);
	}
})();
