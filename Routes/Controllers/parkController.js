const db = require('../../models');
const { validateParkInput } = require('../../config/validator');
const { respond } = require('../../lib/responseSender');
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
		.then((parks) => respond(res, true, parks))
		.catch((err) => respond(res, false, err));
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
	for (const key in req.query) {
		console.log(key, req.query[key]);
	}
	console.log('> Creating new park');
	const {errors, isValid, data} = validateParkInput(req.body);
	console.log('> Passed new park data validation');
	if (!isValid) {
		console.log({ success: false, error: errors });
		respond(res, false, errors);
	} else {
		
		const NewPark = new db.Park(data);

		NewPark
			.save()
			.then((park) => {
				console.log(`New park created. NewPark: ${park._id}`);
				respond(res, true, park);
			})
			.catch((err) => {
				console.log(err);
				errors.push({ msg: err.message });
				respond(res, false, errors);
			});
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
	const { errors, isValid, data } = validateParkInput(req.body);
	const opts = {
		new: true, // return updated doc
		runValidators: true // validate before update
	};

	if (!isValid) {
		respond(res, false, errors);
	} else {
		db.Park
			.findByIdAndUpdate(req.params.id, data, opts)
			.then((doc) => {
				doc.save();
			})
			.catch((err) => respond(res, false, errors.push(new Error({msg: err}))));
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
		.findById(req.query.parkId)
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
