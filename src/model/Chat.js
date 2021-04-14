const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  userId: { type: String, unique: true },
  name: String,
  birthday: Date,
});


const chatSchema = new Schema({
  chatId: { type: String, unique: true },
  users: [userSchema],
});

const Chat = model('Chat', chatSchema);

module.exports = Chat;
