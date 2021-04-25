const mongoose = require('mongoose');

const connectionString = process.env.MONGO_DB_URI;

// mongodb connection
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})
  .then(() => {
    console.log('Database connected');
  })
  .catch((err) => {
    console.error(err);
  });

module.exports = mongoose;