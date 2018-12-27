/**
 * Check if form has Errors OR if data is Empty
 * @param {object} formErrors - The formErrors from state form
 * @param {object} data - The data to send
 * @returns {boolean}
 */
const isFormValid = (formErrors, data) => {
  let isValid = false;

  if (formErrors && data) {
    // If no error return False
    const hasError = !Object.values(formErrors).every(el => el === false);
    // If empty return True
    const isEmpty = !Object.values(data).every(el => el.length > 0);

    return !hasError && !isEmpty;
  }

  return isValid;
};

export default isFormValid;
