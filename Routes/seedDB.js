var db = require('../models');

module.exports.dbSeedEngine = (Lists) => {
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
}

