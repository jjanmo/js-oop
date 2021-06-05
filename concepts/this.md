# What is `this`?

`누군가 this가 무엇인가요?` 라고 물었을 때, 바로 this는 XX라고 대답을 한다면 그 사람은 **자바스크립트의 신 🧞‍♂️** 이 아닐까 생각한다. 저 질문에는 질문으로 답을 하는게 맞다고 생각한다. 그 질문이 이렇다. `this가 어디서 어떻게 사용되나요?` 이 질문을 왜 해야하는지 이해가 된다면 this를 어느 정도 알고 있다고 말할 수 있지 않을까 싶다.

[MDN 공식문서](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)의 말을 빌리자면,
the value of `this` is determined by `how a function is called` 라고 써져있다. 즉 `함수가 어떻게 호출되는가`에 따라서 this의 값이 결정된다는 말이다. 다른 말로 표현하자면 this의 값은 `this가 불리는 문맥`에 따라서 다르게 해석된다는 말이기도 하다.

> 참고로 this는 대부분의 경우 `특정 객체`를 가르킨다.

<br/>

# 함수(메서드)가 호출되는 방식

> 간단한 내용이지만 용어 정리를 하자면, **함수와 메서드는 결국 같은 것**이다. 일반적으로 `function` 키워드를 통해서 구현하면 함수라고 부르고 `객체 안에 함수`가 있으면 메서드라고 부른다.

> this의 의미를 해석하기 위해선 위에서 언급한 함수의 호출 방식에 대해서 알아야 한다. 자바스크립트에서는 일반적으로 **4가지의 방법**으로 함수가 호출된다.

> `함수가 어떻게 호출되는가`의 의미는 `함수를 호출한 주체가 누구인가`와 같은 의미로 해석할 수 있다. 이해하는 방식이 다르기 때문에 좀 더 자신에게 맞는 방식으로 이해하면 될 듯하다. 😅

<br >

## 0. 전역 문맥으로서의 this

엄격모드('use strict')를 제외하고 전역 문맥(전역 스코프)에서는 `this`는 기본적으로 `전역 객체`를 나타낸다.

> 전역 객체란 브라우저에서는 `window 객체`이고 node에서는 `global 객체` 를 의미한다.

```javascript
console.log(this === window); // 1)

var number = 100;
console.log(window.number); // 2)
console.log(this.number); // 3)
```

<details>
<summary>정답</summary>
1) true <br />
2) 100 <br />
3) 100 <br />
</details>

<br/>

### 엄격모드에서의 this

엄격모드란 일반적으로 일어나는 버그를 방지하기 위해서 사용하는 모드를 말한다. 엄격모드에서의 전역 문맥으로서의 this는 기존과 다르게 window를 가르키지 않고 `undefined`를 말한다.

<br/>

## 1. `Dot notation` 을 통한 메서드 호출

가장 많이 사용되는 방식으로, 보통 객체 안의 메소드를 호출할 때 `.` 을 통해서 그 객체의 프로퍼티에 접근한다. 이 때 `.` 의 `바로 앞의 객체`가 `this`에 해당하는 것이 된다. 이러한 형식을 `Implicit(암묵적/함축적) Binding`이라고 표현한다.

메서드를 호출할 때, 메서드를 호출하는 주체가 `. 앞의 객체`가 된다.

<br />

```javascript
  function recommend() {
    console.log(`Today's coin is ${this.coin}`);
  }

  var monday = {
    coin: 'DOGE',
    log: recommend,
  };

  var tuesday = {
    coin : 'BTC'
    log : recommend,
    am: {
      coin: 'ADA',
      log: recommend,
    },
    fm: {
      coin: 'DOT',
      log: recommend,
    },
  };

  monday.log(); // 1)
  tuesday.log();  // 2)
  tuesday.fm.log(); // 3)
```

  <details>
  <summary>정답</summary>
  1) DOGE <br />
  2) BTC <br />
  3) DOT <br />

  <br />

> **메서드를 호출하는 부분**이 가장 중요하다. `monday.log()`에서 log 함수의 점(.) 앞은 `monday` 라는 객체이다. 이 말은 log() 함수가 호출될 때의 this는 monday를 나타낸다. 즉 `함수 안의 this.coin`은 `monday.coin`을 의미하는 것이다. 밑에 다른 예시도 마찬가지이다. 바로 앞의 객체가 함수가 호출될 때의 this를 의미한다.

> 지금까지 설명을 들으면 약간 주입식 교육같은 단답형 느낌을 받을 수 있다. 하지만 우선 이렇게 단순하게 이해(or 암기)하는 것으로 넘어가도록 하자. 내부적으로 왜 이렇게 되는지를 알고 싶다면 `실행 컨텍스트`에 대해서 찾아보는 것을 추천한다.

</details>

<br />

## 2. 일반적인 함수 호출(단순 호출)

`일반적으로 함수가 호출`될 때, 예를 들어 `foo()`, `log()` 이렇게 호출되는 경우에 그 때의 this는 브라우저에선 `window 객체`, node에서는 `global 객체`를 의미한다.

### 1)

```javascript
var coin = 'BTC';

function log() {
  var coin = 'ETH';
  console.log(this.coin); //1)
}

log();
```

  <details>
  <summary>정답</summary>
  BTC

  <br/>
  <br/>

> 항상 함수가 호출될 때가 중요하다. 첫번째로 언급한 점(.) 없이 일반적인 함수 형태로 호출된다. 그렇다면 이 경우의 this는 브라우저에서는 window 객체를 말한다.

> 여기서 이렇게도 생각할 수 있다. 일반적인 함수 호출을 `window.log()`처럼 표현할 수 있다. 그런데 앞의 window가 생략될 수 있기 때문에(당연한 전역 객체이기때문에 생략 가능) log()로 표현되는 것이라고 말하기도 한다. 이렇게 본다면 결국 첫번째의 dot notation의 연장선상에 있다고 생각할 수 있다.

  </details>

<br />

### 2)

```javascript
var coin = 'BTC';

var futures = {
  coin: 'ETH',
  buy: function () {
    console.log(this.coin); // 1)
    function sell() {
      console.log(this.coin); // 2)
    }
    sell();
  },
};

futures.buy();
```

  <details>
  <summary>정답</summary>
  1) ETH <br />
  2) BTC <br />

  <br />

> this를 알기 위해선 확인해야할 부분은 항상 `함수 호출 부분`이다. `futures.buy()` 라고 호출될 때, buy() 함수 안에 있는 this는 `dot notation`에 의해서 `futures`를 의미한다. 그렇기 때문에 1번은 `futures.coin인 ETH`를 의미한다. 그렇다면 그 밑에 정의된 sell() 함수는 어떻게 호출되는가? `일반적인 함수로 호출`된다. 그렇다면 자연스럽게 이 함수 안의 this는 (브라우저에서) window를 나타낸다. 즉 `window.coin 인 BTC`를 출력하게 된다.

  </details>

<br/>

### 3)

```javascript
var movie = 'zootopia';

var obj = {
  movie: 'lionking',
  getMovie() {
    console.log(this.movie);
  },
};

setTimeout(obj.getMovie, 1000);
```

  <details>
  <summary>정답</summary>
  zootopia
  <br />
  <br />

> setTimeout 안에 인자로 들어오는 함수를 콜백 함수라고 한다. 여기서는 obj.getMovie를 말한다. 이 메서드는 특정시점(1초뒤)이 되면 실행 된다. 그렇다면 this를 알기 위해서 관심가져야 할 것은 `어떻게 이 콜백 함수가 실행되는가`이다. 콜백함수는 내부적으로 `callback() 이라는 코드`로 구현되어 있다. 즉 `일반 함수와 같은 방식`으로 호출된다.

> `lionking`이라는 영화가 찍히길 예상했지만 실제값은 `zootopia`이다. `obj.getMovie` 라는 메소드의 참조값만을 콜백으로 넣어준 것이고 실제론 setTimeout()이 `obj.getMovie`를 `callback()`이라고 호출하기 때문에 this는 `전역객체`와 바인딩된다.

</details>

<br />

## 3. call(), apply(), bind() 를 이용한 함수 호출

`call(), apply(), bind()`는 모든 함수 객체의 프로토타입 객체인 `Function.prototype 객체의 공통 메소드`이다. 즉, 모든 함수 객체는 이를 가지고 있다.

이 메소드를 이용해서 this에 특정값을 명시적으로 바인딩할 수 있다. 그래서 명시적인 이라는 의미를 가진 단어를 이용해서 `Explicit Binding`이라고 한다.

|          |                  apply()                   |                     call()                     |                                                             bind()                                                             |
| :------: | :----------------------------------------: | :--------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------: |
|  syntax  |      func.apply(thisArg, [argsArray])      |   func.call(thisArg[, arg1[, arg2[, ...]]])    |                                            func.bind(thisArg[, arg1[, arg2[, ...]]]                                            |
|   arg1   |         this와 묶일(바인딩할) 객체         |           this와 묶일(바인딩할) 객체           |                                                   this와 묶일(바인딩할) 객체                                                   |
|   arg2   |             배열 1개(유사배열)             |                  각각의 값들                   |                                                          각각의 값들                                                           |
| 작동방식 | this로 지정한 값과 인수로 함수를 호출한다. | this로 지정한 값과 인수(들)로 함수를 호출한다. | this로 지정한 값과 인수(들)로 **새로운 함수를 생성**한다. 바로 호출하지는 않는다. 호출하고자 한다면 명시적으로 호출해줘야한다. |

> arg1이 없는 경우 `전역객체(window)`에 `this를 바인딩`한다.

```javascript
var number = 55;

console.log(this.number); // 1

var foo = {
  number: 100,
  get() {
    console.log(this.number);
  },
};

foo.get(); // 2

var bar = foo.get;
bar(); // 3

foo.get.apply(foo); // 4

var baz = bar.bind(foo);
baz(); // 5
```

  <details>
  <summary>정답</summary>
  1) 전역객체(window) => 55 <br />
  2) foo => 100 <br />
  3) 전역객체(window) => 55 <br />
  4) foo => 100 <br />
  5) foo => 100 <br />

  <br />

> (엄격모드 아닌 경우) 1번의 경우 전역에서 this를 사용했기 때문에 this는 window를 말한다.

> 2번에서 `dot notation`을 통해서 메소드를 호출했기 때문에 `.` 바로 앞의 객체인 `foo`가 `this`를 나타낸다.

> 3번은 변수 bar에 foo 안의 get() 메소드를 할당하였지만, `실제로 함수를 호출하는 부분은 baz()`로, 일반 함수로 호출했기 때문에 여기서 `this`는 `window`를 의미하게 된다.

> 4번은 apply()를 통해서 `명시적으로 foo를 this에 바인딩`하여 바로 바인딩된 함수를 호출한다.

> 5번은 4번과 기본적으로 동일하다. 즉 `명시적으로 this를 foo로 바인딩`한 것이다. 하지만 이 때는 바인딩만하고 바로 실행하지 않는다. `bind()는 this가 새롭게 바인딩된 새로운 함수`를 리턴한다. 그렇기 때문에 일반 함수처럼 호출되지만 바인딩된 것이 우선하기때문에 this는 foo를 가르킨다.

</details>

<br>

## 4. new 연산자를 통한 함수 호출

(다른 언어에서) 간단하게 생성자란 객체를 처음 생성할 때 호출되는 메소드를 말한다. 자바스크립트에서의 **거의 모든 함수는 생성자가 될 수 있는 능력**을 갖고 있다. (화살표 함수와 단축형 메서드는 생성자가 될 수 없다. 즉 `function 키워드`를 사용하지 않는 함수를 말한다.) 그렇다고 단순히 함수라고 해서 무조건 생성자가 되는 것은 아니다. 함수가 생성자 함수로서 작동하기 위해선 `new 연산자`가 필요하다.

`new 연산자`를 사용하여 함수를 호출하게 되면 `숨겨진 2가지`가 나타나게 된다. 첫번째는 new 연산자에 의해서 `새로운 빈객체({})`가 생성된다. 그 `빈 객체`에 `this를 바인딩`한다. 이 때 호출되는 함수를 `생성자 함수`라고 한다. 두번째는 생성자함수는 특별하게 return 값이 없어도 `this`를 반환한다. 만약에 특정값으로 return 값을 지정해준다면 그 지정값이 반환되기는하나 그 함수는 생성자함수의 역할을 수행하지 못하게 된다. 이렇게 new 연산자(생성자함수)를 통하면 `새로운 객체`가 생성되는데 이를 `instance`라고 한다.

이렇게 자바스크립트에서 new 연산자를 사용하여 함수를 호출하는 경우, **새로운 객체를 생성**하여 그 새로운 객체와 `this`를 묶는다. 그래서 `new binding`이라고 명명한다.

### 1)

```javascript
function foo() {
  console.log(this);
}

foo(); // 1)
new foo(); //2
```

  <details>
  <summary>정답</summary>
  1) window <br />
  2) 생성자 함수 foo에 의해 새롭게 생성된 인스턴스 <br />
  <br />

> 사실 자바스크립트에서 `생성자함수`라고 할 때는 **혼란을 방지하기 위해서** 네이밍 컨벤션으로서 `첫글자`를 `대문자`로 작성한다. 결과적으로 new 연산자를 사용하면 대문자에 여부와 상관없이 같은 방식으로 작동한다.

  </details>

  <br />

### 2)

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

<br />

## 추가1] 화살표 함수에서의 this

## 추가2] 이벤트 리스너에서의 this

# More Practice

[Quiz를 통해서 알아보자 💡](this_quiz.md)

<!-- ### 4) 이벤트리스너에서의 this

```javascript

``` -->

<!-- ## 5. Arrow Function(화살표함수)에서의 this

> 화살표함수에서는 지금까지 살펴봤던 this와는 약간 다른 양상이 보여진다. 지금까지의 this는 함수가 호출되는 상황에 따라서 동적으로 그 의미가 결정되었다. 하지만 화살표함수에서의 this는 언제나 정적으로 결정된다. 즉 화살표함수의 this는 `화살표함수의 상위 스코프의 this`를 따르게된다. 이런 이유로 화살표함수는 `자신만의 this`가 없다고 말한다.

> 이렇게 this에 바인딩하는 형식을 `Lexical binding`이라고 부른다.(`Lexical Environment`와 유사) -->

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
