module.exports = function (max = 20) {
  var data = [];
  var original = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var length = original.length
  for (var i = 0; i < max; i++) {
    data[i] = original[Math.floor(Math.random() * length)]; // Math.rondom() : 0–1（0以上、1未満）の範囲で浮動小数点の擬似乱数を返す
  }
  return data.join('');
}