// Render a form to send an MMS message
exports.showForm = function(request, response) {
    // Render form, with any success or error flash messages
    console.log('launching showForm');
    response.send(`
<html>
    <head>
        <title>Admin Dashboard - SJParks</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
        <link href="https://fonts.googleapis.com/css?family=Ubuntu" rel="stylesheet">
        <style>
            body{
                font-family: Ubuntu, sans-serif;
                padding: 20px;
            }
            .wrapper{
                margin: 0 auto;
                max-width: 500px
            }
            h1{
                font-weight: 600;
                font-size: 2.5em;
                text-align: right;
            }
            .header {
                display: flex; 
                flex-direction: column;
                align-items: center;
                justify-content: center;
            }
            .header img {
                width: 100px;
                height: 100px;
                margin: 0 20px;
            }
            .logo{
                display: flex;
                align-items: center;
                justify-content: center;
            }
            textarea{
                margin-top: 20px;
            }
            input{
                margin-top: 5px
            }
        </style>
    </head>

    <body>
        <div class="header">
            <div class="logo"><h1>SJParks</h1>
                <img src="/controllers/img/logo.svg" class="col-md-4" /></div>
            <p>Administrative Dashboard</p>
        </div>
        <hr>
        <section class="wrapper">
        <form action='/message/send' method='POST'>
            <input type="checkbox" name="parkID" value="hack" style="display:none" checked>
            <br>
            <input type="checkbox" name="parkID" value="park1"> Park1<br>
            <input type="checkbox" name="parkID" value="park2"> Park2<br>
            <input type="checkbox" name="parkID" value="park3"> Park3<br>
            <textarea rows="4" cols="50" id="message" name="message"></textarea> <br>
            <input type="submit" class="btn btn-success send-message" id="send_message">
        </form>
        </section>
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
            .wrapper{
                max-width: 900px;
                margin: 0 auto;
            }
            h1{
                font-weight: 600;
                font-size: 2.5em;
                text-align: center;
            }
            h2{
                font-weight: 600;
                font-size: 2.5em;
                text-align: center;
                margin-bottom: 30px;
            }
            .jumbo{
                background-color: rgba(92, 178, 5, 0.5);
                background-blend-mode: screen;
                padding: 20px;
                color: white;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                height: 70vh;
            }
            .jumbo-image{
                background-image: url(/controllers/img/robert-collins-333411-unsplash.jpg);
                background-size: cover;
                background-attachment: scroll;
            }
            .container{
                margin: 100px 0;
            }
            .screenshot{
                display: flex;
                justify-content: center;
                align-content: center;
            }
            .screenshot img{
                margin-top: 30px;
                max-height: 400px;
            }
            li{
                margin-top: 10px;
            }
            .feedback{
                display: flex;
                flex-direction: column;
                align-items: center;
                text-align: center;
            }
            
        </style>
    </head>

    <body>
        <section class="jumbo-image">
            <div class="jumbo">
                <img src="controllers/img/tree-42476.svg" style="width: 80px">
                <h1 class="">SJParks</h1>
                <hr style="width: 30%; border-color: #F9F9F9">
                <p class="tag">Informed is involved</p>
            </div>
        </section>
        
        <div class="wrapper">
        <section class="row about container">
            <div class="col-md-7">
                <h2>Text Notification Service</h2>
                <p>Have you visited the park only to find out that it is closed for maintenance, or even worse, open and unsafe? We provide a solution for you to stay informed.</p> 
                <p>All it takes is a keyword of the park, and you're in to receive instant updates.</p>
            </div>
            <div class="col-md-4 screenshot">
                <img src="controllers/img/screenshot1.png">
            </div>
            
        </section>
        <section class="row about container">
            <div class="col-md-4">
                <h2>Why subscribe?</h2>
                <ol>
                    <li>Urgent updates come to your phone directly from San Jose Parks Administration.</li>
                    <li>Know about events at the parks you plan to visit.</li>
                    <li>Get involved in San Jose community.</li>
                </ol>
            </div>
        </section>
        <hr>
        <section class="locations container">
            <p class=""></p> 
            <p>Currently, the project is in development stage. On-ground testing is going to launch on September 29, 2018</p>
            
        </section>
        <hr>
        <section class="feedback container">
            <p class="">Got feedback? We'd love to hear from you!</p> 
            <a href="https://goo.gl/forms/FRNp5ZGnJHeyvCrT2" class="btn btn-success">Launch the Survey</a>
        </section>
        </div>
    </body>
</html>`
);
};

// Render a form to collect Login Information and grant access to site
exports.loginform = function(request, response) {
    // Render form, with any success or error flash messages
    console.log('calling loginform');
    response.send(`
<html>
    <head>
        <title>Administrator Login</title>
         <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
            body {font-family: Arial, Helvetica, sans-serif;}
            form {border: 3px solid #f1f1f1;}
             input[type=text], input[type=password] {
                width: 100%;
                padding: 12px 20px;
                margin: 8px 0;
                display: inline-block;
                border: 1px solid #ccc;
                box-sizing: border-box;
            }
             button {
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
                width: 30%;
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
        <img src="controllers/img/logo.svg" alt="Logo" class="avatar">
      </div>
    
      <div class="container">
        <label for="uname"><b>Username</b></label>
        <input type="text" placeholder="Enter Username" name="uname" required>
    
        <label for="psw"><b>Password</b></label>
        <input type="password" placeholder="Enter Password" name="psw" required>
            
        <button type="submit" >Login</button>
      </div>
    
      <div class="container" style="background-color:#f1f1f1">
        <button type="button" class="cancelbtn" style="display: none">Cancel</button>
        <span class="psw" style="display: none">Forgot <a href="#">password?</a></span>
      </div>
    </form>
    
    </body>
</html>`
);
};