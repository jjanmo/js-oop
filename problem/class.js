// ref : https://ko.javascript.info/class
// pb1 : 함수 Clock(https://plnkr.co/edit/f8vAR5OXLYTODj52?p=preview&preview)를 Class로 다시 작성하시오

class Clock {
  constructor({ template }) {
    this.template = template;
    this.timer = '';
    this.render = this.render.bind(this); // 1)
  }

  // render = () => {}  // 2) 화살표함수 이용
  render() {
    let date = new Date();

    let hours = date.getHours();
    if (hours < 10) hours = '0' + hours;

    let mins = date.getMinutes();
    if (mins < 10) mins = '0' + mins;

    let secs = date.getSeconds();
    if (secs < 10) secs = '0' + secs;

    let output = this.template.replace('h', hours).replace('m', mins).replace('s', secs);

    console.log(output);
  }

  start() {
    this.render();
    this.timer = setInterval(this.render, 1000);
  }

  stop() {
    clearInterval(this.timer);
  }
}

const myClock = new Clock({ template: 'h:m:s' });
console.log(myClock);
myClock.start();

setTimeout(myClock.stop, 60000);

/**
 *  개념적으로 알고 있으면서도 처음에 바로 맞추지 못한 부분!!
 *
 * 콜백함수에서의 this
 * -> 콜백함수에서의 this는 항상 window( node에서는 undefined)를 나타내게 된다.
 * -> 그렇기 때문에 항상 콜백함수 안에서 this가 사용될 때는 그 문맥을 확인하고 this에 바인딩을 할지 말지를 결정해야한다.
 * -> 1) bind() 를 사용하여 명시적으로 바인딩
 * -> 2) arrow function으로 구현하여서 this가 호출될때가 아닌, lexical binding이 될 수 있도록 만들어준다.
 */
