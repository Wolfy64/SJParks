const db = require('../../models');
const { validateAllUpdates } = require('../../config/validation');

// @route GET api/park/
// @desc Get all parks
// @access Public
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

// @route GET api/park/:parkId
// @desc find a park with '_id = parkId'
// @access Public
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

// @route POST api/park/
// @desc Create An New Park
// @access Public
function create(req, res) {
	const { newName, newCode, addSubscriptionLogEntry, addMessageLogEntry } = req.body;
	const parkToBeAdded = {};
	const errors = [];

	if ((newName != null) & (newCode != null)) {
    db.Park.findOne({ name: newName, code: newCode }).exec((err, park) => {
      if (err) console.log(err);
			if (park) errors.push({msg:`A park named ${newName} with code: ${newCode} was found`});
		});
			parkToBeAdded.name = newName;
			parkToBeAdded.code = newCode;
	}

	if (addSubscriptionLogEntry != null) {
		db.SubscriptionLog
			.findOne({
        user: addSubscriptionLogEntry.user,
        park: addSubscriptionLogEntry.park
			})
			.exec((err, subscriptionLog) => {
				parkToBeAdded.subscriptionLogs = !subscriptionLog || err? []:[ subscriptionLog._id ];
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
				parkToBeAdded.messageLogs = !messageLog || err? []:[ messageLog._id ];
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

// @route PUT api/park/update/:id/
// @desc Update an existing park by id
// @access Public
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

// @route DELETE api/park/delete/:id/
// @desc Delete An park by id
// @access Public
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
