const fs = require('fs');
const path = require('path');
var Models = {}
const modelsPath = path.resolve(__dirname, '')
fs.readdirSync(modelsPath).forEach(file => {
 const Model = require(modelsPath + '/' + file);
 if (typeof Model.modelName !== 'undefined' && Model.modelName !== null)
 {
    Models[Model.modelName] = Model;
 }
});

module.exports = Models;