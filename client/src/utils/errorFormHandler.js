import { msgErr } from '../config/messages';
import { regex } from '../config/regex';

/**
 * Check Input Error
 * @param {String} type - The Input Type.
 * @param {*} value - The Input Value.
 * @param {Array} options - The Inout options List.
 * @returns {False || String} - False if any error OR the String of the error.
 */
const errorFormHandler = (type, value, options) => {
  let error = false;

  // If there is an error return the error message
  switch (type) {
    case 'text':
      value.length < 3 && (error = msgErr.text);
      break;
    case 'email':
      !RegExp(regex.mail).test(value) && (error = msgErr.mail);
      break;
    case 'tel':
      !RegExp(regex.phone).test(value) && (error = msgErr.phone);
      break;
    case 'password':
      value.length < 6 && (error = msgErr.pass);
      break;
    case 'select':
      !Object.keys(options).find(el => el === value) && (error = msgErr.select);
      break;
    case 'textarea':
      value.length < 10 && (error = msgErr.textarea);
      break;
    default:
      error = msgErr.form;
      break;
  }

  return error;
};

export default errorFormHandler;
