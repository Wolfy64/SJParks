/*jshint esversion: 6 */
const db = require('../../models');
const validator = require('validator');
const isEmpty = require('is-empty');

module.exports.validateRegisterInput = (data) => {
	// Convert empty fields to an empty string so we can use validator functions
	data.access = !isEmpty(data.access) ? data.access : 'basic';
	data.name = !isEmpty(data.name) ? data.name : '';
	data.phone = !isEmpty(data.phone) ? data.phone : '';
	data.email = !isEmpty(data.email) ? data.email : '';
	data.userName = !isEmpty(data.userName) ? data.userName : '';
	data.password = !isEmpty(data.password) ? data.password : '';
	data.addPark = !isEmpty(data.addPark) ? data.addPark : '';
	data.addMessage = !isEmpty(data.addMessage) ? data.addMessage : '';

	let errors = [];

	// Access checks
	if (!validator.isAlphanumeric(data.access)) {
        errors.push(new Error({ msg: 'Acces must be alphanumeric' }));
	}

	// Name checks
	if (validator.isEmpty(data.name)) {
        errors.push(new Error({ msg: 'Name field is required' }));
	}

	// Phone checks
	if (validator.isEmpty(data.phone)) {
		errors.push(new Error({msg: 'Phone field is required'}));
    }
    
    if (!validator.isMobilePhone(data.phone)) {
		errors.push(new Error({msg: 'Phone is invalid'}));
	}

	// Email checks
	if (validator.isEmpty(data.email)) {
		errors.push(new Error({msg: 'Email field is required'}));
    }
    
    if (!validator.isEmail(data.email)) {
		errors.push(new Error({msg: 'Email is invalid'}));
	}

	// Password checks';
	if (validator.isEmpty(data.password)) {
		errors.push(new Error({msg: 'Password field is required'}));
	}

	if (
		!validator.isLength(data.password, {
			min: 6,
			max: 30
		})
	) {
		errors.push(new Error({msg:'Password must be at least 6 and no more than 30 characters in length'}));
	}

	// find a user
	let user = null;
	db.User
		.findOne({
			userName: data.userName,
			phone: data.phone,
			email: data.email
		})
		.then((userFound) => {
			if (userFound) user = userFound;
		});
	if (user != null) {
		errors.push(new Error({
			msg: `Derp! User already exists!`,
			user
		}));
    }
    
    return {
        errors, isValid: errors.length === 0
    }
};
