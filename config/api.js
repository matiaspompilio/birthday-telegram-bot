const TelegramBot = require('node-telegram-bot-api');

const { TOKEN } = process.env;
const { HEROKU_URL } = process.env;

let bot;
if (process.env.NODE_ENV === 'production') {
  bot = new TelegramBot(TOKEN);
  bot.setWebHook(HEROKU_URL + TOKEN);
} else {
  bot = new TelegramBot(TOKEN, { polling: true });
}

module.exports = {
  bot,
};
