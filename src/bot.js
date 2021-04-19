const moment = require('moment-timezone');
const cron = require('node-cron');
const {
  addBirthday, getChats, newChat, getChatUsers,
} = require('./services/chat');
const { bot } = require('../config/api');


const checkBirthdays = async (func) => {
  const chats = await getChats();
  chats.map(({ chatId, users }) => {
    users.map((user) => {
      if ((moment().isSame(moment(user.birthday, 'DD-MM'), 'month')) && (moment().isSame(moment(user.birthday, 'DD-MM'), 'day'))) {
        func(chatId, user.name);
      }
    });
  });
};

// Send messages everyday at 00:00
cron.schedule('00 00 * * *', () => {
  checkBirthdays((chatId, name) => bot.sendMessage(chatId, `Es el cumpleaños de ${name}!`));
}, {
  scheduled: true,
  timezone: 'America/Argentina/Buenos_Aires',
});

bot.onText(/\/start/, (msg) => {
  const {
    chat: {
      id: chatId,
    },
  } = msg;
  let resp;
  newChat(chatId).then(() => {
    resp = 'El chat ya está habilitado para comenzar a guardar cumpleaños.\n Utiliza el comando /help para más información.';
    bot.sendMessage(chatId, resp);
  }).catch((err) => {
    resp = 'Ha ocurrido un error al procesar el mensaje';
    console.error(err);
  });
});

// Matches "/birthday ['DD-MM']"
bot.onText(/\/birthday (.+)/, async (msg, match) => {
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
  const birthday = moment(match[1], 'DD-MM');
  // using moment validation to parse the input
  if (birthday.isValid()) {
    try {
      console.log(birthday.toString());
      await addBirthday(chatId, fromId, fromName, birthday.toDate());
      resp = 'Se guardó tu cumpleaños';
    } catch (e) {
      resp = 'Hubo un error al guardar tu cumpleaños';
    }
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
  const resp = 'Utiliza el comando /birthday y tu cumpleaños con el formato DD-MM. Te avisaré cuando sea tu cumpleaños ;)\n Utiliza el comando /birthdays para consultar los cumpleaños del chat.';

  bot.sendMessage(chatId, resp);
});

bot.onText(/\/birthdays/, async (msg) => {
  const {
    chat: {
      id: chatId,
    },
  } = msg;
  const users = await getChatUsers(chatId);
  bot.sendMessage(chatId, 'La lista de cumpleaños es: ');
  users.map(({ name, birthday }) => {
    bot.sendMessage(chatId, `${name} - ${moment(birthday).format('DD-MM')}`);
  });
});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('polling_error', (err) => console.log(err));

module.exports = bot;
