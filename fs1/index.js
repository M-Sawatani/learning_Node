
var fs = require('fs');
var path = require('path');
var util = require('util');

/*
// 1. ファイルを非同期的に読み込んでコンソール表示する
fs.readFile(path.join(__dirname, 'sample.txt'), 'utf-8', (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(data);
  // 2. 読み込んだファイルを別名で非同期保存する
  fs.writeFile(path.join(__dirname, 'sample-copy.txt'), data, 'utf-8', (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log('OK!!')
  })
});
*/

// Promise化
var readFile = util.promisify(fs.readFile);
var writeFile = util.promisify(fs.writeFile);

// 3. 2で作成したプログラムをPromise化してネストを削減する(async/await使わない)
console.time();
readFile(path.join(__dirname, 'sample.txt'), 'utf-8')
  .then((resp) => {
    // console.log(resp);
    return writeFile(path.join(__dirname, 'sample-copy.txt'), resp, 'utf-8');
  })
  .then(() => {
    console.log('OK!!');
    console.timeEnd();
  })
  .catch((err) => {
    console.log(err.message);
    console.timeEnd();
  });

// 4. 2で作成したプログラムをPromise化してネストを削減する(async/await使う)
(async function () {
  try {
    console.time();
    var data = await readFile(path.join(__dirname, 'sample.txt'), 'utf-8');
    await writeFile(path.join(__dirname, 'sample-copy2.txt'), data, 'utf-8');
    console.log('OK!');
    console.timeEnd();
  } catch (err) {
    console.log(err.message);
    console.timeEnd();
  }
})();