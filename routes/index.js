const db = require('../models');
const allRouters = [];

module.exports.create = () => {
    for (const Model in db) {
        // 
		const newRouter = require('express').Router();

		var modelArray = Model.split('');
		var newFirstLetter = modelArray.shift();
		newFirstLetter = newFirstLetter.toLowerCase();
		modelArray.unshift(newFirstLetter);
		const model = modelArray.reduce((acc, curr) => acc + curr);

		console.log(`Creating the ${model}s router using: create${Model}Router`);

		newRouter.use(`${model}s`, require(`./create${Model}Router`));
		allRouters.push(newRouter);
	}
    console.log(allRouters);
	return allRouters;
};
