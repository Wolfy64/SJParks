/*jshint esversion: 8 */
const express = require('express');
const db = require('../models');
const controllers = require('./controllers');
const allRouters = [];
module.exports.create = () => {
	for (const Model in db) {
		var newRouter = express.Router();
		var modelArray = Model.split('');
		var newFirstLetter = modelArray.shift();
		newFirstLetter = newFirstLetter.toLowerCase();
		modelArray.unshift(newFirstLetter);
		const model = modelArray.reduce((acc, curr) => acc + curr);

    // console.log(`Creating the ${model}s router using: create${Model}Router`);
    
    // console.log(controllers[`${model}s`]);
    const router = controllers[`${model}s`];
    // console.log(typeof (router));

		newRouter.use(`${model}s`, () => router);
		allRouters.push(newRouter);
	}
	// console.log(allRouters);
	return allRouters;
};

/**
 * module.exports.dbSeedEngine = (Lists) => {
  const db = require('../models');
  var seeder = [
    [], {}
  ];
  
  const {UserList, ParkList, MessageList, MessageLog, SubscriptionLog} = Lists;
  
  if (!(UserList || ParkList || MessageList || MessageLog || SubscriptionLog))
  {
    console.error(" A list of some sort is required...");
  } else
  {

   for(const Model in db) {
      seeder[0].push(Model);
    }

    seeder[1].userList = UserList;
    seeder[1].parkList = ParkList;
    seeder[1].messageList = MessageList;
    seeder[1].messageLog = MessageLog;
    seeder[1].subscriptionLog = SubscriptionLog;

    console.log(seeder[1]);

    // seed the entire db
    seeder[0].forEach(Schema =>
    {
      Schema.remove({})
        .then(elements => { console.log(`${Schema} has been wiped clean.`); })
        .catch(err => console.error(err));

      Schema.create(seeder[1].pop(seeder[0].indexof(Schema)))
        .then(elements =>
        {
          console.log(`${Schema}'s have been successfully seeded. Exiting process...`);
        })
        .catch(err => console.log(err));
    });
    process.exit();
  }
};

* */
