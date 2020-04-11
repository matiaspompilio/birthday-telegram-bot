const moment = require('moment-timezone');
const _ = require('underscore');

const birthdays = {};

const checkBirthdays = (func) => {
  const chats = _.keys(birthdays);
  chats.map((chatId) => {
    const users = _.keys(birthdays[chatId]);
    users.map((userId) => {
      const user = birthdays[chatId][userId];
      if ((moment().isSame(moment(user.birthday, 'DD-MM'), 'month')) && (moment().isSame(moment(user.birthday, 'DD-MM'), 'day'))) {
        console.log(user);
        func(chatId, user.name);
      }
    });
  });
};

const getBirthdays = (chatId) => JSON.parse(birthdays[chatId]);

const addBirthday = (chatId, userId, userName, day) => {
  birthdays[chatId]
    ? birthdays[chatId][userId] = {
      name: userName,
      birthday: day,
    }
    : birthdays[chatId] = {
      [userId]: {
        name: userName,
        birthday: day,
      },
    };
  console.log(birthdays);
};

module.exports = {
  addBirthday,
  checkBirthdays,
  getBirthdays,
};
