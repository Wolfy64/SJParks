const regEx = /^[2-9]\d{2}-\d{3}-\d{4}$/;

const phoneValidation = phoneNum => {
  if (regEx.test(phoneNum)) {
    return true;
  } else {
    return false;
  }
};

phoneValidation();

export default phoneValidation;
