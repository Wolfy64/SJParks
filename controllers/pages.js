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
