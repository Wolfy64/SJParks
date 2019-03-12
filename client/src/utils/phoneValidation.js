import { regex } from '../config/regex';
export default phoneNum => regex.phone.test(phoneNum);
