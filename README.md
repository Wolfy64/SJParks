# SJParks Scope
Assuming that we initiate with two parks, each with a list of two issues (hard-coded in the front end for the test's sake). In overview, the functionality flows in the following manner:

## Initial Subscription 
userResident texts the parkID to our Twilio number, and we check if he's the new member for that park. 
- There is a fork of ifs, and we need to clarify what to do in each case.

## Keywords 
userResident gets an automatic response for any text they send to our Twilio number.  
- We should decide on automatic keyword-response strings, like "STOP" for unsubscribe, "HELP" for options, and "kfewfiiy" for "We couldn't recognize your message, text HELP for options."

## Notification List 
anyUser(for now) interacts with userDashboard (frontEnd's web app) to push notifications to the selected list of userResidents.

## userDashboard
1. Choose the Park. (Park1, Park2). Defines a list of userResidents to notify.
2. Input the Update and Submit. (Send the data to Twilio and voila! Everyone's notified!)

# Defining Responsibilities
1. Responsible for Twilio - Irina. DUE: 08/24/18 - Initiated Git repo with Twilio API's and node modules.
2. Initial Subscribtion logic - Russell and Adam. DUE: 8/30/18
3. userDashboard interface - Brandon and Jiabey. DUE: 8/30/18
