const TelegramBot = require('node-telegram-bot-api');
// This file would be created soon

const token = process.env.TOKEN;
let bot;

if (process.env.NODE_ENV === 'production') {
  bot = new TelegramBot(token);
  bot.setWebHook(process.env.HEROKU_URL + bot.token);
} else {
  bot = new TelegramBot(token, { polling: true });
}


module.exports = {
  bot,
};
