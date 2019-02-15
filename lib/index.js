/*jshint esversion: 8 */
module.exports = {
  respond: require('./formatResponse'),
  UpdateOne: require('./sendSingleTwilioUpdate'),
  UpdateAll: require('./sendManyTwilioUpdates')
};