require('dotenv').config();
const mongoose = require('../config/mongo');
const moment = require('moment-timezone');
const { bot } = require('../config/api');
const { getChats } = require('../services/chat');

const checkBirthdays = async () => {
  const chats = await getChats();
  Promise.all(chats.map(({ chatId, users }) => {
    return Promise.all(users.map(async (user) => {
      if ((moment().isSame(moment(user.birthday, 'DD-MM'), 'month')) && (moment().isSame(moment(user.birthday, 'DD-MM'), 'day'))) {
        console.info(`Message to ${user.name} in ${chatId} sended`);
        return bot.sendMessage(chatId, `Es el cumpleaños de ${user.name}!`);
      }
    }));
  }));
};

const app = async () => {
 try {
    await checkBirthdays();
 } catch (e) {
    console.error(e);
 }
  await mongoose.disconnect();
  bot.stopPolling();
};

app();