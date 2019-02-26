/*jshint esversion: 8 */ 
const router = require('express').Router();
const { validateParkInput } = require('../../configurations');
const { respond } = require('../../lib');
const db = require('../../models');

/**
 * @public
 * @function index
 * @param {request} req 
 * @param {response} res 
 * @method GET /api/parks
 * @desc This will return the index of parks 
 */
async function index(req, res) {
	const parks = await db.Park
		.find()
		.sort({
			code: 1,
			name: 1
		})
		.catch((err) => respond(res, false, err));
	respond(res, true, parks);
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
	if (isValid/*!isvalid*/) {
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
	console.log('[parkController] body', req.body);
	db.Park
		.findByIdAndDelete(req.params.id)
		.then((foundPark) =>
			foundPark
				.remove()
				.then(removedPark => respond(res, true, removedPark))
				.catch(err => console.log(err))	
		)
		.catch((err) => console.log(err));
}

// @route /api/park
router.route('/')
  .get(index)
  .post(create);

  // @route /api/parks/_id/
router.route('/:id')
  .get(read)
  .put(update)
	.delete(destroy);
	
module.exports = router;
