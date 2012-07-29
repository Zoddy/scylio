var horizon = require('./horizon.js'),
    fs = require('fs');

console.log(horizon.parse(
  JSON.parse(fs.readFileSync(__dirname + '/example.json', 'utf8')),
  fs.readFileSync(__dirname + '/example.horizon', 'utf8')
));
