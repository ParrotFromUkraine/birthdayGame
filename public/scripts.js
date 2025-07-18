const { response } = require("express");

const steamId = {
  parrotFromUkraine: '',
  yamma: '',
  toniket: '',
  ukraineAccount: ''
}

const present = {
  mafin: 'З днем народження Кіра, бажаю тобі щастя, здоровʼя, успіхів в житті . Хочу щоб в цей день у тебе була тільки посмішка та радість на обличчі 🥳🥳🥳',
  limon: '',
  parrot: '',
  yamma: '',
  toniked: '',
  luka: 'Письмо кира привет я  лука я очень думал и вспомнил утебя день раждения ! паздравляю тебя кира - @luka',
  stalker: ' ',
  katana_lk: 'Головой по чаще думай... больше нечего сказать...', // Дословная цитата
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
      { answer: 'open telegrambot', next: 'telegramBotFolder', },
      { answer: 'open root', response: 'В доступе отказано', next: 'folderList' }
    ]
  },
  {
    id: 'telegramBotFolder',
    response: 'bot.js   hidden_pipi   package.json',
    hint: 'Вы в папке Телеграм бота',
    branches: [
      { answer: 'check bot.js', response: '', next: 'check bot.js' },
      { answer: 'check hidden_pipi.txt', next: 'decrypt', response: 'Файл зашифрован. Расшифровать?' },
      { answer: 'check package.json', } // done
    ]
  },

  {
    id: 'check bot.js',
    response: 'Хотите ли вы чтоб вам помогала нейронка???',
    branches: [
      { answer: 'yes', next: 'pipi starting' },
      { answer: 'no', next: 'open ' }
    ]
  },

  {
    id: 'pipi starting',
    response: 'Зря...',
    next: ''
  },

  {
    id: 'check package.json',
    response: 'Вам тут не следует нечего менять\nВы вернулись назад',
    next: 'telegramBotFolder'
  },

  {
    id: 'decrypt',
    hint: 'Введите команду для расшифровки',
    branches: [
      { answer: 'decrypt hidden_pipi.txt', next: 'warning', response: '"ОН ЛЖЕЦ. ЭТО НЕ ПОМОЩНИК."' }
    ]
  },
  {
    id: 'warning',
    hint: 'Вы должны узнать кто-то такой (1697965694) и написать его @username сюда (В этом поможет @myidbot',
    branches: [
      { answer: '@r0st1sIav_999', next: 'secondRound' }
    ]
  },

  {
    id: "secondRound",
    hint: 'Вы должны узнать кто-то такой (1496894138) и написать его @username сюда (В этом поможет @myidbot',
    branches: [
      { answer: "@ce09a", next: 'therthround' }
    ]
  },

  {
    id: 'therthround',
    response: '240508-Steam',
    branches: [
      { answer: "ParrotFromUkraine", next: 'aftParrotFromUkraine' }
    ]
  },

  {
    id: 'aftParrotFromUkraine',
    response: '18aug08+Steamid',
    branches: [
      { answer: '', next: 'aftYamma' }
    ]
  },

  {
    id: 'aftYamma',
    response: 'Юбилей? d/m/y',
    branches: [
      { answer: '20/05/2025', next: 'aftDays' }
    ]
  },

  {
    id: "aftDays",
    response: 'Первый подарок от Киры для попугая',
    branches: [
      { answer: 'Попугай', next: "aftParrot" }
    ]
  },

  {
    id: "aftParrot",
    response: 'DevParrot...Forever',
    branches: [
      { answer: 'WithLove' }
    ]
  },

  {
    id: 'uncrypt',
    hint: 'Вы розвеяли все защиты. Вы находитесь у главного терминала нейросети П.И.П.И\n\nВ логах вы видете ',
    response: "П.И.П.И - Что тут происходит?",
  }
  //{
  //  id: 'gachiCall',
  //    response: '"Ик... Кира, я сделал антивирусник... GachiS.exe!"',
  //      branches: [
  //        { answer: 'run GachiS.exe', next: 'gachiFinal', response: 'GachiS.exe запущен...' }
  //      ]
  //},
  //{
  //id: 'gachiFinal',
  //  response: '💪 GACHI BOYS ARRIVED 💪\nGachiLimon и GachiPit уничтожили П.И.П.И.\nБОТ СПАСЁН.\n\nХОРОШАЯ КОНЦОВКА ❤️',
  //     branches: [
  //       { answer: '...', next: 'start' }
  //    ]
  //}
];

const easterEggs = [ 
  { trigger: "sudo love me baby", response: "Вы почувствовали присутствие попугая. Он обнял вас крыльями." },
  { trigger: "sudo rm sandwich", response: "Сендвичи удалены. Попугай в ярости." },
  { trigger: "42", response: "Ответ на главный вопрос жизни, вселенной и всего такого..." },
  { trigger: "mafin", response: present.mafin },
  { trigger: "yamma", response: present.yamma },
  { trigger: "parrot", response: `Parrot sign in\n\p${present.parrot}\nТвой програмист из Украины\n\nParrot signout` },
  { trigger: 'limon', response: present.limon },
  { trigger: 'toniked', response: present.toniked },
  { trigger: 'stalker', response: present.stalker }
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
