/* 
 * A list of functions that connect HTML5 pages to 
 * the router's GET requests.
 */

const path = require('path');

exports.adminDashboard = function(request, response) {
    response.sendFile(path.join(__dirname + '/..' + '/public/html/admin.html'));
};

exports.aboutPage = function(request, response) {
    response.sendFile(path.join(__dirname + '/..' + '/public/html/about.html'));
};

// Render a form to collect Login Information and grant access to site
exports.loginForm = function(request, response) {
// Render form, with any success or error flash messages
    response.sendFile(path.join(__dirname + '/..' + '/public/html/login.html'));
};
