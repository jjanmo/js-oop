import { data } from './data.js';
(function () {
  // 1) 함수형으로 만들기
  // 2) 객체지향으로 변경

  const $app = document.querySelector('.app');
  const $contents = document.querySelector('.contents');
  const $question = document.querySelector('.question');
  const $options = document.querySelector('.options');
  let order = 0;

  function handleClick(e) {
    console.log(e.target);
  }

  function makeQuiz(data) {
    $contents.innerHTML = '';
    const $question = document.createElement('div');
    $question.classList.add('question');
    $question.textContent = data.question;

    const $options = document.createElement('div');
    data.options.forEach((option, index) => {
      const $option = document.createElement('button');
      $option.classList.add('option');
      $option.textContent = `${index + 1}. ${option}`;
      $options.appendChild($option);
    });

    $contents.appendChild($question);
    $contents.appendChild($options);
  }

  function init() {
    $app.addEventListener('click', handleClick);
    makeQuiz(data[0]);
  }

  init();
})();
