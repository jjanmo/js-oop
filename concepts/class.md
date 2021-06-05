# How to use `class`

자바스크립트에서 클래스 문법(syntax)를 어떻게 사용하는지에 대해서 알아보자. 우선 기본적으로 `아래의 키워드`가 무엇을 의미하는지 알고 코드상으로 어떻게 구현하는지에 초점을 맞춰서 알아보도록 하자.

```
  constructor
  extends
  private
  public
  static
  extends
  super
  overridding
```

```javascript
class Coin {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }

  getCoin() {
    return this.name;
  }

  getCoinPrice() {
    return this.price;
  }

  setCoin(name) {
    this.name = name;
  }

  setCoinPrice(price) {
    this.price = price;
  }
}
```

클래스 문법은 단지 syntac sugar인가?
