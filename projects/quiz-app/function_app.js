import { data } from './data.js';

(function () {
  const $app = document.querySelector('.app');
  const $contents = document.querySelector('.contents');
  let order = 1;

  function renderQuiz(data) {
    $contents.innerHTML = '';

    const $iframe = document.createElement('iframe');
    const src = `data:text/html;charset=utf-8,
    <head><base target='_blank' /></head>
    <body><script src='${data.question}'></script>
    </body>`;
    $iframe.src = src;
    $iframe.scrolling = 'auto';
    $contents.appendChild($iframe);

    const $options = document.createElement('div');
    $options.classList.add('options');
    data.options.forEach((option, index) => {
      const $option = document.createElement('button');
      $option.classList.add('option');
      $option.textContent = `${index + 1}. ${option}`;
      $options.appendChild($option);
    });

    $contents.appendChild($options);
  }

  function renderOrder() {
    const $order = document.querySelector('.order');
    $order.textContent = `${order} / ${data.length}`;
  }

  function checkAnswer(target) {
    const clickedAnswer = target.textContent.substring(0, 1);
    const rightAnswer = data[order - 1].answer;
    if (clickedAnswer === rightAnswer) {
      alert('맞았습니다.');
    } else {
      alert('틀렸습니다.');
    }
  }

  function moveQuiz(target) {
    const flag = target.src || target.firstElementChild.src;
    const direction = flag.includes('right') ? 'right' : 'left';
    if (direction === 'right') {
      if (order !== data.length) {
        order++;
        renderQuiz(data[order - 1]);
      }
    } else {
      if (order !== 1) {
        order--;
        renderQuiz(data[order - 1]);
      }
    }
    renderOrder();
  }

  function handleClick(e) {
    const target = e.target;
    if (target.className === 'option') {
      checkAnswer(target);
    } else if (target.className.includes('arrow')) {
      moveQuiz(target);
    }
  }

  function init() {
    $app.addEventListener('click', handleClick);
    renderQuiz(data[order - 1]);
    renderOrder();
  }

  init();
})();
