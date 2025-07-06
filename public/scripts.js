const present = {
  mafin: '',
  limon: '',
  parrot: '',
  yamma: '',
  toniked: '',
};

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
      { answer: "parootsystem.email == kiralynnykmylove@gmail.com", next: 'password', response: "Успешно!" }
    ]
  },
  {
    id: 'password',
    hint: "Введите password: (parootSystem.password == <password>)",
    branches: [
      { answer: "parootsystem.password == sudoloveme", next: 'task', response: "Успешно!\n\nKira joined to console" }
    ]
  },
  {
    id: 'task',
    hint: 'Ваша задача: Починить бота. Для начала найдите его!',
    branches: [
      { answer: "folderlist", next: 'folderList' }
    ]
  },
  {
    id: 'folderList',
    response: 'kiraLynnyk/    telegrambot/    root/',
    branches: [
      { answer: 'open kiralynnyk', next: 'kiraLynnyk' },
      { answer: 'open telegrambot', next: 'telegramBotFolder' },
      { answer: 'open root', response: 'В доступе отказано' }
    ]
  },
  {
    id: 'kiraLynnyk',
    response: 'https://t.me/SnrKesha',
    branches: []
  },
  {
    id: 'telegramBotFolder',
    hint: 'Вы в папке Телеграм бота',
    branches: []
  }
];

const easterEggs = [
  { trigger: "sudo love me baby", response: "Вы почувствовали присутствие попугая. Обернувшись, вы видите как вас ласково обнимает попугайчик)))" },
  { trigger: "sudo rm sandwich", response: "Вы удалили всё, что связано с сендвичами. Теперь попугай не сможет кушать бутерброды..." },
  { trigger: "42", response: "Ответ на главный вопрос жизни, вселенной и всего такого..." },
  { trigger: "mafin", response: present.mafin },
  { trigger: "yamma", response: present.yamma },
  { trigger: "parrot", response: present.parrot },
  { trigger: 'limon', response: present.limon },
  { trigger: 'toniked', response: present.toniked }
];

let currentStepId = 'start';

const storyHint = document.getElementById('storyHint');
const terminalOutput = document.getElementById('terminalOutput');
const terminalInput = document.getElementById('terminalInput');
const gameContainer = document.getElementById('gameContainer');
const blackScreen = document.getElementById('blackScreen');
const loadingText = document.getElementById('loadingText');

function getStepById(id) {
  return storySteps.find(step => step.id === id);
}

function updateHint() {
  const step = getStepById(currentStepId);
  storyHint.textContent = step?.hint || "Игра завершена!";
}

function triggerWipeSequence() {
  gameContainer.style.display = 'none';
  blackScreen.style.display = 'flex';
  loadingText.textContent = "Удаление всех файлов...";

  setTimeout(() => loadingText.textContent = "Система разрушена...", 2000);
  setTimeout(() => loadingText.textContent = "Перезагрузка...", 4000);
  setTimeout(() => loadingText.textContent = "Привет, Кира!", 6000);

  setTimeout(() => {
    terminalOutput.innerHTML = "";
    currentStepId = 'start';
    updateHint();
    blackScreen.style.display = 'none';
    gameContainer.style.display = 'block';
  }, 8000);
}

function normalize(str) {
  return str.toLowerCase().trim();
}

terminalInput.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    const userInput = terminalInput.value.trim();
    terminalOutput.innerHTML += `<div>&gt; ${userInput}</div>`;

    if (userInput === "sudo rm -rf /") {
      triggerWipeSequence();
    } else {
      const egg = easterEggs.find(e => normalize(e.trigger) === normalize(userInput));
      if (egg) {
        terminalOutput.innerHTML += `<div class="easter-egg">${egg.response}</div>`;
      } else {
        const currentStep = getStepById(currentStepId);
        const match = currentStep.branches?.find(branch => normalize(branch.answer) === normalize(userInput));

        if (match) {
          if (match.response) terminalOutput.innerHTML += `<div>${match.response}</div>`;
          if (match.next) {
            currentStepId = match.next;
            const nextStep = getStepById(currentStepId);
            if (nextStep?.response) {
              terminalOutput.innerHTML += `<div>${nextStep.response}</div>`;
            }
            updateHint();
          }
        } else {
          terminalOutput.innerHTML += `<div>Неизвестная команда. Попробуйте еще раз.</div>`;
        }
      }
    }

    terminalInput.value = '';
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }
});

updateHint();
