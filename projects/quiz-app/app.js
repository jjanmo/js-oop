import { data } from './data.js';
(function () {
  // 1) 함수형으로 만들기
  // 2) 객체지향으로 변경

  const $app = document.querySelector('.app');
  const $contents = document.querySelector('.contents');
  const $question = document.querySelector('.question');
  const $options = document.querySelector('.options');
  let order = 0;

  function checkAnswer(clickedTarget, rightAnswer) {
    const clickedAnswer = clickedTarget.textContent.substring(0, 1);
    if (clickedAnswer === rightAnswer) {
      alert('맞았습니다.');
    } else {
      alert('틀렸습니다.');
    }
  }

  function makeQuiz(data) {
    $contents.innerHTML = '';
    const $question = document.createElement('div');
    $question.classList.add('question');
    $question.textContent = data.question;

    const $options = document.createElement('div');
    $options.classList.add('options');
    data.options.forEach((option, index) => {
      const $option = document.createElement('button');
      $option.classList.add('option');
      $option.textContent = `${index + 1}. ${option}`;
      $options.appendChild($option);
    });

    $contents.appendChild($question);
    $contents.appendChild($options);
  }

  function handleClick(e) {
    const target = e.target;
    const answer = data[0].answer;
    console.log(target);
    if (target.className === 'option') {
      checkAnswer(target, answer);
    } else if (target.className === 'arrow') {
      // previous / next
    }
  }

  function init() {
    $app.addEventListener('click', handleClick);
    makeQuiz(data[0]);
  }

  init();
})();
