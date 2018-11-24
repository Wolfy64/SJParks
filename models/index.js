let mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/SJParks");

module.exports = {
  User: require("./User"),
  Park: require("./Park"),
  MessageLog: require("./MessageLog"),
  SubscriptionLog: require("./SubscriptionLog"),
  Issue: require("./Issue")
};
