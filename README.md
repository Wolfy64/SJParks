# Text Notification Platform

## Webapp Structure
### Public
```
|-- About
|-- Subscribe
    |-- SelectPark
    |-- Search
    |-- ParkListSelect
    |-- DeselectPark
    |-- ParkListDeselect
    |-- PhoneInput
|-- Contact
    |-- Survey
    |-- ContactForm
```

### Admin
```
|-- Topnav
|-- Profile
    |-- UploadPicture
    |-- ProfileEdit
    |-- PasswordEdit

|-- Sidenav
|-- Updates
    |-- Graph
    |-- Posts
    |-- NewUpdate
        |-- SelectPark
        |-- Search
            |-- ParkListSelect
        |-- DeselectPark
            |-- ParkListDeselect
        |-- TitleToggle
        |-- Message
        |-- MessagePreview
|-- Parks
    |-- NewPark
    |-- ParkListDelete
|-- Users
    |-- NewUser
    |-- UserList
```

## Subscriber User Flow
### Subscription through Text
User texts the parkID to our Twilio number, and we check if he's the new member for that park.
* Ex: Texting "ROSE" subscribes the user to Municipal Rose Garden notification list.

### Subscription through the Website

User selects the parks from the Public page and inputs the phone number to subscribe to Text Notifications.

<<<<<<< HEAD
### Keywords

userResident gets an automatic response for any text they send to our Twilio number. Special keys are "STOP", "unsubscribe", "HELP", "START", and subscription keys created by the Admin.

##Admin User Flow

=======
### Keywords
userResident gets an automatic response for any text they send to our Twilio number.
Special keys are:
* "STOP"
* "unsubscribe"
* "HELP"
* "START"
* And subscription keys created by the Admin.

## Admin User Flow
>>>>>>> fe214ad9e2a573d4198bb58a5c9e70accc2d921d
### Updates

Admin selects the list of Subscribers and sends the message.

### Parks
<<<<<<< HEAD

Premium Access Admin is able to view all lists in the system, add new lists, and delete existing lists.

### Users

Premium Access Admin is able to view all users in the system, add new users, and delete existing users.
=======
Premium Access Admin is able to view:
* All lists in the system
* Add new lists
* Delete existing lists
### Users
Premium Access Admin is able to view:
* All users in the system
* Add new users
* Delete existing users
>>>>>>> fe214ad9e2a573d4198bb58a5c9e70accc2d921d
