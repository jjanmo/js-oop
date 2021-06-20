// ref : https://ko.javascript.info/function-prototype

// #1
function Rabbit() {}
Rabbit.prototype = {
  eats: true,
};

let rabbit = new Rabbit();

// 각각이 하나씩 일어나는 경우의 결과값을 예상하기
Rabbit.prototype = {}; // 1)
Rabbit.prototype.eats = false; // 2)
delete rabbit.eats; // 3)
delete Rabbit.prototype.eats; // 4)

alert(rabbit.eats);
// ⭐️ 1) undefined ❌ => true
// prototype 에 새로운 객체를 할당할 수 있다. 단, 할당 전에 만들어진 인스턴스를 할당 전에 바라보던 prototype을 계속 바라본다
// 왜냐하면 할당 전에 만들어진 인스턴스의 프로토타입 링크([[Prototype]])은 계속 이전 프로토타입 객체를 바라보고 있기때문이다.

// 2) fasle

// 3) undefined ❌ => true
// 인스턴스 객체에는 eats라는 프로퍼티가 없다.(프로토타입 객체를 통해서 접근해서 가져오는 값) 그래서 지워지지도 지울 수도 없다.

// 4) undefined

// #2
// ⭐️ 문제의 의도가 중요함!!!

// 생성자 함수가 하나 있고, 이 생성자 함수를 사용해 만든 임의의 객체 obj가 있다고 가정해봅시다.
// 지금은 이 생성자 함수를 사용해 새로운 객체를 만들어야하는 상황입니다.
// 정체를 모르는 생성자 함수를 사용해 새로운 객체를 만드는게 가능할까요? => 가능하다 ✅

// let obj2 = new obj.constructor();

// 1) 위와 같은 코드를 사용해 객체를 만들 수 있게 해주는 ✅ 생성자 함수를 작성해보세요.
// 2) 여기에 더하여 위와 같은 코드가 동작하지 않도록 하는 ✅ 예시도 하나 만들어보세요.

function Pet(name) {
  this.name = name;
}

const dog = new Pet('max');
const cat = new dog.constructor('lucy');

alert(dog.name); // max
alert(cat.name); // lucy

Pet.prototype = {};

const dog1 = new Pet('jack');
const cat1 = new dog1.constructor('lily');

alert(dog1.name); // jack
alert(cat1.name);
// 일반적인 {} 객체 생성(프로토타입 체인에 의해서 Object.prototype.constuctor까지 찾아감)
// -> Object 생성자 함수에는 name property가 없기 때문에 undefined
