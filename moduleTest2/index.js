var methods = require('./methods.js');
var Lamborgini = require('./lamborgini.js');
var config = require('./config.js');


var w = 30;
var h = 20;

methods.echo('echo test');
console.log('幅は、%s。高さは、%s。', w, h);
console.log('面積は、%sです。', methods.area(w, h));

var car = new Lamborgini('lamborgini');

car.echo();
car.drive();

console.log(JSON.stringify(config, null, 2));