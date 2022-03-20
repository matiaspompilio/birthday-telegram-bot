require('dotenv').config();
const moment = require('moment-timezone');
const mongoose = require('../config/mongo');
const { bot } = require('../config/api');
const { getChats } = require('../services/chat');

const checkBirthdays = async () => {
  const chats = await getChats();
  Promise.all(chats.map(({ chatId, users }) => {
    return Promise.all(users.map(async (user) => {
      if (moment.utc().format('DD-MM') === moment.utc(user.birthday, 'MM-DD-YYYY').format('DD-MM')) {
        console.log(`Message to ${user.name} in ${chatId} sended`);
        return bot.sendMessage(chatId, `Feliz cumple ${user.name} !!! `);
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