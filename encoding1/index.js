const fs = require('fs');
const path = require('path');
const iconv = require('iconv-lite');

// Streamを使わない場合
// fs.readFile(path.join(__dirname, 'sample.txt'), (err, data) => {
//   // 特に指定していない場合、bufferが返ってくる
//   console.log(iconv.decode(data, 'shiftjis'));
// });

// fs.writeFile(
//   path.join(__dirname, 'test.txt'),
//   iconv.encode('こんにちは', 'shiftjis'), // iconv.encodeでbufferをfs.writeFileメソッドに渡してあげている
//   (err) => {
//     console.log('OK');
//   });

// Streamを使う場合
var reader = fs.createReadStream(path.join(__dirname, 'sample.txt'));
var writer = fs.createWriteStream(path.join(__dirname, 'test2.txt'))
var decoder = iconv.decodeStream('shiftjis');
var encoder = iconv.encodeStream('shiftjis');

reader.pipe(decoder);
decoder.on('data', (chunk) => {
  console.log(chunk);
});
reader.resume();

encoder.pipe(writer);
encoder.write('こんにちは');
encoder.end();