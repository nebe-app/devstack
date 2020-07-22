const config = require('../utils/config');

module.exports = class Login {
	help() {
		return `Save root directory`;
	}

	async handle(args) {
		if (args.length === 1) {
			config.set('root', process.cwd());
			console.log('Root set');
		}
	}
};