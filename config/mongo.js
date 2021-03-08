const mongoose = require('mongoose');

const { MONGO_PASSWORD } = process.env;

const connectionString = `mongodb+srv://mpompilio:${MONGO_PASSWORD}@cluster0.joyi7.mongodb.net/tb-bot?retryWrites=true&w=majority`;

// mongodb connection
mongoose.connect(connectionString)
  .then(() => {
    console.log('Database connected');
  })
  .catch((err) => {
    console.error(err);
  });
