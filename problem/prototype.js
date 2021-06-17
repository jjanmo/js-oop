// ref : https://ko.javascript.info/prototype-inheritance

// 프로토타입 이해하기
let animal = {
  jumps: null,
};
let rabbit = {
  __proto__: animal,
  jumps: true,
};

alert(rabbit.jumps); // ? (1) true
delete rabbit.jumps;
alert(rabbit.jumps); // ? (2) null
delete animal.jumps;
alert(rabbit.jumps); // ? (3) undefined

// 검색 알고리즘
// pockets → bed → table → head
let head = {
  glasses: 1,
};

let table = {
  pen: 3,
  __proto__: head,
};

let bed = {
  sheet: 1,
  pillow: 2,
  __proto__: table,
};

let pockets = {
  money: 2000,
  __proto__: bed,
};

// this의 의미는?
let animal = {
  eat() {
    this.full = true;
  },
};

let rabbit = {
  __proto__: animal,
};

rabbit.eat(); //this?? -> rabbit
// 지금까지 알고 있는 함수의 호출방식과 같다.
// 해당 메소드를 프로토타입 체인을 통해서 찾고 실행한다. 즉 찾는 것과 실행하는 것은 서로 다른 로직이다.

let hamster = {
  stomach: [],

  eat(food) {
    // this.stomach.push(food);
    this.stomach = [food];
  },
};

let speedy = {
  // stomach: [],
  __proto__: hamster,
};

let lazy = {
  // stomach: [],
  __proto__: hamster,
};

// 햄스터 한 마리가 음식을 찾았습니다.
speedy.eat('apple');
alert(speedy.stomach); // apple
// 이 햄스터도 같은 음식을 가지고 있습니다. 왜 그럴까요? 고쳐주세요.
alert(lazy.stomach); // apple

// 처음에 eat() 메소드가 실행될 때, this는 speedy이다. 그런데 speedy에는 stomach이 없기때문에 프로토타입 체인에 의해서 상위로 올라가서
// 해당 프로퍼티(stomach)를 찾게된다.
// 그런데 이렇게 되면 speedy와 lazy 모두 같은 stomach를 바라보게 되는 것이다.(모든 쥐가 stomach를 공유)
