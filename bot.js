const TelegramBot = require('node-telegram-bot-api');
const token = '7610525348:AAH_T84bSniYCIZdXCp97HMjvphtVtwMMeM';
const bot = new TelegramBot(token, { polling: true });

// Простая структура квеста
const quest = {
  start: {
    text: "Привет! Я програма-бот который написаный спецыально для квеста. Сегодня у тебя день рождения! И я бы хотел креативно провести вреемя с тобой.\n\n(P.S.: Меня написал криво-рукий пернатый по этому возможно квест будет фиксится в моментах. Так-же для квеста попугай использует бесплатный tcp сервера которые стоят у него на пк поэтому может быть что будет вылазить увидомления о том что сервер на который вы будете переходить зделаный не для целей комерции и тому подобное)",
    options: [
      { text: 'Начать игру!)', next: 'starting' }
    ]
  },

  starting: {
    text: "Ну так приступаем к игре!) Для начала тебе нужно ответь на пару вопросов!\n\n1. На какую должность готовится поступань?",
    options: [
      { text: "Програмист", next: "startingError" },
      { text: "Frontend", next: "startingCorrect" },
      { text: "Backend", next: "startingError" },
      { text: "Fullstack", next: "startingError" },
      { text: "DevOps", next: "startingError" },
      { text: "Та все равно", next: "startingError" }
    ]
  },

  startingError: {
    text: "Подумай!",
    options: [
      { text: "Ответь ещё раз!", next: "starting" },
    ]
  },

  startingCorrect: {
    text: "Правильный ответ!\n\nТвой попугайчик готовится стать нормальным Fullstack но ему нехватает головы чтоб все запомнить",
    options: [
      { text: "Следуюший вопрос", next: "firstQustion" },
    ]
  },

  firstQustion: {
    text: "2. 01001101 01111001 00100000 01101100 01101111 01110110 01100101 00100000 01101001 01110011 00100000 01001011 01101001 01110010 01100001 00100000 01001100 01111001 01101110 01101110 01111001 01101011))",
    options: [
      { text: "ILoveU", next: "" },
      { text: "KiraMyWife", next: "" },
      { text: "01000110  01010101 01000011 01001011  01011001 01001111 01010101 00100001", next: 'fuckU'}
    ]
  },

  fuckU: { 
    text: 'Что тут за перевод ти хоть знаеш?',
    options: [
      { text: 'Да', next: 'error'},
      { text: 'Нет', next: 'no'}
    ]
  },

  no: {
    text: 'Ну так зачем вопще виберать такое?', 
    options: [
      { text: 'Просто было интересно. Извини', next: ''},
      { text: 'Я так считаю!', next: 'not'}
    ]
  }, 

  not: {
    text: 'Может тогда просто забить на эти все старания', 
    options: [
      { text: 'Да мне просто такое не интересно', next: 'error'},
      { text: 'Нет давай просто верньомся за нормально тест', next: ''}
    ]
  },
  error: {
    
  }
};

// Храним текущую сцену игрока
const userStates = {};

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  userStates[chatId] = 'start';
  sendQuestStep(chatId, 'start');
});

bot.on('callback_query', (callbackQuery) => {
  const chatId = callbackQuery.message.chat.id;
  const nextStep = callbackQuery.data;

  userStates[chatId] = nextStep;
  sendQuestStep(chatId, nextStep);
});

function sendQuestStep(chatId, stepName) {
  const step = quest[stepName];

  const options = {
    reply_markup: {
      inline_keyboard: step.options.map(option => [
        { text: option.text, callback_data: option.next }
      ])
    }
  };

  bot.sendMessage(chatId, step.text, options);
}
