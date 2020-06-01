// 1. 現在のディレクトリの表示
console.log(__dirname);

// 2. 現在実行中のファイルパスの表示
console.log(__filename);

// 3. 遅延実行(5種類あります！)
// ● process.nextTick(callback)
// -> process.nextTick()の再帰呼び出しはしない(処理が終わらなくなる可能性)
// ● setImmediate()の利用を推奨
// ● Promise.resolve().then(callback)
// ● global.setImmediate(callback)
// ● global.setTimeout(callback, delay)
// -> setTimeout(callback, 0)より、setImmediate(callback)を利用する(0指定は、処理順が保証されない)
// ● global.setInterbal(callback, delay) 
setTimeout(() => {
  console.log('setTimeout()');
}, 5000);  // この時間を変更すると、setTimeout()とsetImmediate()の実行順が変わる

console.log('global');

// 作業を入れてみる3秒間固まるようなイメージ
var end = (new Date()).getTime() + 3000;
while ((new Date()).getTime() < end) { } // シングルスレッドなので、このループを待ってから、前述のsetTimeout()が実行される

setImmediate(() => {
  console.log('setImmediate()');
});

process.nextTick(() => {
  console.log('nextTick()');
});

Promise.resolve().then(() => {
  console.log('Promise.resolve().then()');
})