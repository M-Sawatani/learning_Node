# Streamについて

## ○パス文字列
- ディレクトリ名取得：  `path.dirname(<パス>)`
- ファイル名取得    ：  `path.basename(<パス>)`
- 拡張子名取得      ：  `path.extname(<パス>)`
- パス文字列結合    ：  `path.join(<パス1>, ...)`
- パス文字列正規化  ：  `path.normalize(<パス>)`



## ○ファイル読み書き
### 【同期処理】
  - Node.js の良いところをすべて無に帰するので利用は避ける
  ```JavaScript
  var path = require("path");
  var fs = require("fs");

  var data = fs.readFileSync(__filename, "utf8");
  fs.writeFileSync(path.join(__dirname, "out.txt"), data, "utf8");
  ```
### 【非同期処理（関数）】
  - ファイルサイズが小さく後続処理も簡易な場合に利用
  ```JavaScript
  var path = require("path");
  var fs = require("fs");
  
  fs.readFile(__filename, "utf8", (err, data) => {
    fs.writeFile(path.join(__dirname, "out.txt"), data, "utf8", (err) => {
    });
  });
  ```
### 【非同期処理（ストリーム）】

  - ファイルサイズが大きく後続処理が複雑な場合に利用
  ```JavaScript
  var path = require("path");
  var fs = require("fs");
  
  var reader = fs.createReadStream(__filename, "utf8");
  var writer = fs.createWriteStream(path.join(__dirname, "out.txt"), "utf8");
  reader.pipe(writer);
  reader.resume();
  ```

## ○カスタムストリーム

### 【読み取り】
  ```JavaScript
  const { Readable } = require("stream");
  
  var CustomReader = class extends Readable {
    constructor(options) {
      super(options || { encoding: "utf8" });
    }
    _read(size) {
      var max = this._max;
      var start = this._current;
      var end = start + size < max ? start + size : max;
      
      var chunk = getSomeRandomString(start, end);
  
      this.push(chunk);    
  
      if (start + size < max) {
        this._current = i;
      } else {
        this.push(null);
      }
    }
  }
  ```

### 【書き込み】
  ```JavaScript
  const { Writable } = require("stream");
  
  var CustomWriter = class extends Writable {
    constructor(options) {
      super(options || { decodeStrings: true });
    }
    _write(chunk, encoding, done) {
      var text;
  
      if (encoding === "buffer") {
        text = chunk.toString(this._writableState.defaultEncoding);
      }
  
      process.stdout.write(text);
  
      done();
    }
  }
  ```

## ○文字コード変換
- Shift_JIS のエンコード、デコードには「iconv-lite」を利用。

### 【関数を使ったエンコード/デコード】
  ```JavaScript
  const iconv = require("iconv-lite");
  <バッファ> = iconv.encode(<文字列>, "shiftjis");
  <文字列> = iconv.decode(<バッファ>, "shiftjis");
  【ストリームを使ったエンコード/デコード】

  const iconv = require("iconv-lite");
  iconv.encodeStream("shiftjis");
  iconv.decodeStream("shiftjis");
  ```