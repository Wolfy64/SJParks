// const db = require('../models');
const validator = require('validator');
const isEmpty = require('is-empty');

/**
 * Validates user input provided by an HTTP_request object
 * 
 * @function validateUserInput 
 * @param {request.body} props
 * 
 */
function validateUserInput(props) {
	console.log('> [12:20] Begin user Validation');
	const errors = [];
	const data = {};
	const queries = {};

	// prepare data
	console.log('> [18:19] Preparing Data');
	data.access = !isEmpty(props.access) ? props.access : 'basic';
	data.userName = !isEmpty(props.userName) ? props.userName : '';
	data.password = !isEmpty(props.password) ? props.password : '';
	data.name = !isEmpty(props.name) ? props.name : '';
	data.phone = !isEmpty(props.phone) ? props.phone : '';
	data.email = !isEmpty(props.email) ? props.email : '';
	// data.addPark.code = !isEmpty(props.addPark.code) ? props.addPark.code : '';
	// data.addPark.name = !isEmpty(props.addPark.name) ? props.addPark.name : '';
	// data.addUpdate.author = !isEmpty(props.addUpdate.author) ? props.addUpdate.author : '';
	// data.addUpdate.auther = !isEmpty(props.addUpdate) ? props.addUpdate : '';
	console.log(`> [29:22] Prepared data: ${JSON.stringify(data)}`);

	// prepare validator queries
	console.log('> [32:22] Preparing queries');
	// queries.Park = { code: data.addPark.code, name: data.addPark.name };
	// queries.Update = { message: data.addUpdate.message, author: data.addUpdate.author };
	queries.User = {
		userName: data.userName,
		phone: data.phone,
		email: data.email
	};

	console.log(`> [41:19] Prepared queries: ${JSON.stringify(queries)}`);

	// empty validator checks

	if (validator.isEmpty(data.phone)) {
		console.log(`phone was empy`);
		errors.push({ msg: 'Phone field is required' });
	}
	console.log('[1]' + errors.toString());

	if (validator.isEmpty(data.email)) {
		console.log(`email was empy`);
		errors.push({ msg: 'Email field is required' });
	}
	console.log('[2]' + errors.toString());

	if (validator.isEmpty(data.userName)) {
		console.log(`userName was empy`);
		errors.push({ msg: 'userName field is required' });
	}
	console.log('[3]' + errors.toString());

	if (validator.isEmpty(data.password)) {
		console.log(`password was empy`);
		errors.push({ msg: 'Password field is required' });
	}
	console.log('[4]' + errors.toString());

	if (
		!validator.isLength(data.password, {
			min: 6,
			max: 30
		})
	) {
		errors.push({ msg: 'Password must be at least 6 and no more than 30 characters in length' });
	}
	console.log('[5]' + errors.toString());

	// misc validator checks
	if (!validator.isAlphanumeric(data.access)) {
		errors.push({ msg: 'Access must be alpha-numeric' });
	}
	console.log('[6]' + errors.toString());

	if (!validator.isMobilePhone(data.phone)) {
		errors.push({ msg: 'Phone is invalid' });
	}
	console.log('[7]' + errors.toString());

	// db.Update
	// 	.findOne(queries.Update)
	// 	.then((x) => data.addUpdate = x._id)
	// 	.catch((err) => errors.push({ msg: `Could not find a Update with that @userId`, errThrown: err }));
	// console.log('[8]'+errors.toString());

	// db.Park
	// 	.findOne(queries.Park)
	// 	.then((x) => data.appPark = x._id)
	// 	.catch((err) => errors.push({ msg: `Could not find a  with that @parkId`, errThrown: err }));
	// console.log('[9]'+errors);

	// db.User
	// 	.findOne(queries.User)
	// 	.then((userFound) => {
	// 		console.log(`found a user`);
	// 		errors.push({ msg: `A user with @userId: ${userFound._id} was found with the given information` });
	// 	})
	// 	.catch((err) => console.error(err));
	// console.log('[10]'+errors.toString());
	
	console.log(`> [111:23] End User Validation. ***** Errors: ${errors.toString()}, IsValid: ${errors.length === 0}, Data: ${JSON.stringify(data)}*****`);
	return {
		errors,
		isValid: errors.length === 0,
		data
	};
}

/**
 * @function validateParkInput 
 * @param {request.body} props
 * @desc Validates park input provided by an HTTP_request object
 */
function validateParkInput(props) {
	console.log('> validating park');
	const errors = [];
	const data = {};
	const queries = {};

	// prepare data
	console.log('> Preparing Data');
	data.name = !isEmpty(props.name) ? props.name : '';
	data.code = !isEmpty(props.code) ? props.code : '';
	// data.subscriptionLog = !isEmpty(props.addSubscriptionLog) ? props.addSubscriptionLog : '';
	// data.messageLog = !isEmpty(props.addMessageLog) ? props.addMessageLog : '';

	// prepare validator queries
	console.log('> Preparing queries');
	// queries.SubscriptionLog = { park: { $eq: { _id: props.addSubscriptionLog.parkId } } };
	// queries.MessageLog = { parks: { $eq: props.addMessageLog.parkId } };
	queries.Park = { name: data.name, code: data.code };
	console.log(`> Prepared queries: ${JSON.stringify(queries)}`);

	// empty validator checks
	if (validator.isEmpty(data.name)) {
		console.log(`name was empty`);
		errors.push({ msg: 'Name field is required' });
	}
	console.log('[1]' + errors.toString());

	if (validator.isEmpty(data.code)) {
		console.log(`code was empty`);
		errors.push({ msg: 'A Park Code is required' });
	}
	console.log('[2]' + errors.toString());

	// if (!validator.isEmpty(data.addSubscriptionLog))
	// 	db.SubscriptionLog.findOne(queries.SubscriptionLog).then((prop) => (data.subscriptionLog = prop._id)).catch((err) => {
	// 		errors.push({ msg: `Could not find a subscriptionLog with that @parkId`, errThrown: err });
	// 	});
	// 	console.log('[3]' + errors.toString());

	// if (!validator.isEmpty(data.addMessageLog))
	// 	db.MessageLog.findOne(queries.MessageLog).then((prop) => (data.messageLog = prop._id)).catch((err) => {
	// 		errors.push({ msg: `Could not find a messageLog with that @authorId`, errThrown: err });
	// 	});
	// 	console.log('[4]' + errors.toString());

	// misc validator checks
	// db.Park
	// 	.findOne(queries.Park)
	// 	.then((park) => {
	// 		errors.push({ msg: `A park named ${park.name} with code: ${park.code} was found` });
	// 	})
	// 	.catch((err) => console.error(err));
	// 	console.log('[5]' + errors.toString());

	return {
		errors,
		isValid: errors.length === 0,
		data
	};
}

/**
 * @public
 * @function validateLoginInput
 * @param {data} data 
 * @desc 
 */
function validateLoginInput(data) {
	let errors = {};

	// Convert empty fields to an empty string so we can use validator functions
	data.email = !isEmpty(data.email) ? data.email : '';
	data.password = !isEmpty(data.password) ? data.password : '';

	// Email checks
	if (validator.isEmpty(data.email)) {
		errors.email = 'Email field is required';
	} else if (!validator.isEmail(data.email)) {
		errors.email = 'Email is invalid';
	}

	// Password checks
	if (validator.isEmpty(data.password)) {
		errors.password = 'Password field is required';
	}
	return {
		errors,
		isValid: isEmpty(errors),
		data
	};
}

	// const { errors, isValid, user  } = validateLoginRequest(req.body);

	// let errors = [];

	// if (!user.email || !user.userName) {
	// 	errors.push({
	// 		candidate: [ user.email, user.userName ],
	// 		msg: 'Invalid userName or password'
	// 	});
	// }

	// if (!user.password) {
	// 	errors.push({
	// 		candidate: user.password,
	// 		msg: 'Not a valid password'
	// 	});
	// }


module.exports = {
	validateUserInput,
	validateParkInput,
	// validateUpdateInput,
	validateLoginInput
};
