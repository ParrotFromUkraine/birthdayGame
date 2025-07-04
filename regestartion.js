const TelegramBotApi = require('node-telegram-bot-api');
const token = '7978248782:AAHQQrBWBudQ_iYLU7ANqUwoM5HjqGv3ZSI';
const bot = new TelegramBotApi(token, { polling: true });

// --ID
const paroot = '5086923431'; // ID попугая

// --btn
const button = {
    reply_markup: {
        inline_keyboard: [
            [
                {
                    text: 'Проверить',
                    callback_data: 'check'
                }
            ],
            [
                {
                    text: 'Проверить',
                    callback_data: 'check'
                }
            ]
        ]
    }
};

const btnParoot = {
    reply_markup: {
        inline_keyboard: [
            [
                {
                    text: 'Проверить',
                    callback_data: 'check'
                },
                {
                    text: 'Проверить',
                    callback_data: 'check'
                }
            ]
        ]
    }
}

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const messageText = msg.text;
    const userInfo = `Пользователь написал боту:\nID: ${msg.from.id}\nИмя: ${msg.from.first_name || ''} ${msg.from.last_name || ''}\nUsername: @${msg.from.username || 'нет'}\nТекст: ${messageText}`;

    if (chatId == '5086923431') { // Проверка на ID попугая
        console.log("Попугай зашол в чат")
        bot.sendMessage(paroot, 'Контрольный пункт', btnParoot)
    } else {
        console.log("Не попугай")
        console.log(userInfo);
    }
});