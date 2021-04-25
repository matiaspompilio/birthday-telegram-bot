const moment = require('moment-timezone');
const {
  addBirthday, newChat, getChatUsers,
} = require('./services/chat');
const { bot } = require('./config/api');


bot.onText(/\/start/, async (msg) => {
  const {
    chat: {
      id: chatId,
    },
  } = msg;
  let resp;
  try {
    await newChat(chatId);
    resp = 'El chat ya está habilitado para comenzar a guardar cumpleaños.\n Utiliza el comando /help para más información.';
  } catch (err) {
    resp = 'Ha ocurrido un error al procesar el mensaje';
    console.error(err);
  }
  bot.sendMessage(chatId, resp);
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
      await addBirthday(chatId, fromId, fromName, birthday.toDate());
      resp = 'Se guardó tu fecha de cumpleaños';
    } catch (e) {
      resp = 'Error al intentar guardar la fecha de cumpleaños';
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
  const resp = 'Utiliza el comando /birthday y tu cumpleaños con el formato DD-MM. Te avisaré cuando sea tu cumpleaños \n Utiliza el comando /birthdays para consultar los cumpleaños del chat.';

  bot.sendMessage(chatId, resp);
});

bot.onText(/\/birthdays/, async (msg) => {
  const {
    chat: {
      id: chatId,
    },
  } = msg;
  const users = await getChatUsers(chatId);
  if(users.length > 0) {
    await bot.sendMessage(chatId, 'La lista de cumpleaños es: ');
    Promise.all(users.map(async ({ name, birthday }) => {
      bot.sendMessage(chatId, `${name} - ${moment(birthday).format('DD/MM')}`);
    }));
  } else {
    bot.sendMessage(chatId, 'No existen cumpleaños');
  }
});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('polling_error', (err) => console.log(err));

module.exports = bot;
