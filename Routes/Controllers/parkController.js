const db = require('../../models');
const { validateAllUpdates } = require('../../config/validation');

/**
 * @public
 * @function index
 * @param {request} req 
 * @param {response} res 
 * @method GET /api/parks
 * @desc This will return the index of parks 
 */
function index(req, res) {
	db.Park
		.find()
		.sort({
			code: 1,
			name: 1
		})
		.then((parks) =>
			res.status(200).json({
				success: true,
				parks: parks
			})
		)
		.catch((err) =>
			res.status(459).json({
				success: false,
				errors: err
			})
		);
}

/**
 * @public
 * @function create
 * @param {request} req 
 * @param {response} res 
 * @method POST '/api/park'
 * @desc Create An New Park
 */
function create(req, res) {
	const { newName, newCode, addSubscriptionLogEntry, addMessageLogEntry } = req.body;
	const parkToBeAdded = {};
	const errors = [];

	if ((newName != null) && (newCode != null)) {
		db.Park
			.findOne({ name: newName, code: newCode })
			.then((park) =>
				errors
					.push({ msg: `A park named ${newName} with code: ${newCode} was found` })
					.catch((err) => errors.push({ msg: err }))
			);
		parkToBeAdded.name = newName;
		parkToBeAdded.code = newCode;
	}

	if (addSubscriptionLogEntry != null) {

		const newLog = new db.SubscriptionLog ({
				user: addSubscriptionLogEntry.user,
				park: addSubscriptionLogEntry.park
			})
			.save((err, subscriptionLog) => {
				parkToBeAdded.subscriptionLogs = !subscriptionLog || err ? [] : [ subscriptionLog._id ];
			});
	}

	if (addMessageLogEntry != null) {
		db.MessageLog
			.findOne({
				title: addMessageLogEntry.title,
				author: addMessageLogEntry.author,
				message: addMessageLogEntry.message,
				tag: addMessageLogEntry.tag
			})
			.exec((err, messageLog) => {
				parkToBeAdded.messageLogs = !messageLog || err ? [] : [ messageLog._id ];
			});
	}

	if (errors.length > 0) {
		res.status(461).json({
			success: false,
			errors: errors
		});
	} else {
		const newPark = new db.Park(parkToBeAdded);

		newPark
			.save()
			.then((newpark) =>
				res.status(200).json({
					Success: true,
					NewPark: newpark
				})
			)
			.catch((err) =>
				res.status(462).json({
					success: false,
					errors: err
				})
			);
	}
}

/**
 * @public
 * @function update
 * @param {request} req 
 * @param {response} res 
 * @method PUT /api/park/:parkId
 * @desc Update an existing park by objectId
 */
function update(req, res) {
	const { errors, isValid } = validateAllUpdates(req.body);
	const opts = {
		new: true, // return updated doc
		runValidators: true // validate before update
	};

	if (!isValid) {
		res.status(437).json({ errors });
	} else {
		db.Park
			.findByIdAndUpdate(req.params.id, req.body, opts)
			.then((doc) => {
				doc.save();
			})
			.catch((err) => console.log(err));
	}
}

/**
 * @public
 * @function read
 * @param {request} req 
 * @param {response} res 
 * @method GET api/park/:parkId
 * @desc Find a park given a an ObjectId
 */
function read(req, res) {
	db.Park
		.findById(req.params.parkId)
		.then((park) =>
			res.status(200).json({
				success: true,
				park: park
			})
		)
		.catch((err) =>
			res.status(460).json({
				success: false,
				errors: err
			})
		);
}

/**
 * @public
 * @function destroy
 * @param {request} req 
 * @param {response} res 
 * @method DELETE /api/park/:parkId
 * @desc Delete An park by ObjectId
 */
function destroy(req, res) {
	db.Park
		.findByIdAndDelete(req.params.id)
		.then((park) =>
			park.remove().then((removedpark) =>
				res.status(296).json({
					success: true,
					deleted: removedpark
				})
			)
		)
		.catch((err) => console.log(err));
}

module.exports = {
	index,
	read,
	create,
	update,
	destroy
};
