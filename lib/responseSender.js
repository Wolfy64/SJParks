function respond(res, success, payload, type = 'json', endPoint = '/') {
    const jsonResponse = {success, payload };
	const htmlResponse = `
    <html>
      <head>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>Admin Dashboard - SJParks</title>
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
          <link href="https://fonts.googleapis.com/css?family=Ubuntu" rel="stylesheet">
          <style>
              body{
                  font-family: Ubuntu, sans-serif;
                  margin: 30px 20px;
              }
          </style>
      </head>
      <body>
          <p>${success ? 'Success: Message sent!' : "Error: Couldn't verify the req"}.</p>
          <p>${JSON.stringify(payload)}</p>
          <a class="btn" href="${endPoint}">< Back</a>
      </body>
    </html>`;

	return res.status(success ? 200 : 457).send(type === 'json' ? jsonResponse : htmlResponse);
}

module.exports = {
	respond
};
