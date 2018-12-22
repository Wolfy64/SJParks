const connectionHelper = require('../connectionHelper');
const expect = require('chai').expect;
const sinon = require('sinon');
const proxyquire = require('proxyquire');
const Subscriber = require('../../models/subscriber');

describe('subscriber', function() {
  const createStub = sinon.stub();
  const twilioClient = {
    messages: {create: createStub},
  };
  let messageSender = {};

  before(() => {
    console.log('wtf?');
    return connectionHelper.connect().then(() => {
      messageSender = proxyquire('../../lib/messageSender', {
        'twilio': () => {
          return twilioClient;
        },
      });
    });
  });

  after(() => {
    return connectionHelper.disconnect();
  });

  it('sends a message to subscribers', function() {
    // given
    const subscribers = [
      new Subscriber({phone: '+17864261786', subscribed: true}),
      new Subscriber({phone: '+17863167718', subscribed: true})];

    createStub.returns(Promise.resolve('message'));
    console.log(subscribers);
    // when
    return messageSender.sendMessageToSubscribers(subscribers, 'message', 'url')
      .then(() => {
        // then
        expect(createStub.calledTwice).to.be.true;
      });
  });
});
