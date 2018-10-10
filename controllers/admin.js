/*
 * Handle admin clerical actions.
 */
const Park = require('../models/Park');

exports.createPark = function(req, res) {
    console.log('------------------------------------------------');
    console.log('------------------------------------------------');
    console.log('------------------------------------------------');
    console.log(req.session);
    console.log('------------------------------------------------');
    console.log('------------------------------------------------');
    console.log('------------------------------------------------');
    // Check if name exists
    Park.findOne({ name: req.body.parkname}, function(err, park) {
        if (err) {
            res.send('Derp! Please try again later.');
            return;
        }
        if (park) {
            res.send(`Derp! ${park.name} already exists.`);
        }
    }
    );

    //Check if code exists
    Park.findOne({ parkID: req.body.parkcode}, function(err, park) {
        if (err) {
            res.send('Derp! Please try again later.');
            return;
        }
        if (park) {
            res.send(`Derp! Code already used by ${park.name} with code ${park.parkID}.`);
            return
        }
    }
    );
    const newPark = new Park({ parkID: req.body.parkcode, name: req.body.parkname, users: []});

    //Create new park
    newPark.save(function(err, newpark) {
      if (err || !newpark) res.send('We couldn\'t add the park - please try again.');
      else res.send(` <p>Park successfully added.</p>  <a href="/admin">Go Back</a>`, {user: req.user});
    });

};