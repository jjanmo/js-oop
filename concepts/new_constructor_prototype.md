# Intro

앞서 this에 대해서 알아볼 때, `new 연산자의 작동 방식`과 `생성자 함수`가 무엇인지 간단하게 알아봤다. 이 부분에 대해서 좀 더 자세히 알아보자.

우리는 객체를 만들 때, 보통 `리터럴 방식`으로 만든다. 리터럴 방식이라 함은 `{ key : value ... }` 형식으로 만드는 것을 말한다. 하지만 함수를 통해서도 이러한 객체를 만들 수 있다. 정확히 말해서 **자바스크립트의 모든 객체는 함수를 통해서 생성된다.** 이 때 이 함수를 `생성자 함수`라고 한다. 그렇다면 이러한 생성자 함수는 무엇이 다른가? 일반 함수와 다른 점은 없다. 왜냐하면 모든 함수는 `생성자 함수가 될 수 있는 능력`을 갖고 있기 때문이다. 단, 관례적으로 생성자 함수임을 표현하기 위해서 `대문자로 표시`하고 생성자 함수의 능력을 발휘(?)하기 위해선 `new 연산자`와 같이 사용되어야 한다. 말로만 설명하면 이해하기 어려울수 있기 때문에 코드를 통해서 알아보자.

```javascript
function User(nickname, email) {
  console.log(this); // ??
  this.nickname = nickname;
  this.email = email;
}

const newUser1 = User('jjanmo1', 'jjanmo1@naver.com');
console.log(newUser1); // 1
const newUser2 = new User('jjanmo2', 'jjanmo2@naver.com');
console.log(newUser2); // 2
```

위의 코드는 어떤한 결과를 출력할까?

첫번째는 `일반 함수의 호출`이다. 1번에서 출력되는 값은 `undefined` 이다. 일반 함수의 경우 명시적으로 `return` 키워드를 사용하지 않으면 기본적으로 `undefined`를 반환한다. 그래서 위와 같은 결과값을 볼 수 있다.

두번째는 `생성자 함수의 호출`이다. 생성자 함수의 호출은 일반 함수의 호출과 다르게 작동하기 때문에 아래와 같은 결과를 얻을 수 있다. 이러한 결과값의 원인은 예상했던 대로 `new 연산자` 때문이다. (아래 이미지는 브라우저의 콘솔에서 나온 결과값이다.)

<br/>

![result](../screenshots/constructor_result.png)

위 이미지를 보면 3개의 파란색 상자가 보인다. 이 3가지가 무엇인지 말할 수 있을까? 대충 예상은 가능하지만 정확히 알고 싶은 욕구(?)가 샘솟는다.(아니라면 ㅈㅅ 😅) 이 궁금증을 해결하기 위해선 `new 연산자로 인해 일어나는 내부적인 메카니즘(?)`을 알아야한다.(앞에서 this를 공부할 때 간단하게 살펴보았지만 다시 한 번 복습삼아 살펴보자!) 더불어 `prototype`이 무엇인지 알아야한다. 이제 이것들에 대해서 살펴보도록 하자.

<br />

## New Operator 작동방식

```javascript
function Calculator() {
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
}

const calculator = new Calculator();
```

> 브라우저에서 작동하는 간단한 덧셈 계산기이다.

<br />

`new <함수>`를 만나는 순간,

1. `빈 객체 { }` 가 생성된다.
2. `this`에 (위에서)생성된 빈 객체를 연결(할당)한다.
3. 함수의 본문으로 들어가서 해당 코드를 실행한다. 여기서 해당 객체(this)의 프로퍼티가 생성된다. this.<프로퍼티> 형식으로 추가된다.
4. **생성자 함수의 프로토타입(prototype) 객체**가 바인딩된 `__proto__`라는 프로퍼티가 해당 객체(this)에 추가한다.
5. `this`를 반환한다.

여기서 몇가지 이해가 안되는 부분들이 있을 것이다. 특히 `프로토타입 객체??`, `__proto__??` 이러한 것이 정확히 무엇을 의미하는지 알 수 없다. 그럼 위의 개념에 대해서 알아보자.

### 참고

Q1. new 연산자를 사용하고도 명시적으로 this에 다른 값을 할당한다면 어떻게 될까?

> 생성자 함수(new 사용시)는 명시적으로 반환값을 쓰지않아도 자동으로 this를 반환한다. 이 this에는 새로운 객체가 가져야할 프로퍼티를 모두 담은 것이다. 그런데 위의 의문처럼 새로운, 다른 객체를 반환한다면 생성자 함수에 의해 만들어진 인스턴스가 아니라 새로운, 다른 객체를 반환한다. 또 다른 점은 `__proto__`에 연결된 객체가 다르다는 것이다. 이 부분은 앞으로 알아갈 것이기 때문에 결과값이 어떻게 다른지 코드와 이미지로 보고만 가자.

> 반환값에 새로운 객체가 아닌 원시타입의 값을 반환한다면(return 'jjanmo' 처럼) 그 리턴문은 무시되고 기존의 this를 반환한다.

```javascript
function A() {
  this.number = 100;
}

const foo = new A();
console.log(foo); // 1

function B() {
  this.number = 100;

  return {
    name: 'jjanmo',
  };
}

const bar = new B();
console.log(bar); // 2
```

![return_this](../screenshots/return_this.png)

Q2. 어떤 경우 new를 붙이지 않아도 생성자 함수처럼 작동하는 경우가 있던데 그건 무엇때문에 그럴까?

```javascript
// 가장 보편적인 리터럴 방식의 배열 생성
var arr1 = [1, 2, 3];

// 생성자함수를 통한 배열 생성
var arr2 = new Array(1, 2, 3);

// ??
var arr3 = Array(1, 2, 3);

console.log(arr1);
console.log(arr2);
console.log(arr3);
```

![array](../screenshots/array.png)

위 이미지를 보면 3개 모두 같은 결과값을 갖는다. 우리가 알던 지식을 바탕으로 생각하면, new를 사용하지 않은 생성자 함수는 일반 함수의 호출과 같은 것으로 작동하는 것으로 알고 있는데 말이다. 이 이유는 자바스크립트는 빌트인 객체의 경우, new를 사용하지 않더라도 의도한바대로 새로운 객체(인스턴스)를 생성할 수 있도록 내부적으로 구현되어 있기 때문이다. 이러한 것을 `Scope-safe constructors`라고 부른다고 한다. (해당 빌트인 객체는 예를 들어 Object, Regex(정규표현식), Array 등이 있다.) 코드로는 어떻게 구현되어 있을지 살펴보자.

```javascript
function Fn(argument) {
  if (!(this instanceof Fn)) {
    return new Fn(argument);
  }
}
```

> new 연산자로 생성자 함수가 호출되면 this가 생성자 함수에 의해 생성된 객체(인스턴스)에 할당된다. 하지만 new가 없다면 일반함수 호출로서 this는 window를 의미하기 때문에 해당 if문에 부합하게 되어 `new Fn()`이 작동하게 되는 것이다.

> `instanceof`를 간단하게 이해하면 해당 객체가 생성자 함수에 의해서 만들어진 객체(인스턴스)인지 여부를 알려준다라고 생각할 수 있다. 물론 이 말도 맞지만(이렇게 따지면 다른 경우가 생긴다.) 엄밀하게 말하면 `생성자의 prototype 속성이 객체의 프로토타입 체인 어딘가 존재하는지 판별합니다` 라고 [MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/instanceof)에 적혀있다. 프로토타입에 대해서 알게 되면 이 말을 좀 더 명확하게 이해할 수 있을 것이다.

<br />

## Prototype

> 원형, 원초적인 형태, 공학에서는 초기모델

> 프로토타입에 대해서 알기 전에 위에서 언급했던 두가지를 기억해보자. **첫번째**는 `모든 객체는 함수를 통해서 만들어진다`. **두번째**는 그렇게 만들어진 `객체 안에는 __proto__라는 프로퍼티가 들어있다`.(생성자 함수에 의해서 객체가 생성될 때의 과정을 떠올려보자.)

모든 함수는 생성될 때, 자신의 원형, 자신의 모체를 가지고 태어난다. 코드적(?)으로 설명하면 모든 함수는 **`프로토타입(prototype)` 이라는 프로퍼티**를 갖고 있다. 프로토타입이 실제로 어떻게 구현되어 있는지에 대해서 코드와 브라우저에서 출력되는 결과값을 통해서 알아보자.

```javascript
function Human(name) {
  this.name = name;
}

console.dir(Human); // 1)

const human1 = new Human('jjanmo');
console.dir(human1); // 2)
```

<br />

![prototype1](../screenshots/constructor_prototype.png)

위 이미지는 1번 코드의 결과값으로 Human 생성자 함수에 대해서 살펴볼 수 있다. `f Human(name)` 을 열어보면 그 밑에 있는 모든 것은 해당 함수의 프로퍼티이다. 그 중에 `prototype` 이라는 프로퍼티(파란 박스)와 `__proto__` 프로퍼티(빨간 박스)를 볼 수 있다. 또한 `prototype` 안에는 다시 `constructor` 라는 프로퍼티가 있다. 이 각각은 무슨 관계를 가지고 있길래 Human 생성자 함수의 프로퍼티로서 존재하는 것일까?

// 다이어그램 추가

![prototype2](../screenshots/instance_prototype.png)

위 이미지는 Human 생성자 함수로부터 생성된 인스턴스(객체)에 대한 출력값이다. 이 객체의 프로퍼티를 살펴보면 name 외에도 `__proto__` 프로퍼티가 있다. 그런데 자세히 살펴보면 이 프로퍼티는 어디서 본 것 같지 않은가? 이것은 `Human 생성자 함수의 prototype 프로퍼티`를 참조한다. 잉?? 이것은 무슨말이지??

다시 한 번 `__proto__`에 대해서 정리해보자. `__proto__`는 객체가 생성될 때, 모두 갖게 되는 프로퍼티이다. 이 프로퍼티는 그 객체를 만든 생성자 함수의 prototype 프로퍼티(즉, 프로토타입 객체)를 참조한다. 그래서 이를 프로토타입 링크(Prototype Link)라고 부르기도 한다. 또한 `__proto__`를 `[[prototype]]` 표현하기도 한다. 참고로 `__proto__`를 `던더프로토`라고도 부른다. 지금까지 말로 설명한 것을 다시 한 번 다이어그램으로 정리해보자.

// 다이어그램 정리

<br />

## Prototype Chain