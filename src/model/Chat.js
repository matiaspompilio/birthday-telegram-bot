const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  userId: { type: Number, unique: true },
  name: String,
  birthday: Date,
});


const chatSchema = new Schema({
  chatId: { type: Number, unique: true },
  users: [userSchema],
});

const Chat = model('Chat', chatSchema);

module.exports = Chat;
