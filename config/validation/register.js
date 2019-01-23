/*jshint esversion: 6 */
const validator = require("validator");
const isEmpty = require("is-empty");

module.exports.validateRegisterInput = data => {
    // Convert empty fields to an empty string so we can use validator functions
    data.access = !isEmpty(data.access) ? data.access : "";
    data.name = !isEmpty(data.name) ? data.name : "";
    data.phone = !isEmpty(data.phone) ? data.phone : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.userName = !isEmpty(data.userName) ? data.userName : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";
    data.addPark = !isEmpty(data.addPark) ? data.addPark : "";
    data.addMessage = !isEmpty(data.addMessage) ? data.addMessage : "";


    let errors = {};

    // Access checks
    if (!validator.isAlphanumeric(data.access)){
        errors.access = "Acces must be alphanumeric";
    }

    // Name checks
    if (validator.isEmpty(data.name)) {
        errors.name = "Name field is required";
    }
    
    // // userName checks

    // Phone checks
    if (validator.isEmpty(data.phone)) {
        errors.phone = "Phone field is required";
    } else if (!validator.isMobilePhone(data.phone)) {
        errors.phone = "Phone is invalid";
    }

    // Email checks
    if (validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    } else if (!validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }

    // Password checks';
    if (validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }

    // if (validator.isEmpty(data.password2)) {
    //     errors.password2 = "Confirm password field is required";
    // }

    if (!validator.equals(data.password, data.password2)) {
        errors.password2 = "Passwords must match";
    }

    if (!validator.isLength(data.password, {
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