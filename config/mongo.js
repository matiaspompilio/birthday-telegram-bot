const mongoose = require('mongoose');
const { newChat } = require('../src/services/chat.js');

const connectionString = process.env.MONGO_DB_URI;

// mongodb connection
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})
  .then(() => {
  })
  .catch((err) => {
    console.error(err);
  });
