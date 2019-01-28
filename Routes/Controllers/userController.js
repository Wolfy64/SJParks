/*jshint esversion: 6 */
const db = require('../../models');
const cloudinary = require('cloudinary');
const { validate} = require('../../config');
const { responseSender } = require('../../lib');
const respond = responseSender;
/**
 * @access Public
 * @function read
 * @param {request} req 
 * @param {response} res 
 * @method GET /api/user/:userId 
 * @desc Read a user by userId 
 */
function read(req, res) {
	db.Park
		.findById({ _id: req.params.id })
		.then((park) => respond(res, true, park, 'json', '/'))
		.catch((err) => respond(res, false, err, 'json', '/'));
}

/**
 * @access Public
 * @function index
 * @param {request} req 
 * @param {response} res 
 * @method GET /api/user 
 * @desc Get all users 
 */
function index(req, res) {
	db.User
		.find()
		.sort({
			username: 1,
			phone: 1
		})
		.then((users) => respond(res, true, users, 'json', '/'))
		.catch((err) => respond(res, false, err, 'json', '/'));
}

/**
 * @public
 * @function create
 * @param {request} req 
 * @param {response} res 
 * @method POST api/user/ 
 * @desc Create An New user 
 */
function create(req, res) {
	// validate
	const { errors, isValid } = validate(req.body);

	if (!isValid) {
		console.log({ success: false, error: errors });
    respond(res, false, errors, 'json', '/');
	} else {
		const data = {
				access: req.body.access,
				userName: req.body.userName,
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				phone: req.body.phone,
				email: req.body.email
			},
			newUser = new db.User(data);

		db.Park
			.findOne({
				code: req.body.addPark
			})
			.then((park) => {
				if (park) {
					newUser.parks.push(park._id);
				} else {
					const newPark = new db.Park({
						code: req.body.addPark
					});
					newPark.users.push(newUser._id);
					newPark
						.save()
						.then((park) => newUser.parks.push(park._id))
						.catch((err) => errors.push(new Error({ msg: err.message })));
				}
			})
			.catch((err) => errors.push(new Error({ msg: err.message })));

		db.Message
			.findOne({
				message: req.body.addMessage
			})
			.exec((err, message) => {
				if (message) {
					newUser.messages.push(message._id);
				} else if (err || !message) {
					const newMessage = new db.Message({
						author: newUser._id,
						message: req.body.addMessage
					});
					newMessage
						.save()
						.then((message) => newUser.messages.push(message._id))
						.catch((err) => errors.push(new Error({ msg: err.message })));
				}
			});

		newUser.active = true;

		newUser.setPassword(req.body.password);

		newUser
			.save()
			.then((user) => {
				respond(res, true, user, 'json', '/');
				// req.flash('success_msg', 'You are now registered and can log in');
			})
			.catch((err) => respond(res, false, errors.push(new Error({ msg: err })), 'json', '/'));
	}
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
		addMessage
	} = req.body;

	const data = {};
	data.access = newAccess;
	data.userName = newUserName;
	data.firstName = newFirstName;
	data.lastName = newLastName;
	data.phone = newPhone;
	data.email = newEmail;

	const { errors, isValid } = validate(data);

	const options = {
		// setDefaultsOnInsert: true, sort: -1,
		new: true,
		upsert: false,
		runValidators: true,
		select: null,
		rawResult: false,
		strict: false
	};

	if (!isValid) {
		res.status(225).json({ errors });
	} else {
		db.User
			.findByIdAndUpdate(req.params.id, data, options)
			.then((newUser) => {
				db.Park
					.findOne({
						name: addPark
					})
					.exec((err, park) => {
						if (park) {
							newUser.parks.push(park._id);
						} else if (err || !park) {
							const newPark = new db.Park({
								name: addPark
							});
							newPark.users.push(newUser._id);
							newPark.save().then((park) => newUser.parks.push(park._id));
						}
					});

				db.Message
					.findOne({
						message: addMessage
					})
					.exec((err, message) => {
						if (message) {
							newUser.messages.push(message._id);
						} else if (err || !message) {
							const newMessage = new db.Message({
								author: newUser._id,
								message: addMessage
							});
							newMessage
								.save()
								.then((message) => newUser.messages.push(message._id))
								.catch((err) => console.log(err));
						}
					});

				newUser.setPassword(newPassword);
				newUser
					.save()
					.then((newuser) =>
						res.status(220).send({
							Success: true,
							NewUser: newuser
						})
					)
					.catch((err) => console.log(err));
			})
			.catch((err) => console.log(err)); // end findby id and update
	}
}

/*
@route DELETE api/user/:id 
@desc Delete An user by id 
@access Public
*/
function destroy(req, res) {
	db.User
		.findByIdAndDelete({
			_id: req.params.id
		})
		.then((user) => {
			user.parks.forEach((park) => {
				db.Park
					.findById(park)
					.then((doc) => {
						doc.users.pop(user._id);
						doc.save();
					})
					.catch((err) => console.log(err));
			});

			user.messagess.forEach((mess) => {
				db.Message
					.find({
						author: mess.author
					})
					.then((docs) => {
						docs.forEach((doc) => {
							doc.users.pop(user._id);
							doc.save();
						});
					})
					.catch((err) => console.log(err));
			});

			user
				.remove()
				.then((removeduser) =>
					res.status(200).json({
						success: true,
						deleted: removeduser
					})
				)
				.catch((err) => console.log(err));
		})
		.catch((err) => console.log(err));
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
	const values = Object.values(req.files);
	const promises = values.map((image) => cloudinary.uploader.upload(image.path));

	Promise.all(promises).then((results) => res.json(results)).catch((err) => console.log(err));

	res.status(200);
}

/*
@route /api/users/_id/park
*/
function readAllParks(req, res) {}

/*
@route /api/users/_id/park
*/
function readAllMessages(req, res) {}

/*
@route /api/users/_id/park
*/
function findPark(req, res) {}

/*
@route /api/users/_id/park
*/
function findMessage(req, res) {}

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
