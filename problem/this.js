// ref : https://ko.javascript.info/object-methods

function makeUser() {
  return {
    name: 'John',
    ref: this,
  };
}

let user = makeUser();

alert(user.ref.name); // 결과가 어떻게 될까요?
// => 브라우저에서는 window.name
// => 엄격모드에서는 this가 undefined이다. 그렇기 때문에 undefined. 으로 접근할 수 없기 때문에 에러가 발생

// 계산기 작성
let calculator = {
  read: function () {
    const [number1, number2] = prompt().split(' ');
    this.number1 = parseInt(number1, 10);
    this.number2 = parseInt(number2, 10);
  },
  sum: function () {
    return this.number1 + this.number2;
  },
  mul() {
    return this.number1 * this.number2;
  },
};

calculator.read();
alert(calculator.sum());
alert(calculator.mul());

// 체이닝
let ladder = {
  step: 0,
  up() {
    this.step++;
    return this;
  },
  down() {
    this.step--;
    return this;
  },
  showStep: function () {
    // 사다리에서 몇 번째 단에 올라와 있는지 보여줌
    alert(this.step);
  },
};

ladder.up().up().down().showStep(); // 1
