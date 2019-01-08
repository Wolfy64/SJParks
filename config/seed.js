// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require("../models");

module.exports = (UserList, ParkList, MessageList, MessageLog, SubscriptionLog) => {
  var seeder = [
    [], {}
  ];

  seeder[0].push(db.User);
  seeder[0].push(db.Park);
  seeder[0].push(db.Message);
  seeder[0].push(db.MessageLog);
  seeder[0].push(db.SubscriptionLog);

  console.log(seeder[0]);

  seeder[1].userList = UserList;
  seeder[1].parkList = ParkList;
  seeder[1].messageList = MessageList;
  seeder[1].messageLog = MessageLog;
  seeder[1].subscriptionLog = SubscriptionLog;

  console.log(seeder[1]);

  // seed the entire db
  seeder[0].forEach(Schema => {
    Schema.remove({})
      .then(elements => console.log(`${Schema} has been wiped clean.`))
      .catch(err => console.log(`An error occured while wiping, ${Schema}'s DB clean ( see: [seed.js:LN35-37]). Error thrown: ${err.message}`));

    Schema.create(seeder[1].pop(seeder[0].indexof(Schema)))
      .then(elements => {
        console.log(`${Schema}'s has been successfully seeded. Exiting process...`);
        process.exit();
      })
      .catch(err => console.log(`An error occured while Seeding ${Schema}. Error thrown: ${err}`));
  });
}
