
function index(req, res){
  res.json({
    message: "Welcome to the San Jose Parks App! Here is some information about its api:",
    documentationUrl: "https://github.com/irishka2863/SJParks/blob/master/README.md",
    baseUrl: "https://github.com/irishka2863/SJParks/",
    endpoints: [{
        method: "GET",
        path: "/api",
        description: "Describes all available endpoints"
      },

      // app controller endpoints
      {
        method: "POST",
        path: "/api/login",
        description: "Log user in"
      },
      {
        method: "POST",
        path: "/api/login/out",
        description: "Log-out user"
      },
      {
        method: "POST",
        path: "/api/"
      },

      // User Endpoints
      {
        method: "GET",
        path: "/api/user",
        description: "Get all users"
      },
      {
        method: "POST",
        path: "/api/user",
        description: "Create a new user"
      },
      {
        method: "PUT",
        path: "/api/user/update/:id",
        description: "Update a user by id"
      },
      {
        method: "DELETE",
        path: "/api/user/delete/:id",
        description: "Delete a user by id"
      },

      // Park Endpoints
      {
        method: "GET",
        path: "/api/park",
        description: "Get all parks"
      },
      {
        method: "POST",
        path: "/api/park",
        description: "Create a new park"
      },
      {
        method: "PUT",
        path: "/api/park/update/:id",
        description: "Update a park by id"
      },
      {
        method: "DELETE",
        path: "/api/park/delete/:id",
        description: "Delete a park by id"
      },

      // Message Endpoints
      {
        method: "GET",
        path: "/api/message",
        description: "Get all messages"
      },

      // MessageLog Endpoint
      {
        method: "GET",
        path: "/api/messageLog",
        description: "Get all messageLogs"
      },

      // SubscriptionLog Endpoint
      {
        method: "GET",
        path: "/api/subscriptionLog",
        description: "Get all subscriptionLogs"
      },
    ]
  });
}

module.exports = {
  index: index
}
