require('dotenv').config();
require('./src/config/mongo');
const express = require('express');
const bot = require('./src/bot');
const { PORT } = require('./src/config/constants');

const app = express();

app.use(express.json());

app.listen(PORT);

app.post(`/${bot.token}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});
