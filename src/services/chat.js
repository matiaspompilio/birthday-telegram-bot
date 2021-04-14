const Chat = require('../model/Chat');

const newChat = (chatId) => {
  const chat = new Chat({
    chatId,
  });
  return chat.save();
};

const addBirthday = (chatId, userId, userName, birthday) => {
  const newUser = {
    userId,
    name: userName,
    birthday,
  };

  // if the userId doesn't exist, push in the array
  Chat.updateOne({
    chatId,
    'users.userId': { $ne: userId },
  },
  {
    $push: {
      users: newUser,
    },
  }).then((result) => {
  // if the userId already exist, modify the existing one
    if (result.n === 0) {
      Chat.updateOne(
        { chatId, 'users.userId': userId },
        { $set: { 'users.$': newUser } },
      );
    }
  });
};

const getUsers = async (chatId) => {
  const chat = await Chat.find({ chatId });
  return chat.users;
};

module.exports = {
  addBirthday,
  newChat,
  getUsers,
};
