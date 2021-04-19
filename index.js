require('dotenv').config();
require('./config/mongo');
const express = require('express');
const bot = require('./src/bot');

const app = express();

app.use(express.json());

app.listen(process.env.PORT);

app.post(`/${bot.token}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});
