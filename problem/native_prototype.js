// ref : https://ko.javascript.info/native-prototypes

// 1)
function f() {
  alert('Hello!');
}

Function.prototype.defer = function (duration) {
  // 👎
  // setTimeout(() => {
  //   f();
  // }, duration);

  // 👍
  setTimeout(this, duration);
};

f.defer(1000); // 1초 후 "Hello!" 출력

// 2) ✅

//apply 이용한 방법
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

f.defer(1000)(1, 2); // 1초 후 3을 출력
