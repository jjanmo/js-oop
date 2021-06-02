# What is `this`?

> 자바스크립트에서의 this를 알아봅시다.

자바스크립트에서의 this는 그 this가 호출되는 시점에 결정된다. 즉 **어떻게 this가 호출되는지**에 따라서 결정된다.

## 1. dot notation

## 2. 일반적인 호출

## 3. apply(),

## 4. 생성자 함수에 의한 호출

---

# this for beginner

## `this` 란 무엇인가?

누군가 이렇게 물어본다면 이것은 `우문`이라고 생각한다. 여기서 `현답`을 하자면 `this가 어디서 어떻게 사용되나요?`라고 다시 물어봐야할 것이다. 이 말이 이해가 된다면 this를 어느 정도 알고있다고 말할 수 있지 않을까 싶다.

> 물론 나도 아직 잘모른다.😅 그러니까 이제부터 정리해보자 🚀

- [MDN 공식문서](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)의 말을 빌리자면,
  the value of `this` is determined by `how a function is called` 라고 써져있다. 즉 `함수가 어떻게 호출되는가`에 따라서 this의 값이 결정된다는 말이다.
- 다른 말로 표현하자면 this의 값은 `this가 불리는 문맥`에 따라서 다르게 해석된다는 말이기도 하다.
- `this`는 대부분의 경우에 특정 객체를 가르킨다.

## 함수가 호출되는 방식에 따른 this

### Dot notation을 통한 메서드 호출

> 가장 많이 사용되는 방식으로, 보통 객체 안의 메소드를 호출할 때 `.` 을 통해서 그 객체의 프로퍼티에 접근한다. 이 때 `.` 의 `바로 앞의 객체`가 `this`에 해당하는 것이 된다. 이러한 형식을 `Implicit Binding`이라고 한다.

```javascript
function hello() {
  console.log(`Hello my name is ${this.name}`);
}

var yang = {
  name: 'jjanmo',
  greeting: hello,
};

var kim = {
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

### call(), apply()를 이용한 함수 호출

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

var foo = {
  number: 100,
  get() {
    console.log(this.number);
  },
};

foo.get(); //2. this? foo / 100

var bar = foo.get;
bar(); //3. this? window / 55

var baz = bar.bind(foo);
baz(); //4. this? foo / 100
```

> 1번의 경우 전역에서 this를 사용했기 때문에 this는 window를 말한다.(엄격모드 아닌 경우)

> 2번에서 `dot notation`을 통해서 메소드를 호출했기 때문에 `.` 바로 앞의 객체인 `foo`가 `this`를 나타낸다.

> 3번은 변수 bar에 foo안의 get메소드를 할당하였지만, 실제로 함수를 호출하는 부분은 baz()로, `전역에서 호출`했기 때문에 여기서 `this`는 `window`를 의미하게 된다.

> foo안의 number 프로퍼티가 출력되게 하고자 한다면, **this를 바인딩**시켜줘야한다. 이런 경우 `bar.bind(foo)`식으로 바인딩시켜 사용하게 된다. 이 때의 `this`는 `foo`를 의미하게 되고 이를 명시적으로 호출해줘야 제대로 된 결과인 `100`이 출력된다.

<br>

### new 키워드를 통한 함수 호출

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

### 일반적인 함수 호출(단순호출)

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

### Arrow Function(화살표함수)에서의 this

> 화살표함수에서는 지금까지 살펴봤던 this와는 약간 다른 양상이 보여진다. 지금까지의 this는 함수가 호출되는 상황에 따라서 동적으로 그 의미가 결정되었다. 하지만 화살표함수에서의 this는 언제나 정적으로 결정된다. 즉 화살표함수의 this는 `화살표함수의 상위 스코프의 this`를 따르게된다. 이런 이유로 화살표함수는 `자신만의 this`가 없다고 말한다.

> 이렇게 this에 바인딩하는 형식을 `Lexical binding`이라고 부른다.(`Lexical Environment`와 유사)

> 자세한 부분은 [화살표함수편](arrowfunction.md)에서 계속된다.

# Quiz

[**this** Quiz](thisquiz.md)

# Ref

- [바닐라코딩 this 시리즈](https://www.youtube.com/watch?v=ayyuU0xdbIU&t=304s)

- [Understanding the "this" keyword, call, apply, and bind in JavaScript](https://tylermcginnis.com/this-keyword-call-apply-bind-javascript/)

- [함수 호출 방식에 의해 결정되는 this](https://poiemaweb.com/js-this)

- [Function.prototype.apply()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)

- [자바스크립트 this 바인딩 우선순위](http://jeonghwan-kim.github.io/2017/10/22/js-context-binding.html)

# `this` Quiz

> 이 포스터는 철저하게 주어진 코드에서 `this`가 무엇인지를 찾아가는 방식에 대한 생각의 흐름을 정리할 것이다. 어떻게 보면 문제 풀이와 같은 느낌이 들 수도 있다.

> 각 문제에 대한 참조는 맨밑을 참고하시면 되고 참조가 없는 문제는 직접 생각해본 것들이다. 또한 문제를 위한 문제인 경우도 있기 때문에 이를 감안하고 철저하게 `this`를 찾는 훈련을 해보자.

## OneMoreTime Summary

> 문제에 들어가기 앞서 this에 대해서 정리해보자.

1. `this`는 일반적으로 어떠한 객체를 가르킨다.

2. `this`는 this가 어디서 쓰였는지가 아니라 `어떻게 호출되었는지`가 중요하다. 정확하게 `this`는 `함수 호출 시점`에 바인딩되고 전적으로 `함수를 호출한 코드`에 의해서 결정된다. 그렇기때문에 우리가 해야할 일은 `어떻게 함수가 호출되었는지`를 누구보다 빠르고 명확하게 파악하는 일이다.

3. 함수를 호출하는 방법은 크게 4가지가 존재한다. 첫번째 foo() bar() 와 같은 `일반적인 호출`이 있다. 두번째는 메서드 호출처럼 `dot-notation`으로 호출하는 방식이 있다. (ex. foo.bar(), bar.foo.baz()... ) 세번째는 `new 연산자`로 호출하는 방법있다. 마지막으로 `명시적 바인딩`이라고 부르는 `call(), apply(), bind()`을 이용한 호출이 있다.

4. 화살표함수의 경우인 `함수가 지니고 있는 this가 없다`. 이 말은 자체적으로 this를 결정하지 않을 뿐 `상위스코프의 this`를 가져와서 사용한다.

## Question #1

```javascript
1 function logThis(){
2   console.log(this);
3 }

4 const myObj = {
5  logThis
6 }

7 myObj.logThis()
```

## Solution #1

1. 먼저 this가 있는 함수가 어디서 호출되었는지를 찾아본다. : **7번라인**
2. 그럼 `어떻게 호출`되었나? **dot-notaion인 myObj.호출()** 이라고 되어있다.
3. 그렇다면 함수 logThis 안의 this는 `호출부 . 바로 앞의 객체`인 **myObj** 를 나타낸다.

## Question #2

```javascript
1  function logThis(){
2    console.log(this);
3  }
4
5  const myObj = {
6   foo: function(){
7     logThis();
8   }
9  }
10
11 myObj.foo()
```

## Solution #2

1. this가 들어있는 함수가 myObj의 메소드 안에서 호출되었다.
2. 하지만 `어떻게 호출`되었는가? 그냥 **일반적인 방식**으로 호출되었다. `logThis()`
3. 함수 logThis가 어디에 있든 관계없다. 일반적으로 호출되었다면 this는 **window(전역객체)** 이다.

## Question #3

```javascript
1 const logThis = () => {
2     console.log(this);
3 };
4
5 const myObj = {
6     foo: logThis,
7 };
8
9 myObj.foo();
```

## Solution #3

1. 9번 라인에 보면 foo 메소드가 `myObj.foo() 라고 호출`되었다. 여기서 foo 메소드는 this가 들어있는 함수 logThis이다.
2. 결국 `myObj.logThis() 처럼 호출`된 것과 같다.
3. `dot-notation` 에 의해서 this는 `myObj`를 나타낸다.

라고 위에 처럼 생각할 수 있다. **위의 설명은 잘못된 것이다**. 그 이유는 바로 `화살표함수` 때문이다. 화살표함수는 위의 모든 것을 바꿔놓는다.
앞에서도 말했듯이 화살표함수는 this가 없고 상위 스코프의 this를 받아서 사용한다. 다시 설명해보면 아래와 같다.

> 참고로 위의 설명은 내가 화살표함수를 안보고 그냥 'dot-notation이네' 하고 this를 성급하게 결론지어서 틀린 경우이다. **항상 함수가 화살표 함수로 되어있는지 여부**를 잘 살펴봐야한다. 😅

1.  9번 라인에 보면 foo 메소드가 `myObj.foo() 라고 호출`되었다. 메소드 foo는 함수 logthis이다.
2.  함수 logThis는 화살표함수로 되어있기 때문에 상위 스코프를 찾아야 한다.
3.  함수 logThis는 전역에서 선언된 함수이기 때문에 `상위 스코프는 전역 스코프`이기 때문에 여기서 `this`는 `전역 객체인 window를 참조`한다.
4.  결국 최종적으로 출력되는 값은 `window`이다.

## Question #4

```javascript
1 function logThis() {
2     console.log(this);
3 }
4
5 const myObj = {name: 'jjanmo'};
6
7 logThis.apply(myObj);
```

## Solution #4

1. this를 가진 함수의 호출부를 살펴보면 `apply() 메소드`를 사용하여 **명시적**으로 this를 바인딩하였다.
2. 함수 logThis를 일반적 방법으로 호출하면 this는 window를 가르키지만, 이렇게 바인딩을 하면 apply() 메서도의 인자로 들어온 `myObj`가 this에 해당한다.
3. **결론은 this는 myObj를 가르킨다**.

## Question #5

> 위의 문제(4번)를 풀고 나면 궁금증이 생길 것이다. 함수 logThis를 화살표함수로 바꾼다면 this는 무엇을 의미하게 될까? 궁금하지 않았다면 아래 퀴즈를 그냥 풀어보면 된다.😁

```javascript
1 const logThis = () => {
2     console.log(this);
3 };
4
5 const myObj = {name: 'jjanmo'};
6
7 logThis.apply(myObj);
```

## Solution #5

위의 코드는 `this가 화살표 함수와 명시적 바인딩 중 어느 것을 따르냐`에 대한 문제이다. 결론을 이야기하면 `화살표 함수가 명시적 바인딩보다 우선하기 때문에` 명시적 바인딩인 apply() 의 동작과는 관계없이 `this는 상위 스코프의 this인 window`를 가르키게 된다.

#### 그렇다면 더 중요한것은 왜 이렇게 되는가인 것 같다.

> 위에서 말했듯이 **화살표함수는 자신이 소유한 this가 없다**. 즉 상위스코프로부터 상속(?)받아서만 사용할 수 있다. 그렇기 때문에 명시적으로 바인딩하더라고 this가 없기 때문에 바인딩이 안되는 것이다.

## Question #6

```javascript
1 function logThis() {
2     console.log(this);
3 }
4
5 const someObj = new logThis();
```

## Solution #6

1. new 연산자 역시 함수 호출이다. 새로운 객체를 생성하는 함수라고 생각하면 된다.
2. 여기서는 someObj를 생성해서 this를 이것에 바인딩한다.
3. 결론은 `this는 someObj` 이다.

## Question #7

```javascript
1  function logThis() {
2      'use strict';
3      console.log(this);
4  }
5
6  function myFunc() {
7      logThis();
8  }
9
10 const someObj = new myFunc();
```

## Solution #7

1. new 연산자에 의해서 myFunc()라는 함수가 호출된다.
2. 그 안의 함수 logThis()가 일반적인 호출방식으로 호출된다. 그렇기때문에 여기서 this는 window를 의미한다.
3. 그런데 함수 logThis에는 `'use strict'(엄격모드)`라고 적혀있다. 엄격모드에서 `window는 undefined`를 출력한다.

## Question #8

```javascript
1  function logThis() {
2      console.log(this);
3  }
4
5  class myClass {
6      logThat() {
7          logThis();
8      }
9  }
10
11 const myClassInstance = new myClass();
12 myClassInstance.logThat();
```

## Solution #8

1. 12번 라인에서 myClassInstance 라는 객체가 생성된다.
2. 13번라인에서 그 객체안의 메서드인 logThat()을 호출한다.
3. logThat()안에서 함수 logThis를 호출한다. 이 때 일반적인 방식으로 호출한다.
4. 함수를 어디서 호출하던지 호출하는 방식이 가장 중요한다. 함수 `logThis는 일반적인 방식으로 호출`했기 때문에 그 함수 안의 this는 `window`를 나타낸다.

## Question #9

```javascript
1  function logThis() {
2      console.log(this);
3  }
4
5 class myClass {
6      logThat() {
7          logThis.call(this);
8      }
9  }
10
11 const myClassInstance = new myClass();
12 myClassInstance.logThat();
```

## Solution #9

1. 12번라인에서 객체 myClassInstance의 메서드인 logThat이 호출된다.
2. 메서드 logThat 안에서 함수 logThis가 호출된다. 이 때 `logThis는 apply에 의해서 바인딩`되어 호출된다.
3. 첫번째로 찾아야하는 것은 `logThat안의 this는 무엇인가` 이다. 그렇다면 다시 logThat은 어떻게 호출되었는지 확인한다.
4. `logThat은 dot-notation 에 의해서 호출`되었다. 그렇기때문에 logThat안에서의 `this`는 `객체 myClassInstance`를 가르킨다.
5. 이 this를 가지고 바인딩했기 때문에 `logThis 안의 this` 역시 `객체 myClassInstance`를 가르키게 된다.

## Question #10

```javascript
1  class myClass {
2      logThis = () => {
3          console.log(this);
4      };
5  }
6
7  const myObj = {name: 'jjanmo'};
8
9  const myClassInstance = new myClass();
10 myClassInstance.logThis.call(myObj);
```

## Solution #10

1. 9번 라인에서 `new연산자에 의해서 myClass가 호출`되면서 객체 myClassInstance가 생성된다
2. `myClass안의 this`는 `myClassInstance`를 가르킨다.
   > 자바스크립트에서 class라는 문법이 ECMAScript6에 추가되었다. 여기선 단순하게 함수의 일종이라고 생각하면 된다.
3. 10번 라인에서 myClass안의 메소드인 logThis를 `call에 의해서 명시적 바인딩을 하여 호출`한다.
4. 그런데 `logThis 메서드`는 `화살표함수`로 만들어진 메서드이다. 그렇기 때문에 명시적바인딩과 관계없이 `상위스코프의 this`를 따른다.
5. 2번에서 말했듯이 `myClass 스코프안의 this`는 `myClassInstance`를 가르키기 때문에 `화살표함수 logThis`의 `this 역시 myClassInstance`를 가르키게 된다.

## Question #11

```javascript
function logThis() {
  console.log(this);
}

const btn = document.getElementById('btn');
btn.addEventListener('click', logThis);
```

## Solution #11

> 여기서 logThis는 이벤트리스너의 콜백이다. 콜백은 콜백을 사용할 시점이 되면 callback() 형식으로 호출된다. 즉 이 호출방식은 일반적인 함수 호출이다. 그러면 콜백안의 this는 window를 가르키는게 일반적이다. 하지만 이런 경우(이벤트 리스너)에는 이벤트 타겟을 가르킨다.

> 위에서 `this`는 `btn element`를 가르킨다.

> 이러한 현상은 일반적인 것에서 벗어나는 것으로 그냥 기억해두면 된다. 브라우저에서 그렇게 실행이 되도록 시키는 경우라고 생각하면 된다. 하지만 **중요한 것은 이벤트 리스너에서 this를 사용하는 경우는 좋은 경우가 아니고 사용하지 않는 것을 권장한다고 한다**.

## Question #12

```javascript
const logThis = () => {
  console.log(this);
};

const btn = document.getElementById('btn');
btn.addEventListener('click', logThis);
```

## Solution #12

> 이 경우는 위의 상황을 연결해서 생각하면 된다. 이벤트 리스너의 콜백인 logThis 안의 this는 이벤트의 타겟을 가르킨다. 하지만 이 때는 화살표함수이기 때문에 그 상위 스코프의 this를 따라간다. 여기서는 그것이 window이기 때문에 `this는 window`를 가르킨다.

> 다시 한 번 말하지만 11번과 12번은 상황에 따른 문제를 만들어본 것이지 실제로 이런 코드를 사용하는 것은 권장되지 않는다. <del>이런 코드가 발견되면 쌍욕을 하고...</del> 이런 생각만 하시고 수정하는 것을 추천한다.

# Ref

- [Question 1~12](https://dev.to/sag1v/javascript-the-this-key-word-in-depth-4pkm)
