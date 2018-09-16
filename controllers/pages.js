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
            <input type="checkbox" name="parkID" value="hack" style="display:none" checked><br>
            <input type="checkbox" name="parkID" value="park1"> Park1<br>
            <input type="checkbox" name="parkID" value="park2"> Park2<br>
            <input type="checkbox" name="parkID" value="park3"> Park3<br>
            <textarea rows="4" cols="50" id="message" name="message"></textarea>
            <input type="submit" class="send-message" id="send_message">
        </form>
    </body>
</html>`
);
};

<<<<<<< HEAD
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

=======
>>>>>>> Login page
// Render a form to collect Login Information and grant access to site
exports.loginform = function(request, response) {
    // Render form, with any success or error flash messages
    console.log('calling loginform');
    response.send(`
<html>
    <head>
        <title>Administrator Login</title>
<<<<<<< HEAD
         <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
            body {font-family: Arial, Helvetica, sans-serif;}
            form {border: 3px solid #f1f1f1;}
             input[type=text], input[type=password] {
=======

        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
            body {font-family: Arial, Helvetica, sans-serif;}
            form {border: 3px solid #f1f1f1;}

            input[type=text], input[type=password] {
>>>>>>> Login page
                width: 100%;
                padding: 12px 20px;
                margin: 8px 0;
                display: inline-block;
                border: 1px solid #ccc;
                box-sizing: border-box;
            }
<<<<<<< HEAD
             button {
=======

            button {
>>>>>>> Login page
                background-color: #4CAF50;
                color: white;
                padding: 14px 20px;
                margin: 8px 0;
                border: none;
                cursor: pointer;
                width: 100%;
            }

            button:hover {
                opacity: 0.8;
            }

            .cancelbtn {
                width: auto;
                padding: 10px 18px;
                background-color: #f44336;
            }

            .imgcontainer {
                text-align: center;
                margin: 24px 0 12px 0;
            }

            img.avatar {
                width: 40%;
                border-radius: 50%;
            }

            .container {
                padding: 16px;
            }

            span.psw {
                float: right;
                padding-top: 16px;
            }

            /* Change styles for span and cancel button on extra small screens */
            @media screen and (max-width: 300px) {
                span.psw { 
                    display: block;
                    float: none;
                }
                .cancelbtn {
                    width: 100%;
                }
            }
        </style>
    </head>

    <body>    
    <form action="/admin">
      <div class="imgcontainer">
        <img src="/img/logo.jpg" alt="Logo" class="avatar">
      </div>
    
      <div class="container">
        <label for="uname"><b>Username</b></label>
        <input type="text" placeholder="Enter Username" name="uname" required>
    
        <label for="psw"><b>Password</b></label>
        <input type="password" placeholder="Enter Password" name="psw" required>
            
        <button type="submit" >Login</button>
      </div>
    
      <div class="container" style="background-color:#f1f1f1">
        <button type="button" class="cancelbtn">Cancel</button>
        <span class="psw">Forgot <a href="#">password?</a></span>
      </div>
    </form>
    
    </body>
</html>`
);
};
