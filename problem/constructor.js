// ref : https://ko.javascript.info/constructor-new

// 계산기 만들기
let calculator = new Calculator();
calculator.read();

alert('Sum=' + calculator.sum());
alert('Mul=' + calculator.mul());

function Calculator() {
  //굳이 필요없음
  this.number1 = 0;
  this.number2 = 0;

  this.read = function () {
    const [number1, number2] = prompt().split(' ');
    this.number1 = parseInt(number1, 10);
    this.number2 = parseInt(number2, 10);
  };

  this.sum = function () {
    return this.number1 + this.number2;
  };

  this.mul = function () {
    return this.number1 * this.number2;
  };
}

// 누산기 만들기
let accumulator = new Accumulator(1); // 최초값: 1

accumulator.read(); // 사용자가 입력한 값을 더해줌
accumulator.read(); // 사용자가 입력한 값을 더해줌

alert(accumulator.value); // 최초값과 사용자가 입력한 모든 값을 더해 출력함

function Accumulator(startingValue) {
  this.value = startingValue;

  this.read = function () {
    const number = parseInt(prompt(), 10);
    this.value += number;
  };
}
