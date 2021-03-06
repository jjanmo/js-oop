// ref : https://ko.javascript.info/native-prototypes

// 1)
function f() {
  alert('Hello!');
}

Function.prototype.defer = function (duration) {
  // ๐
  // setTimeout(() => {
  //   f();
  // }, duration);

  // ๐
  setTimeout(this, duration);
};

f.defer(1000); // 1์ด ํ "Hello!" ์ถ๋ ฅ

// 2) โ

//apply ์ด์ฉํ ๋ฐฉ๋ฒ
function f(a, b) {
  alert(a + b);
}

Function.prototype.defer = function (duration) {
  const f = this;
  return function (...args) {
    setTimeout(() => {
      f.apply(this, args);
    }, duration);
  };
};

f.defer(1000)(1, 2); // 1์ด ํ 3์ ์ถ๋ ฅ

// ์ฐธ๊ณ ์๋ฃ
// https://developer.mozilla.org/ko/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout#this_%EB%AC%B8%EC%A0%9C

//bind๋ฅผ ์ด์ฉํ ๋ฐฉ๋ฒ์?? 
