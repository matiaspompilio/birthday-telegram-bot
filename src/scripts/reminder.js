require('dotenv').config();
const mongoose = require('../config/mongo');
const moment = require('moment-timezone');
const core = require('@actions/core');
const github = require('@actions/github');
const { bot } = require('../config/api');
const { getChats } = require('../services/chat');

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

try {
  checkBirthdays((chatId, name) => bot.sendMessage(chatId, `Es el cumpleaños de ${name}!`));

  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2);
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}

mongoose.connection.close()