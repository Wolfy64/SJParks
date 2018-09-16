// Render a form to send an MMS message
exports.showForm = function(request, response) {
    // Render form, with any success or error flash messages
    console.log('calling showForm');
    response.send(`
<html>
    <head>
        <title>Admin Dashboard SJ Parks</title>
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
