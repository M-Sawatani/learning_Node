// ランダム文字列を生成する文字列 RandomString を作成

// var randomstring = require('./randomstring.js');
// console.log(randomstring());


// ランダム文字列を読み取る CustomReadableStream を作成

var CustomReader = require('./customreader.js');
var reader = new CustomReader();
reader.on('data', (chunk) => {
  console.log(chunk);
});
reader.resume();