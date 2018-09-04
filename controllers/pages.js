// Render a form to send an MMS message
exports.showForm = function(request, response) {
    // Render form, with any success or error flash messages
    console.log('calling showForm');
    response.send(`<html>
	   <head>
	      <title>File Uploading Form</title>
	   </head>

	   <body>
	      <h1>WTF?</h1>
	      
	      
	   </body>
	</html>`
	);
};
