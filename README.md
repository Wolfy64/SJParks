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

### Keywords 
userResident gets an automatic response for any text they send to our Twilio number. 
Special keys are:
* "STOP"
* "unsubscribe"
* "HELP"
* "START" 
* And subscription keys created by the Admin.

## Admin User Flow
### Updates
Admin selects the list of Subscribers and sends the message.
### Parks
Premium Access Admin is able to view:
* All lists in the system
* Add new lists
* Delete existing lists
### Users
Premium Access Admin is able to view:
* All users in the system
* Add new users
* Delete existing users
