# SJParks Text Notification Feature v0.0.0
Initiate testing of text notification feature with three parks. 

## Resident Functionality
userResident texts parkID(s) to our Twilio number, and we check if he's the new member for that park. If not - subscribe.
userResident gets automatic keyword-response strings, like "STOP" for unsubscribe, "HELP" for options, and "kfewfiiy" for "We couldn't recognize your message, text HELP for options."

## Admin Functionality
anyUser(for now) interacts with userDashboard (frontEnd's web app) to push notifications to the selected list of userResidents.
1. Choosing the Park using checkboxes defines a list of userResidents to notify.
2. Input the Update and Submit. (Sends the data to Twilio and voila! Everyone's notified!)

## Project About Page
Basic front-end website that acts as a page for posting updates about the project.