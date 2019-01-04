require('dotenv-safe').load();
const dev = true;
const cfg = {};

cfg.secret = process.env.APP_SECRET;

cfg.mongoUri = dev ? process.env.DEV_MONGO_URI : process.env.DEP_MONGO_URL;

cfg.serverPort = dev ? process.env.APP_DEV_SERVER_PORT : process.env.APP_DEP_SERVER_PORT;

cfg.clientPort = dev ? process.env.APP_DEV_CLIENT_PORT : process.env.APP_DEP_CLIENT_PORT;

cfg.accountSid = process.env.TWILIO_ACCOUNT_SID;

cfg.authToken = process.env.TWILIO_AUTH_TOKEN;

cfg.twilioNumber = process.env.TWILIO_NUMBER;


/*require('dotenv-safe').load();.........
------------------------------------------------------------------------------------------------------------
This threw the folowing error:
------------------------------------------------------------------------------------------------------------
 "fs.js:122
 throw err; ^

 Error: ENOENT: no such file or directory, open '.env.example'
 at Object.openSync(fs.js: 448: 3)
 at Object.readFileSync(fs.js: 348: 35)
 at Object.config(/mnt/c / Users / theMathMonkey / Desktop / theShitTop / Google Drive / Coding / SJParksMERN / node_modules / dotenv - safe / index.js: 27: 45)
 at Object. < anonymous > (/mnt/c / Users / theMathMonkey / Desktop / theShitTop / Google Drive / Coding / SJParksMERN / config.js: 15: 24)
 at Module._compile(internal / modules / cjs / loader.js: 707: 30)
 at Object.Module._extensions..js(internal / modules / cjs / loader.js: 718: 10)
 at Module.load(internal / modules / cjs / loader.js: 605: 32)
 at tryModuleLoad(internal / modules / cjs / loader.js: 544: 12)
 at Function.Module._load(internal / modules / cjs / loader.js: 536: 3)
 at Module.require(internal / modules / cjs / loader.js: 643: 17)
 at require(internal / modules / cjs / helpers.js: 22: 18)
 at Object. < anonymous > (/mnt/c / Users / theMathMonkey / Desktop / theShitTop / Google Drive / Coding / SJParksMERN / server.js: 6: 16)
 at Module._compile(internal / modules / cjs / loader.js: 707: 30)
 at Object.Module._extensions..js(internal / modules / cjs / loader.js: 718: 10)
 at Module.load(internal / modules / cjs / loader.js: 605: 32)
 at tryModuleLoad(internal / modules / cjs / loader.js: 544: 12)
 "
------------------------------------------------------------------------------------------------------------
 */
module.exports = cfg;
