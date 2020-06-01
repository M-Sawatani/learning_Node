var test = {
  hello: 'world'
}

console.log('Message: %o', test);
// console.log('hello');
// console.trace('world');

// 処理速度計測
var sum = 0;
console.time('timer1');
for (var i = 1; i < 1000; i++) {
  sum += i;
}

console.timeEnd('timer1');