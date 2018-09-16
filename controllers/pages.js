// Render a form to send an MMS message
exports.showForm = function(request, response) {
    // Render form, with any success or error flash messages
    console.log('launching showForm');
    response.send(`
<html>
    <head>
        <title>Admin Dashboard - SJParks</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">
    </head>

    <body>
        <h1>SJParks</h1>
        <form action='/message/send' method='POST'>
            <input type="checkbox" name="parkID" value="PARK1"> Park1<br>
            <input type="checkbox" name="parkID" value="PARK2"> Park2<br>
            <textarea rows="4" cols="50" id="message" name="message"></textarea>
            <input type="submit" class="send-message" id="send_message">
        </form>
    </body>
</html>`
);
};

exports.aboutPage = function(request, response) {
    // Render form, with any success or error flash messages
    console.log('launching aboutPage');
    response.send(`
<html>
    <head>
        <title>SJ Parks</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
        <link href="https://fonts.googleapis.com/css?family=Ubuntu" rel="stylesheet">
        <style>
            body{
                font-family: Ubuntu, sans-serif;
            }
            h1{
                font-weight: 600;
            }
            .jumbotron{
                background-color: darkgreen;
                padding: 20px;
                color: white;
            }
            
        </style>
    </head>

    <body>
        <section class="jumbotron">
        <h1 class="centered">SJParks</h1>
        <div class="container">
            <p class="">Have you visited the park only to find out that it is closed for maintenance, or even worse, open and unsafe? We provide a solution for you to stay informed about...</p> 
            <ol>
                <li>Urgent updates that instantaniously come directly from San Jose Parks Administration.</li>
                <li>Events at the parks that you subscribed to by texting the keyword to (831) 777-4596.</li>
            </ol>
            <p>Get involved in San Jose community!</p>
        </div>
        </section>
    </body>
</html>`
);
};
