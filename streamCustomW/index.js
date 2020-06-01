var CustomReader = require('./customreader');
var CustomWriter = require('./customwriter');

var reader = new CustomReader();
var writer = new CustomWriter();
reader.pipe(writer);

reader.resume();