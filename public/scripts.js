const { response } = require("express");

const present = {
  mafin: 'З днем народження Кіра, бажаю тобі щастя, здоровʼя, успіхів в житті . Хочу щоб в цей день у тебе була тільки посмішка та радість на обличчі 🥳🥳🥳',
  limon: 'Тут должно было быть поздравелния((',
  parrot: 'Кирочка))\nС днём рождения, солнышко!\nПусть в этот день всё вокруг сияет для тебя: улыбки, цветы, слова.\nТы — настоящее чудо, и я безумно рад, что ты есть в моей жизни.🥹\nЖелаю тебе счастья, вдохновения в музыке и волшебных моментов каждый день.\nТвой пернатый из Украины)))🦜❤️😘',
  yamma: 'Привет, это Яшма — камень твёрдый, но сердце мягкое! Поздравляю тебя с днюхой! Пусть жизнь будет ярче моих узоров, а счастье преследует тебя так упорно, как я — любителей гта 5 и красивых побрякушек!',
  toniked: 'падший рыцарь из стального легиона приветствует вас принцесса, с днем рождения вас поздравляю целую руку преклоняю колено и на последок хотелось бы сказать "даже самая темная ночь закончится рассветом"',
  luka: 'Письмо кира привет я лука я очень думал и вспомнил утебя день раждения ! паздравляю тебя кира - @luka',
  stalker: 'Тут должно было быть поздравелния((',
  katana_lk: 'Головой по чаще думай... больше нечего сказать...',
  secret: 'Секретное поздравление: Ты самая лучшая Кирочка на свете! 💖'
};

const storySteps = [
  {
    id: 'start',
    hint: "Привет, Кира! Твой день рождения начинается с магии! Логин?",
    branches: [
      { answer: "Kira", next: 'portal', response: "О, Кира, это ты! Войди в магический портал, чтобы начать приключение!" },
      { answer: "Parrot", next: 'parrotSecret', response: "Попугай? Ты знаешь секретный код!" },
      { answer: "help", response: "Введи своё имя, например, 'Kira'.", next: 'start' }
    ]
  },
  {
    id: 'portal',
    hint: "Перед тобой сияющий портал. Назови заклинание (подсказка: связано с 'magic' и 'kira')",
    branches: [
      { answer: "magickira", next: 'enchantedKingdom', response: "Заклинание сработало! Портал переносит тебя в Зачарованное Королевство!" },
      { answer: "help", response: "Попробуй соединить 'magic' и твоё имя.", next: 'portal' }
    ]
  },
  {
    id: 'enchantedKingdom',
    hint: "Ты в Зачарованном Королевстве! Перед тобой три пути: [castle] [forest] [lake]. Куда отправишься?",
    branches: [
      { answer: "castle", next: 'castleGate', response: "Ты подходишь к величественному замку, где хранятся тайны прошлого." },
      { answer: "forest", next: 'forestPath', response: "Ты вступаешь в густой лес, полный магии и загадок." },
      { answer: "lake", next: 'lakeShore', response: "Ты у озера, где вода шепчет мелодии твоего сердца." },
      { answer: "help", response: "Выбери: castle, forest или lake.", next: 'enchantedKingdom' }
    ]
  },
  {
    id: 'castleGate',
    response: "Страж замка требует пароль. Назови слово, связанное с твоей мечтой.",
    hint: "Введи слово (подсказка: что-то о мечтах):",
    branches: [
      { answer: "dream", next: 'castleHall', response: "Страж кивает: 'Верно!' Ты входишь в замок." },
      { answer: "help", response: "Подумай о слове, связанном с мечтами, например, 'dream'.", next: 'castleGate' }
    ]
  },
  {
    id: 'castleHall',
    response: "В зале замка три сундука: [gold] [silver] [crystal]. Какой откроешь?",
    hint: "Выбери сундук: [gold] [silver] [crystal]",
    branches: [
      { answer: "gold", next: 'goldChest', response: "Золотой сундук сияет ярко, как твоя улыбка!" },
      { answer: "silver", next: 'silverChest', response: "Серебряный сундук хранит что-то нежное и тёплое." },
      { answer: "crystal", next: 'crystalChest', response: "Кристальный сундук переливается, словно твои мечты!" },
      { answer: "help", response: "Выбери: gold, silver или crystal.", next: 'castleHall' }
    ]
  },
  {
    id: 'goldChest',
    response: "В золотом сундуке: " + present.mafin + "\n\nХочешь продолжить искать сокровища?",
    hint: "Продолжить? [yes/no/secret]",
    branches: [
      { answer: "yes", next: 'castleHall', response: "Ты возвращаешься в зал замка." },
      { answer: "no", next: 'happyEnding', response: "Ты завершаешь путь в замке..." },
      { answer: 'secret', next: 'joinSecret' }
    ]
  },

  {
    id: 'joinSecret',
    response: 'Ты попала в секратный тунель...',
    hint: 'Этот тунель ведёт в прошлое ты готова к этому?',
    branches: [
      { answer: 'yes', next: 'parrotSecret', response: 'Вы переместились в прошлое...' },
      { answer: 'no', next: 'castleHall', response: 'Ты возвращаешься в зал замка.' }
    ]
  },

  {
    id: 'oldstart',
    response: 'Tam longe in praeteritum progressus es ut lingua hic celeberrima Latina sit...',
    hint: 'Paululum retro in tempus revertamur et ad versionem beta universi revertamur.Ut progrediamur, dic tantum "ad futurum progredi".',
    branches: [
      { answer: 'ad futurum progredi', next: 'betaLife', response: 'Ad futurum progressus es. Mundi magici iterum aperti sunt!' }
    ]
  },

  {
   id: 'betaLife',
   response: '',
  },
 {
    id: 'oldstart',
    hint: "Здравствуйте, как вас зовут?",
    branches: [
      { answer: "Kira", next: 'oldlogin', response: "Здравствуйте, Кира. Вам нужно войти в систему." },
      { answer: "Parrot", next: 'oldparrotSecret', response: "Привет, попугай! У тебя есть особый доступ." }
    ]
  },
  {
    id: 'oldlogin',
    hint: "Введите email: (parootSystem.email == <ukrGmail>)",
    branches: [
      { answer: "parootsystem.email == kiralynnykmylove@gmail.com", next: 'oldpassword', response: "Успешно!" },
      { answer: "help", response: "Подсказка: email содержит 'kiralynnykmylove'", next: 'oldlogin' }
    ]
  },
  {
    id: 'oldpassword',
    hint: "Введите password: (parootSystem.password == <password>)",
    branches: [
      { answer: "parootsystem.password == sudoloveme", next: 'oldtask', response: "Успешно!\n\nKira sign in" },
      { answer: "help", response: "Подсказка: пароль связан с 'sudo' и 'love'", next: 'oldpassword' }
    ]
  },

  {
    id: 'oldfolderList',
    response: 'kiraLynnyk/    telegrambot/    root/',
    branches: [
      { answer: 'open telegrambot', next: 'oldtelegramBotFolder', response: "Открываю папку telegrambot..." },
      { answer: 'open root', response: 'В доступе отказано', next: 'oldfolderList' },
      { answer: 'help', response: 'Попробуйте "open telegrambot"', next: 'oldfolderList' }
    ]
  },
  {
    id: 'oldtelegramBotFolder',
    response: 'bot.js   hidden_pipi   package.json',
    hint: 'Вы в папке Телеграм бота',
    branches: [
      { answer: 'check bot.js', next: 'oldcheck bot.js', response: "Анализирую bot.js..." },
      { answer: 'check hidden_pipi.txt', next: 'olddecrypt', response: 'Файл зашифрован. Расшифровать?' },
      { answer: 'check package.json', next: 'oldcheck package.json', response: "Проверяю package.json..." },
      { answer: 'back', next: 'oldfolderList', response: "Возвращаемся..." }
    ]
  },
  {
    id: 'oldcheck bot.js',
    response: 'Хотите ли вы чтоб вам помогала нейронка???',
    branches: [
      { answer: 'yes', next: 'oldpipi starting', response: "Активирую нейронку..." },
      { answer: 'no', next: 'oldtelegramBotFolder', response: "Возвращаемся..." }
    ]
  },
  {
    id: 'oldpipi starting',
    response: 'Зря...\n\nП.И.П.И активирован. Система заражена.',
    hint: 'Вы зделали неправильный выбор. Никогда не доверяйте нейронкам.'
  },
  {
    id: 'oldcheck package.json',
    response: 'Вам тут не следует нечего менять\nВы вернулись назад',
    next: 'telegramBotFolder'
  },
  {
    id: 'olddecrypt',
    hint: 'Введите команду для расшифровки',
    branches: [
      { answer: 'decrypt hidden_pipi.txt', next: 'oldwarning', response: '"ОН ЛЖЕЦ. ЭТО НЕ ПОМОЩНИК."' },
      { answer: 'cancel', next: 'oldtelegramBotFolder', response: "Отмена..." }
    ]
  },
  {
    id: 'oldwarning',
    hint: 'Вы должны узнать кто-то такой (1697965694) и написать его @username сюда (В этом поможет @myidbot)',
    branches: [
      { answer: '@r0st1sIav_999', next: 'secondRound', response: "Правильно! Следующий шаг..." },
      { answer: 'help', response: "Используйте Telegram бота @myidbot чтобы узнать username по ID", next: 'warning' }
    ]
  },
  {
    id: "secondRound",
    hint: 'Вы должны узнать кто-то такой (1496894138) и написать его @username сюда (В этом поможет @myidbot)',
    branches: [
      { answer: "@ce09a", next: 'therthround', response: "Верно! Продолжаем..." },
      { answer: 'help', response: "Это ID другого друга Киры", next: 'secondRound' }
    ]
  },
  {
    id: 'therthround',
    response: '240508-Steam',
    branches: [
      { answer: "ParrotFromUkraine", next: 'aftParrotFromUkraine', response: "Да! Это Steam ID попугая!" }
    ]
  },
  {
    id: 'aftYamma',
    response: 'Юбилей? d/m/y',
    branches: [
      { answer: '20/05/2025', next: 'aftDays', response: "Именно в этот день всё началось!" }
    ]
  },
  {
    id: "aftDays",
    response: 'Первый подарок от Киры для попугая',
    branches: [
      { answer: 'Попугай', next: "aftParrot", response: "Да! Это был лего попугай!" }
    ]
  },
  {
    id: "aftParrot",
    response: 'DevParrot...Forever',
    branches: [
      { answer: 'WithLove', next: 'finalMessage', response: "❤️" }
    ]
  },
  {
    id: 'finalMessage',
    response: 'Вы развеяли все защиты. Система восстановлена!\n\nС Днём Рождения, Кирочка!\n\nЭто приключение было создано специально для тебя, чтобы сделать твой день немного интереснее.\n\nЛюблю тебя! Твой попугай. 🦜❤️',
    next: 'restart'
  },
  {
    id: 'silverChest',
    response: "В серебряном сундуке: " + present.yamma + "\n\nПродолжить приключение?",
    hint: "Продолжить? [yes/no]",
    branches: [
      { answer: "yes", next: 'castleHall', response: "Ты возвращаешься в зал замка." },
      { answer: "no", next: 'happyEnding', response: "Ты завершаешь путь в замке..." }
    ]
  },
  {
    id: 'crystalChest',
    response: "В кристальном сундуке: " + present.secret + "\n\nХочешь продолжить?",
    hint: "Продолжить? [yes/no]",
    branches: [
      { answer: "yes", next: 'castleHall', response: "Ты возвращаешься в зал замка." },
      { answer: "no", next: 'happyEnding', response: "Ты завершаешь путь в замке..." }
    ]
  },
  {
    id: 'forestPath',
    response: "В лесу ты находишь древнее древо. Какой лист ты выберешь?",
    hint: "Введи тип листа (подсказка: подумай о природе):",
    branches: [
      { answer: "oak", next: 'oakLeaf', response: "Дубовый лист шепчет о силе и стойкости!" },
      { answer: "maple", next: 'mapleLeaf', response: "Кленовый лист сияет яркими красками!" },
      { answer: "help", response: "Попробуй 'oak' или 'maple'.", next: 'forestPath' }
    ]
  },
  {
    id: 'oakLeaf',
    response: "Дубовый лист открывает: " + present.toniked + "\n\nПродолжить путешествие?",
    hint: "Продолжить? [yes/no]",
    branches: [
      { answer: "yes", next: 'enchantedKingdom', response: "Ты возвращаешься к развилке в королевстве." },
      { answer: "no", next: 'happyEnding', response: "Ты завершаешь путь в лесу..." }
    ]
  },
  {
    id: 'mapleLeaf',
    response: "Кленовый лист дарит: " + present.luka + "\n\nПродолжить приключение?",
    hint: "Продолжить? [yes/no]",
    branches: [
      { answer: "yes", next: 'enchantedKingdom', response: "Ты возвращаешься к развилке в королевстве." },
      { answer: "no", next: 'happyEnding', response: "Ты завершаешь путь в лесу..." }
    ]
  },
  {
    id: 'lakeShore',
    response: "На берегу озера ты видишь отражение. Назови, что ты видишь:",
    hint: "Введи, что видишь (подсказка: что-то музыкальное):",
    branches: [
      { answer: "melody", next: 'lakeMelody', response: "Отражение показывает мелодию, звучащую в твоём сердце!" },
      { answer: "help", response: "Подумай о музыке, например, 'melody'.", next: 'lakeShore' }
    ]
  },
  {
    id: 'lakeMelody',
    response: "Озеро поёт: " + present.parrot + "\n\nХочешь продолжить?",
    hint: "Продолжить? [yes/no]",
    branches: [
      { answer: "yes", next: 'enchantedKingdom', response: "Ты возвращаешься к развилке в королевстве." },
      { answer: "no", next: 'happyEnding', response: "Ты завершаешь путь у озера..." }
    ]
  },
  {
    id: 'happyEnding',
    response: 'С Днём Рождения, Кирочка! 🎂\n\nЭтот магический квест был создан с любовью для тебя!\nТвой попугай. 🦜❤️',
    next: 'restart'
  },
  {
    id: 'parrotSecret',
    response: 'Секретный режим активирован!\n\n' + present.parrot + '\n\nТвой программист из Украины 🦜❤️',
    next: 'restart'
  },
  {
    id: 'restart',
    response: 'Введите "restart" чтобы начать заново',
    branches: [
      { answer: 'restart', next: 'start', response: 'Перезапуск приключения...' }
    ]
  }
];

const easterEggs = [
  { trigger: "sudo love me baby", response: "Попугай обнимает тебя крыльями и шепчет: 'Ты волшебна!'" },
  { trigger: "sudo rm sandwich", response: "Сендвичи исчезли в магическом вихре! 😢" },
  { trigger: "42", response: "Ответ на главный вопрос жизни, вселенной и всего такого..." },
  { trigger: "mafin", response: present.mafin },
  { trigger: "yamma", response: present.yamma },
  { trigger: "parrot", response: `${present.parrot}\n\nТвой программист из Украины` },
  { trigger: 'limon', response: present.limon },
  { trigger: 'toniked', response: present.toniked },
  { trigger: 'luka', response: present.luka },
  { trigger: 'stalker', response: present.stalker },
  { trigger: 'katana', response: present.katana_lk },
  { trigger: 'secret', response: present.secret },
  { trigger: 'happy birthday', response: 'С Днём Рождения, Кирочка! 🎂🎉' },
  { trigger: 'i love you', response: 'Я тоже тебя люблю! ❤️' },
  { trigger: 'popugai', response: '🦜 chirick! 🦜' }
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
  storyHint.textContent = step?.hint || "Приключение завершено! Введите 'restart' чтобы начать заново.";
}

function triggerWipeSequence() {
  gameContainer.style.display = 'none';
  blackScreen.style.display = 'flex';
  loadingText.textContent = "Магия исчезает...";

  setTimeout(() => loadingText.textContent = "Мир растворяется...", 2000);
  setTimeout(() => loadingText.textContent = "Перезагрузка магии...", 4000);
  setTimeout(() => loadingText.textContent = "Привет, Кира!", 6000);

  setTimeout(() => {
    terminalOutput.innerHTML = "";
    currentStepId = 'start';
    updateHint();
    blackScreen.style.display = 'none';
    gameContainer.style.display = 'block';
    terminalInput.focus();
  }, 8000);
}

function normalize(str) {
  return str.toLowerCase().trim().replace(/\s+/g, ' ');
}

terminalInput.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    const userInput = terminalInput.value.trim();
    terminalOutput.innerHTML += `<div>&gt; ${userInput}</div>`;

    if (userInput === "sudo rm -rf /") {
      triggerWipeSequence();
      terminalInput.value = '';
      return;
    }

    const egg = easterEggs.find(e => normalize(e.trigger) === normalize(userInput));
    if (egg) {
      terminalOutput.innerHTML += `<div class="easter-egg">${egg.response}</div>`;
    } else {
      const currentStep = getStepById(currentStepId);
      const match = currentStep?.branches?.find(branch => normalize(branch.answer) === normalize(userInput));

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
        terminalOutput.innerHTML += `<div>Неизвестное заклинание. Попробуй ещё раз!</div>`;
      }
    }

    terminalInput.value = '';
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }
});

// Initialize the game
updateHint();
terminalInput.focus();

// Show initial step response if exists
const initialStep = getStepById(currentStepId);
if (initialStep?.response) {
  terminalOutput.innerHTML += `<div>${initialStep.response}</div>`;
}

console.log("Scripts loaded correct")
