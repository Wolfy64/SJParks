# SJParks Endpoints API

**version: "2.0.1"**

# API Endpoints

`/api`

`GET` Describes all available endpoints

---

`/api/login`

`POST` Log user in

---

`/api/login/out`

`POST` Log-out user

---

`/api/park`

`GET` Get all parks

`POST` Create a new park

---

`/api/park/update/:id`

`PUT` Update a park by id

---

`/api/park/delete/:id`

`DELETE` Delete a park by id

---

`api/parks`

`GET` Fetch the list of all parks in JSON format

`POST` Create a new park

---

`api/parks/:parkId`

`DELETE` Delete @parkId from DB

---

`/api/parks/:parkId/subscribers`

`GET` Retrives the list of every user currently subscribed to @parkId, each in JSON format

---

`/api/message`

`GET` Get all messages

`/api/messages`

`GET` Fetches the index of all messages; both messages recieved and messages sent

`POST` Creates a new message object

---

`/api/messages/:messageId`

`POST` Sends a message object to user through twilio

---

`/api/messageLog`

`GET` Get all messageLogs

---

`/api/user`

`GET` Get all users

`POST` Create a new user

---

`/api/user/update/:id`

`PUT` Update a user by id

---

`/api/user/delete/:id`

`DELETE` Delete a user by id

---

`/api/users/:userId/parks`

`GET` Retrives the list of every park to which @userId is currently subscribed, each in JSON format

---

`/api/users/:userId/messages`

`GET` Retrives the list of every message that @userId has ever sent or recieved

---

`/api/subscribe`

`POST` Subscribe a phone to a list of parks

---

`/api/subscriptionLog`

`GET`

---

# VIEW Endpoints

`views/login`

`GET` This will redirect the site to the login page

---

`/views/admin/adminId`

`GET` Redirects @adminId to main admin page. Admin credentials required

---

`view/admin/parks`

`GET` Redirect

---

# ADMIN Endpoints

`/admin/users`

`GET` Retrive the index of all users

`POST` Create a new user

---

`admin/login`

`POST` This will authenticate a user provided /email and password

---

`/admin/logout`

`GET` This will logout current user (i.e. destroy session) and redirect to login page

---

`/admin/users/:userId`

`GET` Read a @userId's information

---

`/admin/users/:userId/uploadImage`

`POST` Uploads a @userId's profile image to Cloudinary and stores url reference in User object

---

`/admin/users/:userId/contact`

`PUT` Update a @userId's contact information & password

---

`/admin/users/:userName`

`DELETE` Delete a user by userName
