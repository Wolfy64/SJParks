const pages = require('./pages');
const message = require('./messageIncoming');
const login = require('./login');
const admin = require('./admin');

// Map routes to controller functions
module.exports = function(app) {
  
  //------------------------------------------------------------------------
  //****************************** REACT ROUTER ******************************
  //------------------------------------------------------------------------
  console.log('>>>>>>', process.env);
  if(process.env.NODE_ENV==='production') {
      console.log('>>>>>>> running production build');  
      app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "client", "build", "index.html"));
      })
  } else {
      console.log('>>>>>> running development build');
      app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "client", "public", "index.html"));
      })
  }
  console.log('...build complete');
  //------------------------------------------------------------------------
  //****************************** ABOUT PAGE ******************************
  //------------------------------------------------------------------------

  // Render a userResident page about the project to find out more
  //app.get('/', pages.aboutPage);

  //------------------------------------------------------------------------
  //****************************** LOGIN PAGE ******************************
  //------------------------------------------------------------------------

  // Render login page
  //app.get('/login', pages.loginPage);

  // Handle sign in
  app.post('/login', login.validate);

  // Handle logout
  app.post('/login/out', login.logout);

  //------------------------------------------------------------------------
  //**************************** DASHBOARD PAGE ****************************
  //------------------------------------------------------------------------

  // Render the general public Dashboard/console
  //app.get('/dashboard', login.requireUserLogin, pages.dashboardPage);

  //------------------------------------------------------------------------
  //****************************** ADMIN PAGE ******************************
  //------------------------------------------------------------------------

  // Render the Administrator Dashboard/console
  //app.get('/admin', login.requireAdminLogin, pages.adminPage); //

  // Handle new user form submission
  app.post('/admin/newuser', admin.newUser);

  // Handle new park form submission
  app.post('/admin/newpark', admin.createPark);

  //DEVELOPER TOOL
  //app.get('/admin/peek', admin.peek);

  //------------------------------------------------------------------------
  //*************************** MESSAGE HANDLING ***************************
  //------------------------------------------------------------------------

  // Twilio SMS webhook route
  app.post('/message', message.webhook);

  // Handle form submission and send messages to subscribers
  app.post('/admin/send_message', admin.sendMessages);
};