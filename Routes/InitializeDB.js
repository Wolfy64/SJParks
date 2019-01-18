// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require("../models");

const dbSeedEngine = (UserList, ParkList, MessageList, MessageLog, SubscriptionLog) =>
{
  var seeder = [
    [], {}
  ];
  if (!(UserList || ParkList || MessageList || MessageLog || SubscriptionLog))
  {
    console.error("you fucked up man, why didn't you provide a seed for every Schema, asshole!!")
  } else
  {

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
}

module.exports = {
  seeder: dbSeedEngine
}
