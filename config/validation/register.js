/*jshint esversion: 6 */
const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports.validateRegisterInput = data => {
    // Convert empty fields to an empty string so we can use validator functions
    data.access = !isEmpty(data.access) ? data.access : "";
    data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
    data.lastName = !isEmpty(data.lastName) ? data.lastName : "";
    // data.name = !isEmpty(data.name) ? data.name : "";
    data.phone = !isEmpty(data.phone) ? data.phone : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.userName = !isEmpty(data.userName) ? data.userName : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";
    data.addPark = !isEmpty(data.addPark) ? data.addPark : "";
    data.addMessage = !isEmpty(data.addMessage) ? data.addMessage : "";


    let errors = {};

    // Access checks
    if (!Validator.isAlphanumeric(data.access)){
        errors.access = "Acces must be alphanumeric";
    }

    // firstName checks
    if (Validator.isEmpty(data.firstName)) {
        errors.firstName = "Name field is required";
    }

    // lastName checks
    if (Validator.isEmpty(data.lastName)) {
        errors.lastName = "Name field is required";
    }

    // // Name checks
    // if (Validator.isEmpty(data.name)) {
    //     errors.name = "Name field is required";
    // }
    
    // // userName checks

    // Phone checks
    if (Validator.isEmpty(data.phone)) {
        errors.phone = "Phone field is required";
    } else if (!Validator.isMobilePhone(data.phone)) {
        errors.phone = "Phone is invalid";
    }

    // Email checks
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }

    // Password checks';
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }

    // if (Validator.isEmpty(data.password2)) {
    //     errors.password2 = "Confirm password field is required";
    // }

    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = "Passwords must match";
    }

    if (!Validator.isLength(data.password, {
            min: 6,
            max: 30
        })) {
        errors.password = "Password must be at least 6 and no more than 30 characters in length";
    }

    return {
        errors,
        isValid: isEmpty(errors),
        data
    };
};