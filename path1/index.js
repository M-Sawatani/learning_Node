// 1. "C:\\sample\index.html" というパスから以下の文字列を取り出す
//   1) ディレクトリ名
//   2) ファイル名
//   3) 拡張子名

var path = require('path');
var filepath = "C:\\\\sample\\index.html";
var filepath2 = "C:\\\\sample\\lib\\..\\index.html"

var dirname = path.dirname(filepath);
var filename = path.basename(filepath);
var extname = path.extname(filepath);
console.log('dir      : %s\r\nfilename : %s\r\nextname  : %s', dirname, filename, extname);

// 2. "C:\\sample" と "index.html" をパスとして文字列結合

console.log(path.join(dirname, filename));

// 3. "C:\\sample\lib\..\index.html" というパスを正規化
console.log(path.normalize(filepath2));