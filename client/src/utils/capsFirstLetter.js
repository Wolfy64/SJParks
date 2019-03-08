/*jshint esversion: 8 */
const capsFirstLetter = word => {
  const firstLetter = word.split('')[0].toUpperCase();
  return word.toLowerCase().replace(/^./, firstLetter);
};

export default capsFirstLetter;
