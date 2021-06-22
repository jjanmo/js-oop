// ref : https://ko.javascript.info/prototype-methods

// #1 ??
let dictionary = Object.create(null);

// dictionary.toString 메서드를 추가하는 코드

// 데이터를 추가합니다.
dictionary.apple = 'Apple';
dictionary.__proto__ = 'test'; // __proto__는 여기서 일반적인 프로퍼티 키입니다.

// 반복문에는 apple과 __proto__ 만 있습니다.
for (let key in dictionary) {
  alert(key); // "apple" 다음 "__proto__"입니다.
}

// toString이 동작하는 부분입니다.
alert(dictionary); // "apple,__proto__"

// #2
function Rabbit(name) {
  this.name = name;
}
Rabbit.prototype.sayHi = function () {
  alert(this.name);
};

let rabbit = new Rabbit('Rabbit');

// 아래와 같이 메서드를 호출하면 동일하게 동작할지 다르게 동작할지 예상해 보세요.

// 1️⃣
rabbit.sayHi(); // 동일 동작

// 2️⃣
Rabbit.prototype.sayHi(); // 다르게 동작
// -> undefined

// 3️⃣
Object.getPrototypeOf(rabbit).sayHi(); // 동일 동작 ❌ => 다르게 동작
// Object.getPrototypeOf(rabbit) === rabbit.__proto__  === Rabbit.prototype
// -> 2번과 같음 -> undefined

// 4️⃣
rabbit.__proto__.sayHi(); // 동일 동작 ❌ => 다르게 동작
// rabbit.__proto__ === Rabbit.prototype
// -> 2번과 같음 -> undefined
