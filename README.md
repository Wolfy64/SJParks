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

Go to GitHub and [Pull Request 🔗](https://github.com/Wolfy64/SJParks/compare/development...development?expand=1) your branch

If you want to check your tests of your build you can also signup to [CircleCI 🔗](https://circleci.com/signup/) with your GitHub account

### Other command

On root folder:

To install packages for both server and client `npm run setup`

To start server and client `npm run dev`

To start only the server `npm run server`

To start only the client `npm run client`

To run test into the client `npm test`

### Demo: Admin Dashboard

Connect to: `http://localhost:3000/login`

User ID: `test@test.com`

Password: `123456`
