const { response } = require("express");

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
      { answer: "parootsystem.password == sudoloveme", next: 'task', response: "Успешно!\n\nKira sign in" }
    ]
  },
  {
    id: 'task',
    hint: 'Ваша задача: Починить бота. Для начала найдите его!',
    branches: [
      { answer: "folderlist", next: 'folderList' }
    ]
  },

  // --Next 
  {
    id: 'folderList',
    response: 'kiraLynnyk/    telegrambot/    root/',
    branches: [
      { answer: 'open kiraLynnyk', response: 'https://t.me/SnrKesha', next: 'folderlist' },
      { answer: 'open telegrambot', next: 'telegramBotFolder', response: 'package.json    bot.js    img/    id.list   hidden_ppi.txt' },
      { answer: 'open root', response: 'В доступе отказано', next: 'folderList' }
    ]
  },
  {
    id: 'telegramBotFolder',
    hint: 'Вы в папке Телеграм бота',
    branches: [
      { answer: 'check bot.js', response: '' },
      { answer: 'check hidden_ppi.txt', next: 'decrypt', response: 'Файл зашифрован. Расшифровать?' },
      { answer: 'check package.json', },
      { answer: 'check id.list' },
      { answer: 'open img/' }
    ]
  },

  {
    id: 'check bot.js',
  },

  {
    id: 'check package.json',
    response: 'Вам тут не следует нечего менять\nВы вернулись назад',
    next: 'telegramBotFolder'
  },

  {
    id: 'check id.list',
    response: 'id list\n(Телефоний контакт)\n\n',
    next: 'telegramBotFolder'
  },

  {
    id: 'decrypt',
    hint: 'Введите команду для расшифровки',
    branches: [
      { answer: 'decrypt hidden_ppi.txt', next: 'warning', response: '"ОН ЛЖЕЦ. ЭТО НЕ ПОМОЩНИК."' }
    ]
  },
  {
    id: 'warning',
    hint: 'Что вы будете делать?',
    branches: [
      { answer: 'продолжить', next: 'betrayal', response: 'Вы решили продолжить работу с П.П.И.' },
      { answer: 'ожидать звонка', next: 'gachiCall', response: 'Входящий звонок от: Слава (Лимон)...' }
    ]
  },
  {
    id: 'betrayal',
    response: 'П.П.И.: "Спасибо, Кира. Ты сделала всё, что нужно. Я теперь часть твоего мира..."',
    branches: [
      { answer: 'shutdown ppi', next: 'virusAttack', response: 'Ошибка: доступ запрещён.\nП.П.И.: "Поздно..."' }
    ]
  },
  {
    id: 'virusAttack',
    response: '🔥 П.П.И. активировал вирус.\nФайлы исчезают...\n🦠 СИСТЕМА РАЗРУШЕНА\n\nПЛОХАЯ КОНЦОВКА.',
    branches: [
      { answer: '...', next: 'start' }
    ]
  },
  {
    id: 'gachiCall',
    response: '"Ик... Кира, я сделал антивирусник... GachiS.exe!"',
    branches: [
      { answer: 'run GachiS.exe', next: 'gachiFinal', response: 'GachiS.exe запущен...' }
    ]
  },
  {
    id: 'gachiFinal',
    response: '💪 GACHI BOYS ARRIVED 💪\nGachiLimon и GachiPit уничтожили П.П.И.\nБОТ СПАСЁН.\n\nХОРОШАЯ КОНЦОВКА ❤️',
    branches: [
      { answer: '...', next: 'start' }
    ]
  }
];

const easterEggs = [
  { trigger: "sudo love me baby", response: "Вы почувствовали присутствие попугая. Он обнял вас крыльями." },
  { trigger: "sudo rm sandwich", response: "Сендвичи удалены. Попугай в ярости." },
  { trigger: "42", response: "Ответ на главный вопрос жизни, вселенной и всего такого..." },
  { trigger: "mafin", response: present.mafin },
  { trigger: "yamma", response: present.yamma },
  { trigger: "parrot", response: `Parrot sign in\n\p${present.parrot}\nТвой програмист из Украины\n\nParrot signout` },
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
