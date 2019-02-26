/*jshint esversion: 8 */
const db = require('../models');
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
			console.log(`> [27:25] queries.park:${props.addPark}`);
			queries.park = {};
			const { code, name } = props.addPark;
			if (code) queries.park.code = code;
			if (name) queries.park.name = name;
		}

		if (!isEmpty(props.addUpdate)) {
			console.log(`> [35:26] props.addUpdate:${props.addUpdate}`);
			queries.update = {};
			const { author, message } = props.addUpdate;
			if (author) queries.update.author = author;
			if (message) queries.update.message = message;
		}

		// prepare validator queries
		console.log('> [042:25] Preparing queries');
		queries.user = {
			userName: data.userName,
			phone: data.phone,
			email: data.email
		};
		console.log(`> [49:24] Find a user By(${queries.user})`);

		if (validator.isEmpty(data.userName)) {
			console.log(`> [049:25] userName:${data.userName}`);
			delete queries.user.userName;
			errors.push(new Error('UserName field is required'));
			console.log(`> [049:25] There are now ${errors.length} errors. ${errors[errors.length - 1]}`);
		}

		if (validator.isEmpty(data.phone)) {
			console.log(`> [054:25] phone:${data.phone}`);
			delete queries.user.phone;
			errors.push(new Error('Phone field is required'));
			console.log(`> [054:25] There are now ${errors.length} errors. ${errors[errors.length - 1]}`);
		}

		if (validator.isEmpty(data.email)) {
			console.log(`> [060:25] email:${data.email}`);
			delete queries.user.email;
			errors.push(new Error('Email field is required'));
			console.log(`> [060:25] There are now ${errors.length} errors. ${errors[errors.length - 1]}`);
		}

		if (validator.isEmpty(data.password)) {
			console.log(`> [066:25] password ${data.password}`);
			errors.push(new Error('Password field is required'));
			console.log(`> [066:25] There are now ${errors.length} errors. ${errors[errors.length - 1]}`);
		}

		if (
			!validator.isLength(data.password, {
				min: 6,
				max: 30
			})
		) {
			console.log(`> [089:25] password ${data.password}`);
			errors.push(new Error('Password must be at least 6 and no more than 30 characters in length'));
			console.log(
				`> [089:25] There are now ${errors.length} errors. The newest is: ${errors[errors.length - 1]}`
			);
		}

		if (!validator.isAlphanumeric(data.access)) {
			console.log(`> [099:25] access: ${data.access}`);
			errors.push(new Error('Access must be alpha-numeric'));
			console.log(`There are now ${errors.length} errors. The newest is: ${errors[errors.length - 1]}`);
		}

		if (!validator.isMobilePhone(data.phone)) {
			console.log(`> [104:25] phone: ${data.phone}`);
			errors.push(new Error('Phone is invalid'));
			console.log(
				`> [104:25] There are now ${errors.length} errors. The newest is: ${errors[errors.length - 1]}`
			);
		}

		if (queries.user) {
			const user = await db.User.findOne(queries.user).catch(err => console.error(err));
			console.log(`> [071:25] queries.user:${queries.user}`);
			// console.error(err);
			if (user) {
				if (userId === user._id) {
					data._id = userId;
					delete data.queries.user;
				} else if (userId === null || typeof userId === 'undefined') {
					errors.push(new Error('Derp! this user already exists'));
					console.log(`> [071:25] There are now ${errors.length} errors. ${errors[errors.length - 1]}`);
				}
			} else if (!user && userId === null) {
				
			}
		}

		const park = await db.Park.findOne(queries.park).catch(err => {
			// console.error(err);
			console.log(`> [075:25] queries.park:${queries.park}`);
			errors.push(new Error('We had trouble finding that that park'));
			console.log(`> [075:25] There are now ${errors.length} errors. ${errors[errors.length - 1]}`);
		});
		if (park) {
			data.parks = [park._id];
		} else {
			data.parks = [];
		}

		// const update = await db.Update.findOne(queries.update).catch(err => {
		// 	// console.error(err);
		// 	console.log(`> [081:25] queries.update:${queries.update}`);
		// 	if(!update)errors.push(new Error('We had trouble finding that that update'));
		// 	console.log(`> [081:25] There are now ${errors.length} errors. The newest is: ${errors[errors.length - 1]}`);
		// });
		// if (update) data.updates = [update];

		data.queries = queries;

		const isValid = isEmpty(errors);
		console.log(isValid);
		if (isValid) {
			console.log(`> [111:25] data: ${data}`);
			resolve({ errors, isValid, data });
		} else {
			console.log(`> [114:25] error: ${errors}`);
			reject({ errors, isValid, data });
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
