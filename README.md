# Text Notification Platform for San Jose Parks

## 📦 How to Set up

### From scratch

Assuming your **fork** the project in a folder named "SJParks" on your Desktop.

```shell
cd ~/Desktop/SJParks
git checkout -b <NAME__OF_YOUR_BRANCH>
npm run setup // Install packages
npm run dev
```

Add `.env` in root folder with your personnal and private data

```shell
APP_SECRET=
CLIENT_PORT=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
CLOUDINARY_CLOUD_NAME=
MLAB_URI=
MONGODB_URI=
NODE_ENV=
SERVER_PORT=
TEST_MONGO_URL=
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_NUMBER=
```

**Client run on http://localhost:3000**

**Server run on http://localhost:5000**

## 🎉 How to contribute

Into your branch

```shell
git remote add upstream git@github.com:Wolfy64/SJParks.git
git pull upstream development
// ... Do your work
npm run test
git push
```

Go to GitHub and pull request your branch
`https://github.com/Wolfy64/SJParks/compare/development...development?expand=1`

If you want to see the test of your build you can also signup to CircleCI with your GitHub account
`https://circleci.com/signup/`

### Other command

On root folder:

To install packages for both server and client `npm run setup`

To start mango DB `npm run mango`

To start server and client `npm run dev`

To start only the server `npm run server`

To start only the client `npm run client`

To run test into the client `npm test`

## Webapp Specification

### Admin

## Subscriber User Flow

### Subscription through Text

User texts the parkID to our Twilio number, and we check if he's the new member for that park.

- Ex: Texting "ROSE" subscribes the user to Municipal Rose Garden notification list.

### Subscription through the Website

User selects the parks from the Public page and inputs the phone number to subscribe to Text Notifications.

### Keywords

userResident gets an automatic response for any text they send to our Twilio number. Special keys are "STOP", "unsubscribe", "HELP", "START", and subscription keys created by the Admin.

userResident gets an automatic response for any text they send to our Twilio number.
Special keys are:

- "STOP"
- "unsubscribe"
- "HELP"
- "START"
- And subscription keys created by the Admin.

## Admin User Flow

### Updates

Admin selects the list of Subscribers and sends the message.

### Parks

Premium Access Admin is able to view all lists in the system, add new lists, and delete existing lists.

### Users

Premium Access Admin is able to view all users in the system, add new users, and delete existing users.

Premium Access Admin is able to view:

- All lists in the system
- Add new lists
- Delete existing lists
