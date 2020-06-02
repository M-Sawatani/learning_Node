process.on('message', (data) => {
  console.log(data);
  process.exit(0); //どこで終わったら良いかわからなくなるので、終了することを明示する必要がある
})