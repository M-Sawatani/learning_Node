var Clock = require('./clock.js');

var clock = new Clock();
var i = 0;
console.time();
clock.on('tick', () => {
  console.log(++i);
  if (i > 3) {
    clock.stop();
    console.timeEnd();
  }
});
clock.start();