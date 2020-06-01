// 環境変数
console.log(JSON.stringify(process.env, null, 2));

// 実行時引数
process.argv.forEach((arg, i) => {
  console.log(`processArg ${i} : ${arg}`);
});

// カレントワークディレクトリ、実行中ファイルのディレクトリ
console.log(`cwd()     : ${process.cwd()}`); // 別の場所から、フルパス指定でindex.jsを実行させたときには、実行している場所のディレクトリが返される点に注意
console.log(`__dirname : ${__dirname}`) // あくまで、実行しているファイルの存在するディレクトリが返されます

// 実行環境
console.log(process.platform);