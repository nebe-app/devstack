const chalk = require('chalk');
const fs = require('fs-extra');

module.exports = async function checkConfig(configPath) {
	let errors = 0;

	if (!fs.existsSync(configPath)) {
		console.error(chalk.red(`config.json does not exist!`));
		return false;
	}

	const configContents = fs.readJsonSync(configPath);

	if (!configContents) {
		console.error(chalk.red(`config.json is not valid JSON`));
		return false;
	}

	if (typeof configContents.format !== 'string') {
		console.error(chalk.red(`Visual's format is not defined`));
		return false;
	}

	if (['fallback', 'html', 'print', 'image', 'video', 'audio', 'source'].indexOf(configContents.format) === -1) {
		console.error(chalk.red(`Visual's format is not correct`));
		return false;
	}

	if (typeof configContents.name !== 'string') {
		console.error(chalk.red(`Visual's name is not defined`));
		return false;
	}

	if (typeof configContents.description !== 'string') {
		console.warn(chalk.yellow(`Visual's description is not defined`));
		errors++;
	}

	if (errors === 0) {
		console.log(chalk.green(`Config seems ok`));
	}

	return true;
};