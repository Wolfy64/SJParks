
const crypto = require('crypto');

exports.getPasswordHash = function(password, salt){
    return crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex');
};

exports.getSalt = function() { return crypto.randomBytes(16).toString('hex'); }
