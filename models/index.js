const fs = require('fs');
const path = require('path');

const modelsPath = path.resolve(__dirname, 'models')
fs.readdirSync(modelsPath).forEach((file) => {
  require(modelsPath + '/' + file);
})
