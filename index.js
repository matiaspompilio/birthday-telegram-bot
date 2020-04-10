const moment = require('moment-timezone');
const cron = require('node-cron');
const { addBirthday, checkBirthdays } = require('./src/calendar');
const { bot } = require('./config/bot');

// Create a bot that uses 'polling' to fetch new updates

cron.schedule('50 13 * * *', () => {
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
  const resp = 'Utilizando el comando /birthday y tu cumpleaños con el formato DD-MM. Te avisaré cuando sea tu cumpleaños ;)';

  bot.sendMessage(chatId, resp);
});
// Listen for any kind of message. There are different kinds of
// messages.
bot.on('polling_error', (err) => console.log(err));
