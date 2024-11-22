// https://lodash.com/docs/4.17.15#shuffle

const _ = require("lodash");

console.log(_.shuffle([1, 2, 3, 4]));

function shuffle(arr) {
  let i = arr.length - 1;
  while (i > 0) {
    const r = Math.floor(Math.random() * (i - 1)); //随机前N位
    const temp = arr[i];
    arr[i] = arr[r];
    arr[r] = temp;
    i--;
  }
  return arr;
}

console.log(shuffle([1, 2, 3, 4]));
