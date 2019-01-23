const db = require('../../models');

// @route GET api/message/ @desc Get all message's @access Public
function index(req, res) {}

// @route GET api/message/:messageId @desc Find a message with '_id = messageId'
// @access Public
function read(req, res) {}

// @route POST api/message/ @desc Create a new message @access Public
function create(req, res) {}

function sendMessages(req, res) {
    // const messageSender = require('../lib/messageSender');   // Get message info
    // from form submission   const message = req.body.message;   const parkID =
    // req.body.parkID;   // console.log(req.session);   if (!message)   {
    // respond(res, 'Reason: Empty message.', false);   } else if (typeof (parkID)
    // === 'string')   {     respond(res, 'Reason: No park selected', false);   }
    // else   {     // TODO prettify res with message displayed     respond(res,
    // `Message: ${message}\nSent to parks: ${parkID}\nSent by:
    // ${req.session.username}`, true);     // Send messages to all users subscribed
    // to parks in Parks     // Subscription.find({     //   park: {$in: parkID},
    //  // }).then((users) => {     //
    // messageSender.sendMessageToSubscribers(users, message, '');     // }).then(()
    // => {     //   req.flash('successes', 'Messages on their way!');     //
    // res.redirect('/admin');     // }).catch((err) => {     //   console.log('err
    // ' + err.message);     //   req.flash('errors', err.message);     //
    // res.redirect('/admin');     // });   }

}

// @route UPDATE api/message/:messageId @desc Update a message with '_id =
// messageId' @access Public
function update(req, res) {}

// @route DELETE api/message/:messageId @desc Delete a message with '_id =
// messageId' @access Public
function destroy(req, res) {}
module.exports = {
    
}
// function respond(res, resMessage, success)
// {
//   res.send(`
//         <html>
//           <head>
//               <meta name="viewport" content="width=device-width, initial-scale=1">
//               <title>Admin Dashboard - SJParks</title>
//               <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
//               <link href="https://fonts.googleapis.com/css?family=Ubuntu" rel="stylesheet">
//               <style>
//                   body{
//                       font-family: Ubuntu, sans-serif;
//                       margin: 30px 20px;
//                   }
//               </style>
//           </head>
//           <body>
//               <p>${success ? 'Success: Message sent!' : 'Error: Couldn\'t verify the req'}.</p>
//               <p>${resMessage}</p>
//               <a class="btn" href="/admin">< Back</a>
//           </body>
//         </html>`)
// }