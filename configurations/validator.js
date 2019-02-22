/*jshint esversion: 8 */
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
	return new Promise(async (resolve, reject) => {
		console.log('> [12:20] Begin user Validation');
		const errors = [];
		const data = {};
		const queries = {};

		// prepare data
		console.log('> [18:19] Preparing Data');
		data.access = !isEmpty(props.access) ? props.access : 'basic';
		data.userName = !isEmpty(props.userNames) ? props.userName : '';
		data.password = !isEmpty(props.password) ? props.password : '';
		data.name = !isEmpty(props.name) ? props.name : '';
		data.phone = !isEmpty(props.phone) ? props.phone : '';
		data.email = !isEmpty(props.email) ? props.email : '';
		if (!isEmpty(props.addPark)) {
			queries.park = {};
			const { code, name } = props.addPark;
			if (code) queries.park.code = code;
			if (name) queries.park.name = name;
		}
		if (!isEmpty(props.addUpdate)) {
			queries.update = {};
			const { author, message } = props.addUpdate;
			if (author) queries.update.author = author;
			if (message) queries.update.message = message;
		}

		// prepare validator queries
		console.log('> [32:22] Preparing queries');
		queries.user = {
			userName: data.userName,
			phone: data.phone,
			email: data.email
		};

		if (validator.isEmpty(data.userName)) {
			delete queries.user.userName;
			errors.push(new Error('UserName field is required'));
		}
		if (validator.isEmpty(data.phone)) {
			delete queries.user.phone;
			errors.push(new Error('Phone field is required'));
		}

		if (validator.isEmpty(data.email)) {
			delete queries.user.email;
			errors.push(new Error('Email field is required'));
		}

		const user = await db.User.findOne(queries.user).catch(err => console.error(err));
		if (user) errors.push(new Error('Derp! this user already exists'));

		const park = await db.Park
			.findOne(queries.park)
			.catch(err => errors.push(new Error('We had trouble finding that that park')));
		if (park) data.parks = [park];

		const update = await db.Update
			.findOne(queries.update)
			.catch(err => errors.push(new Error('We had trouble finding that that update')));
		if (update) data.updates = [update];

		if (validator.isEmpty(data.password)) {
			errors.push(new Error('Password field is required'));
		}

		data.queries = queries;

		if (
			!validator.isLength(data.password, {
				min: 6,
				max: 30
			})
		) {
			errors.push(new Error('Password must be at least 6 and no more than 30 characters in length'));
		}

		// misc validator checks
		if (!validator.isAlphanumeric(data.access)) {
			errors.push(new Error('Access must be alpha-numeric'));
		}

		if (!validator.isMobilePhone(data.phone)) {
			errors.push(new Error('Phone is invalid'));
		}

		const isValid = isEmpty(errors);
		if (isValid) {
			resolve({ isValid, data });
		} else {
			reject({ isValid, errors });
		}
	});
}

/**
 * Validates park input provided by an HTTP_request object
 * @function validateParkInput 
 * @param {request.body} props
 * @public
 */
function validateParkInput(props) {
	console.log('> validating park');
	const errors = [];
	const data = {};
	const queries = {};

	// prepare data
	console.log('> Preparing Data');
	data.name = !isEmpty(props.newName) ? props.newName : '';
	data.code = !isEmpty(props.newCode) ? props.newCode : '';
	if (!isEmpty(props.addSubscriptionLog)) {
		queries.subscriptionLog = {};
		const { name, blah } = props.addSubscriptionLog;
		if (code) queries.park.code = code;
		if (name) queries.park.name = name;
	}
	if (!isEmpty(props.addMessageLog)) {
		// queries.MessageLog = { parks: { $eq: props.addMessageLog.parkId } };
		const { name, blah } = props.addMessageLog;
		if (code) queries.park.code = code;
		if (name) queries.park.name = name;
	}

	// prepare validator queries
	console.log('> Preparing queries');
	// queries.SubscriptionLog = { park: { $eq: { _id: props.addSubscriptionLog.parkId } } };

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

module.exports = {
	validateUserInput,
	validateParkInput,
	validateLoginInput
};

/*
const validateEmail = (email, errorMessage) => {
	let emailPatternReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
	if (!emailPatternReg.test(email)) {
			errorMessage += 'Please enter a valid email\n'
	}
	return errorMessage
}

export {
	validateEmail,
}
*/
