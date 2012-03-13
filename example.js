var horizon = require('./horizon.js'),
    fs = require('fs');

console.log(horizon.parse(
  JSON.parse(fs.readFileSync('example.json', 'utf8')),
  fs.readFileSync('example.horizon', 'utf8')
));