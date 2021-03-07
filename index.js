const express = require('express');
const bodyParser = require('body-parser');
const bot = require('./src/bot');

const app = express();

app.use(bodyParser.json());

app.listen(process.env.PORT);

app.post(`/${bot.token}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});
