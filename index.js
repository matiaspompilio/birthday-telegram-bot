const TelegramBot = require('node-telegram-bot-api');
const TOKEN = require('./config/api');

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(TOKEN, { polling: true });

let birthdays = {};

// Matches "/echo [whatever]"
bot.onText(/\/birthday (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message
  const {
    from,
    chat,
  } = msg;

  const fromId = from.id;
  birthdays[fromId] = match[1];
  console.log(birthdays);  
  const chatId = chat.id;
  const resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  // send a message to the chat acknowledging receipt of their message
  bot.sendMessage(chatId, 'Received your message');
});
