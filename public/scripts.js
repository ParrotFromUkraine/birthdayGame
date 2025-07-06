const present = {
  mafin: '',
  limon: '',
  parrot: '',
  yamma: '',
  toniked: '',
}

const storySteps = [
  {
    id: 'start',
    hint: "Здравствуйте, как вас зовут?",
    branches: [
      { answer: "Kira", next: 'login', response: "Здравствуйте, Кира. Вам нужно войти в систему." }
    ]
  },
  {
    id: 'login',
    hint: "Введите email: (parootSystem.email == <ukrGmail>)",
    branches: [
      { answer: "parootSystem.email == kiralynnykmylove@gmail.com", next: 'password', response: "Успешно!" }
    ]
  },
  {
    id: 'password',
    hint: "Введите password: (parootSystem.password == <password>)",
    branches: [
      { answer: "parootSystem.password == sudoLoveMe", next: 'task', response: "Успешно!\n\nKira joined to console" }
    ]
  },
  {
    id: 'task',
    hint: 'Ваша задача: Починить бота. Для начала найдите его!',
    branches: [
      { answer: "folderList", next: 'folderList' }
    ]
  },
  {
    id: 'folderList',
    response: 'kiraLynnyk/    telegrambot/    root/',
    branches: [
      { answer: 'open kiraLynnyk', next: 'kiraLynnykFolder' },
      { answer: 'open telegramBot', },
      { answer: 'open root', response: 'В доступе отказано' }
    ]
  },
  {
    id: 'kiraLynnyk',
    response: 'https://t.me/SnrKesha'
  },
  {
    id: 'telegramBotFolder',
    hint: 'Вы в папке Телеграм бота',
  }
];;

const easterEggs = [
  { trigger: "sudo love me baby", response: "Вы почувствовали присутствие попугая. Обернувшись вы видете как вас ласково обнимает попугайчик)))" },
  { trigger: "sudo rm sandwich", response: "Вы удалили всё что связоно с сендвичами. Теперь попугай не сможет кушать бутерброды..." },
  { trigger: "42", response: "Ответ на главный вопрос жизни, вселенной и всего такого..." },
  { trigger: "mafin", response: present.mafin },
  { trigger: "yamma", response: present.yamma },
  { trigger: "parrot", response: present.parrot },
  { trigger: 'limon', response: present.limon },
  { trigger: 'toniked', response: present.toniked }
];

let currentStep = 0;

const storyHint = document.getElementById('storyHint');
const terminalOutput = document.getElementById('terminalOutput');
const terminalInput = document.getElementById('terminalInput');
const gameContainer = document.getElementById('gameContainer');
const blackScreen = document.getElementById('blackScreen');
const loadingText = document.getElementById('loadingText');

function updateHint() {
  if (currentStep < storySteps.length) {
    storyHint.textContent = storySteps[currentStep].hint;
  } else {
    storyHint.textContent = "Игра завершена!";
  }
}

function triggerWipeSequence() {
  gameContainer.style.display = 'none';
  blackScreen.style.display = 'flex';
  loadingText.textContent = "Удаление всех файлов...";

  setTimeout(() => {
    loadingText.textContent = "Система разрушена...";
  }, 2000);

  setTimeout(() => {
    loadingText.textContent = "Перезагрузка...";
  }, 4000);

  setTimeout(() => {
    loadingText.textContent = "Привет, Кира!";
  }, 6000);

  setTimeout(() => {
    terminalOutput.innerHTML = "";
    currentStep = 0;
    updateHint();

    blackScreen.style.display = 'none';
    gameContainer.style.display = 'block';
  }, 8000);
}

terminalInput.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    const userInput = terminalInput.value.trim();
    terminalOutput.innerHTML += `<div>&gt; ${userInput}</div>`;

    if (userInput === "sudo rm -rf /") {
      triggerWipeSequence();
    } else {
      const egg = easterEggs.find(egg => egg.trigger === userInput);
      if (egg) {
        terminalOutput.innerHTML += `<div class="easter-egg">${egg.response}</div>`;
      } else if (currentStep < storySteps.length && userInput === storySteps[currentStep].answer) {
        terminalOutput.innerHTML += `<div>${storySteps[currentStep].response}</div>`;
        currentStep++;
        updateHint();
      } else if (userInput !== "") {
        terminalOutput.innerHTML += `<div>Неизвестная команда. Попробуйте еще раз.</div>`;
      }
    }

    terminalInput.value = '';
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }
});

updateHint();
