# SJParks Endpoints API

**version: "1.0"**

# API Endpoints

`/api`

`GET` Describes all available endpoints

---

`/api/auth`

`GET` Check user Authentication via JWT

---

`/api/parks`

`GET` Fetch the list of all parks in JSON format

`POST` Create a new park

`DELETE` Delete a park by id

---

`/api/updates`

`GET` ???

---

`/api/users`

`GET` Get all users

`POST` Create a new user

`DELETE` Delete a user by id

---

`/subscriptionLog`

`POST` Subscribe a phone to a list of parks

---

`/login`

`POST` Authenticate a user provided /email and password

---

`admin/users/userId/uploadImage`

`POST` Uploads a @userId's profile image to Cloudinary and stores url reference in User object

---

`/admin/myprofile`

`GET` Read a @userId's information
