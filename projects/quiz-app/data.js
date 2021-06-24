const data = [
  {
    question: `function bark() {
      console.log("Woof!");
    }
    bark.animal = "dog";
    `,
    options: [
      '별일 없어요, 이건 완전히 괜찮아요!',
      'SyntaxError 이 방법으로 함수에 속성을 추가할 수 없어요.',
      '"Woof"이 출력돼요.',
      'ReferenceError',
    ],
    answer: 'A',
  },
  {
    question: `const foo = () => console.log("First");
    const bar = () => setTimeout(() => console.log("Second"));
    const baz = () => console.log("Third");

    bar();
    foo();
    baz();
    `,
    options: ['First Second Third', 'First Third Second', 'Second First Third', 'Second Third First'],
    answer: 'B',
  },
  {
    question: `let person = { name: "Lydia" };
    const members = [person];
    person = null;
    
    console.log(members);
    `,
    options: ['null', '[null]', '[{}]', '[{ name: "Lydia" }]'],
    answer: 'D',
  },
  {
    question: `const { name: myName } = { name: "Lydia" };

    console.log(name);
    `,
    options: ['"Lydia"', '"myName"', 'undefined', 'ReferenceError'],
    answer: 'D',
  },
];
