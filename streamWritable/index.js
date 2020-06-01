var path = require('path');
var fs = require('fs');

var reader = fs.createReadStream(path.join(__dirname, 'sample.txt'), 'utf8');
var writer = fs.createWriteStream(path.join(__dirname, 'sample-copy.txt'), 'utf8');

reader.pipe(writer);
reader.resume();