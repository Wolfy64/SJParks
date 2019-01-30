/*jshint esversion: 6 */
const db = require('../models');
const validator = require('validator');
const isEmpty = require('is-empty');

function validateUserInput(data) {
	data.access = !isEmpty(data.access) ? data.access : 'basic';
	data.userName = !isEmpty(data.userName) ? data.userName : '';
	data.password = !isEmpty(data.password) ? data.password : '';
	data.name = !isEmpty(data.name) ? data.name : '';
	data.phone = !isEmpty(data.phone) ? data.phone : '';
	data.email = !isEmpty(data.email) ? data.email : '';
	data.addPark = !isEmpty(data.addPark) ? data.addPark : '';
	data.addMessage = !isEmpty(data.addMessage) ? data.addMessage : '';

	let errors = [];

	// Name checks
	if (validator.isEmpty(data.name)) {
		errors.push(new Error({ msg: 'Name field is required' }));
	}

	// Phone checks
	if (validator.isEmpty(data.phone)) {
		errors.push(new Error({ msg: 'Phone field is required' }));
	}

	// Email checks
	if (validator.isEmpty(data.email)) {
		errors.push(new Error({ msg: 'Email field is required' }));
	}

	if (!validator.isEmail(data.email)) {
		errors.push(new Error({ msg: 'Email is invalid' }));
	}

	// Password checks';
	if (validator.isEmpty(data.password)) {
		errors.push(new Error({ msg: 'Password field is required' }));
	}

	// Access checks
	if (!validator.isAlphanumeric(data.access)) {
		errors.push(new Error({ msg: 'Acces must be alphanumeric' }));
	}
	
	if (!validator.isMobilePhone(data.phone)) {
		errors.push(new Error({ msg: 'Phone is invalid' }));
	}

	if (
		!validator.isLength(data.password, {
			min: 6,
			max: 30
		})
	)
		errors.push(new Error({ msg: 'Password must be at least 6 and no more than 30 characters in length' }));

	// find a user
	db.User
		.findOne({
			userName: data.userName,
			phone: data.phone,
			email: data.email
		})
		.then((userFound) => {
			if (userFound) {
			}
			errors.push(
				new Error({
					msg: `Derp! User already exists!`
				})
			);
		});

	return {
		errors,
		isValid: errors.length === 0,
		data
	};
}

function validateParkInput(props) {
	let queries = [];
	let errors = [];
	const data = {};

	data.name = !isEmpty(props.name)?  props.name: '';
	data.code = !isEmpty(props.code) ? props.code : '';
	queries.push({ name: data.name, code: data.code });
	data.subscriptionLog = !isEmpty(props.subscriptionLog) ? props.subscriptionLog : '';
	if(!data.subscriptionLog.parkId)queries.push({park: data.subscriptionLog.parkId});
	data.messageLog = !isEmpty(props.messageLog) ? props.messageLog : '';
	if(data.messageLog.)
	if (validator.isEmpty(data.name)) {
		errors.push(new Error({ msg: 'Name field is required' }));
	}

	if (validator.isEmpty(data.code)) {
		errors.push(new Error({ msg: 'A Park Code is required' }));
	}

	if (validator.isEmpty(data.subscriptionLog)) {
		data.subscriptionLog = [];
	}

	if (validator.isEmpty(data.messageLog)) {
		data.messageLog = [];
	}

	db.SubscriptionLog.findOne(query);

	db.Park
		.findOne({ name: data.name, code: data.code })
		.then((park) => {
			errors
				.push(new Error({ msg: `A park named ${data.name} with code: ${data.code} was found` })
				);
		}).catch((err) => console.error(err));
	

	return {
		errors,
		isValid: errors.length === 0,
		data
	};
}

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

module.export = {
	validateUserInput,
	validateParkInput
};
