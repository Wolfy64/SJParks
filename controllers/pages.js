const path = require('path');
// Render a form to send an MMS message
exports.showForm = function(request, response) {
    response.sendFile(path.join(__dirname + '/..' + '/public/html/admin.html'));
};

exports.aboutPage = function(request, response) {
    response.sendFile(path.join(__dirname + '/..' + '/public/html/about.html'));
};

// Render a form to collect Login Information and grant access to site
exports.loginform = function(request, response) {
    // Render form, with any success or error flash messages
    response.sendFile(path.join(__dirname + '/..' + '/public/html/login.html'));
};

exports.reactDashboard = function(request, response) {
    // Render form, with any success or error flash messages
    response.sendFile(path.join(__dirname + '/..' + '/client/public/index.html'));
};