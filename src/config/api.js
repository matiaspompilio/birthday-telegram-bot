const TelegramBot = require('node-telegram-bot-api');
const { TOKEN, HEROKU_URL, NODE_ENV } = require('./constants');

let bot;
if (NODE_ENV === 'production') {
  bot = new TelegramBot(TOKEN);
  bot.setWebHook(HEROKU_URL + TOKEN);
} else {
  bot = new TelegramBot(TOKEN, { polling: true });
}

module.exports = {
  bot,
};
