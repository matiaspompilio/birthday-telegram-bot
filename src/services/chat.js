const Chat = require('../model/Chat');

const newChat = (chatId) => {
  const chat = new Chat({
    chatId,
  });
  return chat.save();
};

const addBirthday = async (chatId, userId, userName, birthday) => {
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
  }).then(async (result) => {
  // if the userId already exist, modify the existing one
    if (result.n === 0) {
      await Chat.updateOne(
        { chatId, 'users.userId': userId },
        { $set: { 'users.$': newUser } },
      );
    }
  });
};

const getChatUsers = async (chatId) => {
  const chat = await Chat.findOne({ chatId });
  return chat.users;
};

const getChats = async () => {
  const chats = await Chat.find();
  return chats;
};

module.exports = {
  addBirthday,
  newChat,
  getChatUsers,
  getChats,
};
