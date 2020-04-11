const moment = require('moment-timezone');
const cron = require('node-cron');
const { addBirthday, checkBirthdays, getBirthdays } = require('./calendar');
const { bot } = require('../config/api');


// Send messages everyday at 00:00
cron.schedule('00 00 * * *', () => {
  checkBirthdays((chatId, name) => bot.sendMessage(chatId, `Es el cumpleaños de ${name}!`));
}, {
  scheduled: true,
  timezone: 'America/Argentina/Buenos_Aires',
});

// Matches "/birthday [whatever]"
bot.onText(/\/birthday (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message
  const {
    from: {
      id: fromId,
      first_name: fromName,
    },
    chat: {
      id: chatId,
    },
  } = msg;

  let resp;

  // using moment validation to parse the input
  if (moment(match[1], 'DD-MM').isValid()) {
    resp = 'Se guardó tu cumpleaños';
    addBirthday(chatId, fromId, fromName, match[1]);
  } else {
    resp = 'Formato requerido DD-MM';
  }

  bot.sendMessage(chatId, resp);
});

bot.onText(/\/help/, (msg) => {
  const {
    chat: {
      id: chatId,
    },
  } = msg;
  const resp = 'Utiliza el comando /birthday y tu cumpleaños con el formato DD-MM. Te avisaré cuando sea tu cumpleaños ;) \n /birthdays para obtener todos los cumpleaños del chat';

  bot.sendMessage(chatId, resp);
});

bot.onText(/\/birthdays/, (msg) => {
  const {
    chat: {
      id: chatId,
    },
  } = msg;
  const resp = getBirthdays();

  bot.sendMessage(chatId, resp);
});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('polling_error', (err) => console.log(err));

module.exports = bot;
