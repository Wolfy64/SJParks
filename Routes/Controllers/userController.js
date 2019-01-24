const db = require("../../models");
const cloudinary = require('cloudinary');
const config = require('../../config');

// Load input validation
const validateRegisterInput = require("../../config/validation");

/* 
@route GET api/user/:userId 
@desc Read a user by userId 
@access Public
*/
function read(req, res) {}

/*
@route GET api/user 
@desc Get all users 
@access Public
*/
function index(req, res) {
  db
    .User
    .find()
    .sort({
      username: 1,
      phone: 1
    })
    .then(users => {
      res
        .status(200)
        .json({
          success: true,
          users: users
        });
    })
    .catch(err => console.log(err));
}

/*
@route POST api/user/ 
@desc Create An New user 
@access Public
*/
function create(req, res) {
 res.status(200).json(req.body);
  // const {
  //   errors,
  //   isValid,
  //   data
  // } = validateRegisterInput(req.body);
  // // Check validation
  // if (!isValid) {
  //   if (!config.keys.prod) {
  //     return res.render('register', {
  //       errors
  //       /*,
  //             userName,
  //             firstName,
  //             lastName,
  //             phone,
  //             email,
  //             password,
  //             addPark,
  //             addMessage*/
  //     });
  //   } else {
  //     return res.status(400).json(errors);
  //   }

  // }
  // if (errors.length > 0) {

  // } else {
  //   let user = null;
  //   db
  //     .User
  //     .findOne({
  //       userName: data.userName,
  //       phone: data.phone,
  //       email: data.email
  //     })
  //     .then(userFound => {
  //       if (userFound)
  //         user = userFound;
  //     });
  //   if (user != null) {
  //     errors.push({
  //       msg: `Derp! User already exists!`,
  //       user: user
  //     })
  //     res.render('register', {
  //       errors,
  //       user
  //     });
  //   } else {

  //     const newUser = new db.User({
  //       isAdmin: data.isAdmin,
  //       userName: data.userName,
  //       firstName: data.firstName,
  //       lastName: data.lastName,
  //       phone: data.phone,
  //       email: data.email
  //     });

  //     db
  //       .Park
  //       .findOne({
  //         code: data.addPark
  //       })
  //       .then(park => {
  //         if (park) {
  //           newUser
  //             .parks
  //             .push(park._id);
  //         } else {
  //           const newPark = new db.Park({
  //             code: data.addPark
  //           });
  //           newPark
  //             .users
  //             .push(newUser._id);
  //           newPark
  //             .save()
  //             .then(park => newUser.parks.push(park._id))
  //             .catch(err => console.log(err));
  //         }
  //       })
  //       .catch(err => console.log(err));
  //     db
  //       .Message
  //       .findOne({
  //         message: data.addMessage
  //       })
  //       .exec((err, message) => {
  //         if (message) {
  //           newUser
  //             .messages
  //             .push(message._id);
  //         } else if (err || !message) {
  //           const newMessage = new db.Message({
  //             author: newUser._id,
  //             message: data.addMessage
  //           });
  //           newMessage
  //             .save()
  //             .then(message => newUser.messages.push(message._id))
  //             .catch(err => console.log(err));
  //         }
  //       });
  //     newUser.active = true;
  //     newUser.setPassword(data.password);

  //     newUser
  //       .save()
  //       .then(user => {
  //         req.flash('success_msg', 'You are now registered and can log in');
  //         res
  //           .status(220)
  //           .send({
  //             Success: true,
  //             NewUser: user._id
  //           });
  //         res.redirect('/admin/login');
  //       })
  //       .catch(err => console.log(err));
  //   }
  // }
}

/*
@route PUT api/user/update/:id 
@desc Update an existing user by id 
@access Public
*/
function update(req, res) {
  const {
    newAccess,
    newFirstName,
    newLastName,
    newPhone,
    newEmail,
    newUserName,
    newPassword,
    addPark,
    addMessage,
    
  } = req.body;

  const data = {};
  data.access = newAccess;
  data.userName = newUserName;
  data.firstName = newFirstName;
  data.lastName = newLastName;
  data.phone = newPhone;
  data.email = newEmail;

  const {
    errors,
    isValid,
    updates
  } = validateRegisterInput(data);
  
  const options = {
    // setDefaultsOnInsert: true, sort: -1,
    new: true,
    upsert: false,
    runValidators: true,
    select: null,
    rawResult: false,
    strict: false
  };

  if(!isValid){
    res.status(225).json({errors});
  } else {
    db
    .User
    .findByIdAndUpdate(req.params.id, updates, options)
    .then(newUser => {
      db
        .Park
        .findOne({
          name: addPark
        })
        .exec((err, park) => {
          if (park) {
            newUser
              .parks
              .push(park._id);
          } else if (err || !park) {
            const newPark = new db.Park({
              name: addPark
            });
            newPark
              .users
              .push(newUser._id);
            newPark
              .save()
              .then(park => newUser.parks.push(park._id));
          }
        });

      db
        .Message
        .findOne({
          message: addMessage
        })
        .exec((err, message) => {
          if (message) {
            newUser
              .messages
              .push(message._id);
          } else if (err || !message) {
            const newMessage = new db.Message({
              author: newUser._id,
              message: addMessage
            });
            newMessage
              .save()
              .then(message => newUser.messages.push(message._id))
              .catch(err => console.log(err));
          }
        });

      newUser.setPassword(newPassword);
      newUser
        .save()
        .then(newuser => res.status(220).send({
          Success: true,
          NewUser: newuser
        }))
        .catch(err => console.log(err));
    }).catch(err => console.log(err)); // end findby id and update
  }
}

/*
@route DELETE api/user/:id 
@desc Delete An user by id 
@access Public
*/
function destroy(req, res) {
  db
    .User
    .findByIdAndDelete({
      _id: req.params.id
    })
    .then(user => {
      //
      user
        .parks
        .forEach(park => {
          db
            .Park
            .findById(park)
            .then(doc => {
              doc
                .users
                .pop(user._id);
              doc.save();
            })
            .catch(err => console.log(err))
        });

      user
        .messagess
        .forEach(mess => {
          db
            .Message
            .find({
              author: mess.author
            })
            .then(docs => {
              docs.forEach(doc => {
                doc
                  .users
                  .pop(user._id);
                doc.save();
              })
            })
            .catch(err => console.log(err))
        });

      user
        .remove()
        .then(removeduser => res.status(200).json({
          success: true,
          deleted: removeduser
        }))
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err));
}

/*
@route POST /admin/image-upload 
@desc Delete An user by id 
@access Public
*/
function uploadImage(req, res) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });
  const values = Object.values(req.files)
  const promises = values.map(image => cloudinary.uploader.upload(image.path))

  Promise
    .all(promises)
    .then(results => res.json(results))
    .catch(err => console.log(err));

  res.status(200);
}

/*
@route /api/users/_id/park
*/
function readAllParks(req, res) {

}

/*
@route /api/users/_id/park
*/
function readAllMessages(req, res) {

}

/*
@route /api/users/_id/park
*/
function findPark(req, res) {

}

/*
@route /api/users/_id/park
*/
function findMessage(req, res) {

}

module.exports = {
  index,
  read,
  register: create,
  update,
  destroy,
  uploadImage,
  readAllParks,
  readAllMessages,
  findPark,
  findMessage
};