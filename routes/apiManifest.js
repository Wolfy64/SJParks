module.exports = {
	name: "SJParks Endpoints",
	version: "2.0.1",
	message: "Welcome to the San Jose Parks App! Here is some information about its api:",
	documentationUrl: "https://github.com/irishka2863/SJParks/blob/master/README.md",
	"baseUrl": "https://github.com/irishka2863/SJParks/",
	"legend": {
		"route": "/api/Model || /[index]/Action || /Page",
		"method": "GET || POST || PUT || DELETE",
		"desc": "String",
		"params": {},
		"function": "api.AwesomeController.coolFunction",
		"response": {
			"type": "JSON || HMTL",
			"genMethod": "SERVER || REDIRECT || RENDER"
		}
	},
	"routes": [
		{
			
			"route": "/api/parks",
			"method": "GET",
			"desc": "Fetch the list of all parks in JSON format",
			"params": {},
			"function": "api.parks.index",
			"response": {
				"type": "JSON",
				"genMethod": "SERVER",
				"WIP": false
			}
		},
		{
			"WIP": true,
			"route": "/api/subscribe",
			"method": "POST",
			"desc": "Subscribe a phone to a list of parks.",
			"params": {
				"phone": "string",
				"addParks": [
					"park1._id",
					"park2._id",
					"..."
				],
				"subscribed": true
			},
			"function": "api.subscriptionLog.subscribe",
			"response": {
				"type": "JSON",
				"genMethod": "SERVER"
			}
		},
		{
			"route": "views/login",
			"method": "GET",
			"desc": "This will redirect the site to the login page.",
			"params": {},
			"functions": "views.login",
			"response": {
				"type": "HTML",
				"genMethod": "REDIRECT"
			}
		},
		{
			"route": "admin/login",
			"method": "POST",
			"desc": "This will authenticate a user provided userName/phone/email and password.",
			"params": {
				"userName": "AReallyCoolUserName",
				"password": "SomeSecurePassword"
			},
			"functions": "api.user.login",
			"response": {
				"type": "JSON",
				"genMethod": "SERVER"
			}
		},
		{
			"route": "/admin/logout",
			"method": "GET",
			"desc": "This will logout current user (i.e. destroy session) and redirect to login page",
			"params": {},
			"functions": "api.user.logout",
			"response": {
				"type": "HTML",
				"genMethod": "REDIRECT"
			}
		},
		{
			"route": "/views/admin/adminId",
			"method": "GET",
			"desc": "Redirects @adminId to main admin page. Admin credentials required.",
			"params": {},
			"function": "views.dashboard",
			"response": {
				"type": "HMTL",
				"genMethod": "REDIRECT"
			}
		},
		{
			"route": "/api/messages",
			"method": "GET",
			"desc": "Fetches the index of all messages; both messages recieved and messages sent",
			"params": {},
			"function": "api.users.getAllMessages",
			"response": {
				"type": "JSON",
				"genMethod": "SERVER"
			}
		},
		{
			"route": "/api/parks/:parkId/subscribers",
			"method": "GET",
			"desc": "Retrives the list of every user currently subscribed to @parkId, each in JSON format",
			"params": {},
			"function": "api.parks.getAllSubscribers",
			"response": {
				"type": "JSON",
				"genMethod": "SERVER"
			},
			"WIP": false
		},
		{
			"route": "/api/users/:userId/parks",
			"method": "GET",
			"desc": "Retrives the list of every park to which @userId is currently subscribed, each in JSON format",
			"params": {},
			"function": "api.users.getAllparks",
			"response": {
				"type": "JSON",
				"genMethod": "SERVER"
			},
			"WIP": false
		},
		{
			"route": "/api/users/:userId/messages",
			"method": "GET",
			"desc": "Retrives the list of every message that @userId has ever sent or recieved",
			"params": {},
			"function": "api.parks.getAllSubscribers",
			"response": {
				"type": "JSON",
				"genMethod": "SERVER"
			}
		},
		{
			"route": "/api/messages",
			"method": "POST",
			"desc": "Creates a new message object.",
			"params": {},
			"function": "api.messages.create",
			"response": {
				"type": "JSON",
				"genMethod": "SERVER"
			}
		},
		{
			"route": "/api/messages/:messageId",
			"method": "POST",
			"desc": "Sends a message object to user through twilio.",
			"params": {},
			"function": "api.messages.send",
			"response": {
				"type": "JSON",
				"genMethod": "SERVER"
			}
		},
		{
			"route": "view/admin/parks",
			"method": "GET",
			"desc": "Redirect ",
			"params": {},
			"function": "views.dashboard",
			"response": {
				"type": "HTML",
				"genMethod": "RENDER"
			}
		},
		{
			"route": "api/parks",
			"method": "POST",
			"desc": "Create a new park ",
			"params": {
				"newName": {
					"type": "string"
				},
				"newCode": {
					"type": "string"
				}
			},
			"function": "api.parks.create",
			"response": {
				"type": "JSON",
				"genMethod": "SERVER"
			}
		},
		{
			"route": "api/parks/:parkId",
			"method": "DELETE",
			"desc": "Delete @parkId from DB ",
			"params": {},
			"function": "api.parks.destroy",
			"response": {
				"type": "JSON",
				"genMethod": "SERVER"
			}
		},
		{
			"route": "api/parks/:parkId",
			"method": "DELETE",
			"desc": "Create a new park ",
			"params": {},
			"function": "api.parks.destroy",
			"response": {
				"type": "JSON",
				"genMethod": "SERVER"
			}
		},
		{
			"route": "/admin/users",
			"method": "GET",
			"desc": "Retrive the index of all users ",
			"params": {},
			"function": "api.users.index",
			"response": {
				"type": "JSON",
				"genMethod": "SERVER"
			},
			"WIP": false
		},
		{
			"route": "/admin/users",
			"method": "POST",
			"desc": "Create a new user ",
			"params": {
				"name": "Berhard Riemann",
				"userName": "TheThunderGod",
				"phone": "123-456-7890",
				"email": "ThugLyfe@azur.com",
				"password": "SomeSecurePassword",
				"access": "phoneOnly || PREMIUM || ADMIN"
			},
			"function": "api.users.register",
			"response": {
				"type": "JSON",
				"genMethod": "SERVER"
			},
			"WIP": false
		},
		{
			"route": "/admin/users/:userName",
			"method": "DELETE",
			"desc": "Delete a user by userName ",
			"params": {
				"userName": "AReallyCoolUserName"
			},
			"function": "api.users.destroy",
			"response": {
				"type": "JSON",
				"genMethod": "SERVER"
			},
			"WIP": false
		},
		{
			"route": "/admin/users/:userId",
			"method": "GET",
			"desc": " REad a @userId's information ",
			"params": {},
			"function": "api.users.read",
			"response": {
				"type": "JSON",
				"genMethod": "SERVER"
			},
			"WIP": false
		},
		{
			"route": "/admin/users/:userId/uploadImage",
			"method": "POST",
			"desc": " Uploads a @userId's profile image to Cloudinary and stores url reference in User object",
			"params": {
				"type": "imageObject.url"
			},
			"function": "api.users.uploadImage",
			"response": {
				"type": "JSON",
				"genMethod": "SERVER"
			},
			"WIP": false
		},
		{
			"route": "/admin/users/:userId/contact",
			"method": "PUT",
			"desc": " Update a @userId's contact information & password",
			"params": {
				"name": "Berhard Riemann",
				"phone": "123-456-7890",
				"email": "ThugLyfe@azur.com",
				"password": "SomeSecurePassword"
			},
			"function": "api.users.update",
			"response": {
				"type": "JSON",
				"genMethod": "SERVER"
			},
			"WIP": false
		},
		{
			"method": "GET",
			"path": "/api",
			"description": "Describes all available endpoints"
		},
	
		{
			"method": "POST",
			"path": "/api/login",
			"description": "Log user in"
		},
		{
			"method": "POST",
			"path": "/api/login/out",
			"description": "Log-out user"
		},
		{
			"method": "POST",
			"path": "/api/"
		},
		{
			"method": "GET",
			"path": "/api/user",
			"description": "Get all users"
		},
		{
			"method": "POST",
			"path": "/api/user",
			"description": "Create a new user"
		},
		{
			"method": "PUT",
			"path": "/api/user/update/:id",
			"description": "Update a user by id"
		},
		{
			"method": "DELETE",
			"path": "/api/user/delete/:id",
			"description": "Delete a user by id"
		},
		{
			"method": "GET",
			"path": "/api/park",
			"description": "Get all parks"
		},
		{
			"method": "POST",
			"path": "/api/park",
			"description": "Create a new park"
		},
		{
			"method": "PUT",
			"path": "/api/park/update/:id",
			"description": "Update a park by id"
		},
		{
			"method": "DELETE",
			"path": "/api/park/delete/:id",
			"description": "Delete a park by id"
		},
		{
			"method": "GET",
			"path": "/api/message",
			"description": "Get all messages"
		},
		{
			"method": "GET",
			"path": "/api/messageLog",
			"description": "Get all messageLogs"
		},
		{
			"method": "GET",
			"path": "/api/subscriptionLog",
			"description": "Get all subscriptionLogs"
		}
	]
};
