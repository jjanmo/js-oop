# What is `this`?

`누군가 this가 무엇인가요?` 라고 물었을 때, 바로 this는 XX라고 대답을 한다면 그 사람은 **자바스크립트의 신 🧞‍♂️** 이 아닐까 생각한다. 저 질문에는 질문으로 답을 하는게 맞다고 생각한다. 그 질문이 이렇다. `this가 어디서 어떻게 사용되나요?` 이 질문을 왜 해야하는지 이해가 된다면 this를 어느 정도 알고 있다고 말할 수 있지 않을까 싶다.

[MDN 공식문서](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)의 말을 빌리자면,
the value of `this` is determined by `how a function is called` 라고 써져있다. 즉 `함수가 어떻게 호출되는가`에 따라서 this의 값이 결정된다는 말이다. 다른 말로 표현하자면 this의 값은 `this가 불리는 문맥`에 따라서 다르게 해석된다는 말이기도 하다.

> 참고로 this는 대부분의 경우 `특정 객체`를 가르킨다.

<br/>

# 함수(메서드)가 호출되는 방식

> 간단한 내용이지만 용어 정리를 하자면, **함수와 메서드는 결국 같은 것**이다. 일반적으로 `function` 키워드를 통해서 구현하면 함수라고 부르고 `객체 안에 함수`가 있으면 메서드라고 부른다.

> this의 의미를 해석하기 위해선 위에서 언급한 함수의 호출 방식에 대해서 알아야 한다. 자바스크립트에서는 일반적으로 4가지의 방법으로 함수가 호출된다.

> `함수가 어떻게 호출되는가`의 의미는 `함수를 호출한 주체가 누구인가`와 같은 의미로 해석할 수 있다. 이해하는 방식이 다르기 때문에 좀 더 자신에게 맞는 방식으로 이해하면 될 듯하다. 😅

## 1. 일반적인 함수 호출(단순호출)

> 엄격모드가 아닌 경우, `this`는 기본적으로 `전역객체`를 나타낸다.

> `일반적으로` 함수가 호출될 때, 예를 들어 `foo()`, this는 `전역객체`를 가르킨다.

> 전역객체란 브라우저에서는 `window 객체`이고 node에서는 `global 객체` 를 의미한다.

```javascript
console.log(this === window); //true

var number = 100;
console.log(this.number); //100
console.log(window.number); //100
```

```javascript
var number = 100;

function foo() {
  var number = 55;
  console.log(this.number);
}

foo(); //this === window 이고 100 출력
```

```javascript
var movie = 'zootopia';

var obj = {
  movie: 'lionking',
  getMovie() {
    console.log(this.movie);
  },
};

setTimeout(obj.getMovie, 1000); //zootopia
```

> 콜백함수 안에서 함수를 호출하면 어떻게 될까? `lionking`이라는 영화가 찍히길 예상했지만 실제값은 `zootopia`이다. `obj.getMovie` 라는 메소드의 참조값만을 콜백으로 넣어준 것이고 실제론 setTimeout()가 `obj.getMovie`를 `callback()`이라고 호출하기 때문에 this는 `전역객체`와 바인딩된다.

```javascript
var number = 10;

var obj = {
  number: 55,
  foo() {
    console.log(this.number); //1
    function bar() {
      console.log(this.number); //2
    }
    bar();
  },
};

obj.foo(); //output? 1-55 2-10
```

> 내장함수인 `bar()`는 호출하는 부분이 `obj객체 안`에 존재한다. 즉 그 안에서 호출하기 때문에 그것만으로 this가 결정된다. `foo()`는 dot notation에 의해서 this는 바로 앞 객체인 `obj`를 가르킨다. **함수를 어떻게 호출하는냐**에 obj안에 위치에한 this값이 달라지게 된다.

#### use strict mode(엄격모드)에서의 this

> 엄격모드란 일반적으로 일어나는 버그를 방지하기 위해서 사용하는 모드를 말한다. 여기서는 this가 window를 가르키지 않고 `this === undefined`를 말한다.

## 2. `Dot notation`을 통한 메서드 호출

> 가장 많이 사용되는 방식으로, 보통 객체 안의 메소드를 호출할 때 `.` 을 통해서 그 객체의 프로퍼티에 접근한다. 이 때 `.` 의 `바로 앞의 객체`가 `this`에 해당하는 것이 된다. 이러한 형식을 `Implicit(암묵적/함축적) Binding`이라고 표현한다.

```javascript
function hello() {
  console.log(`Hello my name is ${this.name}`);
}

const yang = {
  name: 'jjanmo',
  greeting: hello,
};

const kim = {
  name: 'michael',
  greeting: hello,
  lee: {
    name: 'suji',
    greeting: hello,
  },
};

yang.greeting(); //Hello my name is jjanmo
kim.greeting(); //Hello my name is michael
kim.lee.greeting(); //Hello my name is suji
```

> 메서드를 호출하는 부분이 가장 중요하다. `yang.greeting()`에서 `this.name`은 `yang.name`과 같다. 또 `kim.greeting()`에서 `this.name`은 `kim.name`과 같다. 마찬가지로 `.`이 2개 있다고 하더라고 호출한 메서드의 바로 앞부분에 무엇을 참조하는지를 확인하면 된다. `kim.lee.greeting()`에선 `this.name`은 `lee.name`과 같다.

<br>

## 3. call(), apply()를 이용한 함수 호출

> `call(), apply(), bind()`는 모든 함수 객체의 프로토타입 객체인 `Function.prototype 객체의 메소드`이다. 즉, 모든 function 객체는 이를 가지고 있다.

> `명시적인`이라는 `explicit`의 뜻처럼 call()과 apply()메소드를 이용해서 this에 명시적으로 특정값을 바인딩하기 때문에 `Explicit Binding`이라고 한다.

> `call(), apply()`의 모두 기본적인 기능은 함수 호출이다. 단지 this와 묶일 객체를 명시적인 첫번째 인자로서 알려주는 것뿐이다.

|          |                  apply()                   |                     call()                     |                                                             bind()                                                             |
| :------: | :----------------------------------------: | :--------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------: |
|  syntax  |      func.apply(thisArg, [argsArray])      |   func.call(thisArg[, arg1[, arg2[, ...]]])    |                                            func.call(thisArg[, arg1[, arg2[, ...]]]                                            |
|   arg1   |         this와 묶일(바인딩할) 객체         |           this와 묶일(바인딩할) 객체           |                                                   this와 묶일(바인딩할) 객체                                                   |
|   arg2   |             배열 1개(유사배열)             |                  각각의 값들                   |                                                          각각의 값들                                                           |
| 작동방식 | this로 지정한 값과 인수로 함수를 호출한다. | this로 지정한 값과 인수(들)로 함수를 호출한다. | this로 지정한 값과 인수(들)로 **새로운 함수를 생성**한다. 바로 호출하지는 않는다. 호출하고자 한다면 명시적으로 호출해줘야한다. |

> arg1이 없는 경우 `전역객체(window)`에 `this를 바인딩`한다.

```javascript
this.number = 55; //1.this? window

const foo = {
  number: 100,
  get() {
    console.log(this.number);
  },
};

foo.get(); //2. this? foo / 100

const bar = foo.get;
bar(); //3. this? window / 55

var baz = bar.bind(foo);
baz(); //4. this? foo / 100
```

> 1번의 경우 전역에서 this를 사용했기 때문에 this는 window를 말한다.(엄격모드 아닌 경우)

> 2번에서 `dot notation`을 통해서 메소드를 호출했기 때문에 `.` 바로 앞의 객체인 `foo`가 `this`를 나타낸다.

> 3번은 변수 bar에 foo안의 get메소드를 할당하였지만, 실제로 함수를 호출하는 부분은 baz()로, `전역에서 호출`했기 때문에 여기서 `this`는 `window`를 의미하게 된다.

> foo안의 number 프로퍼티가 출력되게 하고자 한다면, **this를 바인딩**시켜줘야한다. 이런 경우 `bar.bind(foo)`식으로 바인딩시켜 사용하게 된다. 이 때의 `this`는 `foo`를 의미하게 되고 이를 명시적으로 호출해줘야 제대로 된 결과인 `100`이 출력된다.

<br>

## 4. new 키워드를 통한 함수 호출

> 자바스크립트에서 new연산자를 사용하여 함수를 호출하는 경우, **새로운 객체를 생성**하여 그 새로운 객체와 `this`를 묶는다. 그래서 `new binding`이라고 명명한다.

```javascript
function foo(name) {
  this.name = name;
}

var jjanmo = new foo('jjanmo');
console.log(jjanmo); // { name : 'jjanmo' }
```

> `new연산자`를 사용하여 함수를 호출하게 되면 숨겨진 2가지가 나타나게 된다. 첫번째는 new연산자에 의해서 `새로운 빈객체({})`가 생성된다. 그 `빈객체`에 `this를 바인딩`한다. 이 때 호출되는 함수를 `생성자함수`라고 한다. 두번째는 생성자함수는 특별하게 return값이 없어도 `this`를 반환한다. 만약에 특정값으로 return값을 지정해준다면 그 지정값이 반환되기는하나 그 함수는 생성자함수의 역할을 수행하지 못하게 된다. 이렇게 new연산자(생성자함수)를 통하면 `새로운 객체`가 생성되는데 이를 `instance`라고 한다.

> 사실 `생성자함수`라 함은 위의 함수인 `foo`가 아니라 **혼란을 방지하기위해서** 일반적으로 `첫글자`를 `대문자`로 작성한다.`(Foo)` 하지만 new연산자를 사용하면 대문자에 상관없이 같은 방식으로 작동하긴한다.

```javascript
function Movie(title, released) {
  this.title = title;
  this.released = released;
}

var parasite = new Movie('기생충', 2019);
console.log(parasite); //Movie {title: "기생충", released: 2019}
var darkknight = new Movie('darkknight', 2008);
console.log(darkknight); //Movie {title: "darkknight", released: 2008}
```

## 5. Arrow Function(화살표함수)에서의 this

> 화살표함수에서는 지금까지 살펴봤던 this와는 약간 다른 양상이 보여진다. 지금까지의 this는 함수가 호출되는 상황에 따라서 동적으로 그 의미가 결정되었다. 하지만 화살표함수에서의 this는 언제나 정적으로 결정된다. 즉 화살표함수의 this는 `화살표함수의 상위 스코프의 this`를 따르게된다. 이런 이유로 화살표함수는 `자신만의 this`가 없다고 말한다.

> 이렇게 this에 바인딩하는 형식을 `Lexical binding`이라고 부른다.(`Lexical Environment`와 유사)

<!-- > 자세한 부분은 [화살표함수편](arrowfunction.md)에서 계속된다. -->

<!-- # Quiz

[**this** Quiz](thisquiz.md)

# Ref

- [바닐라코딩 this 시리즈](https://www.youtube.com/watch?v=ayyuU0xdbIU&t=304s)

- [Understanding the "this" keyword, call, apply, and bind in JavaScript](https://tylermcginnis.com/this-keyword-call-apply-bind-javascript/)

- [함수 호출 방식에 의해 결정되는 this](https://poiemaweb.com/js-this)

- [Function.prototype.apply()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)

- [자바스크립트 this 바인딩 우선순위](http://jeonghwan-kim.github.io/2017/10/22/js-context-binding.html) -->

---
