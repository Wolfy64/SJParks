# Text Notification Platform

## Webapp Structure
###Public
L About
L Subscribe
|   L SelectPark
|       L Search
|       L ParkListSelect
|   L DeselectPark
|       L ParkListDeselect
|   L PhoneInput
L Contact
    L Survey
    L ContactForm

###Admin
Topnav
L Profile
    L UploadPicture
    L ProfileEdit
    L PasswordEdit

Sidenav
| 
L Updates
|    L Graph
|    L Posts
|    L NewUpdate
|        L SelectPark
|           L Search
|           L ParkListSelect
|        L DeselectPark
|            L ParkListDeselect
|        L TitleToggle
|        L Message
|        L MessagePreview
|
L Parks
|    L NewPark
|    L ParkListDelete
|
L Users
    L NewUser
    L UserList


## Subscriber User Flow
### Subscription through Text 
User texts the parkID to our Twilio number, and we check if he's the new member for that park. Ex: Texting "ROSE" subscribes the user to Municipal Rose Garden notification list.

### Subscription through the Website
User selects the parks from the Public page and inputs the phone number to subscribe to Text Notifications.

### Keywords 
userResident gets an automatic response for any text they send to our Twilio number. Special keys are "STOP", "unsubscribe", "HELP", "START", and subscription keys created by the Admin.

##Admin User Flow
### Updates
Admin selects the list of Subscribers and sends the message.
### Parks
Premium Access Admin is able to view all lists in the system, add new lists, and delete existing lists.
### Users
Premium Access Admin is able to view all users in the system, add new users, and delete existing users.