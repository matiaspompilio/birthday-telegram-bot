const { TOKEN } = process.env;
const { HEROKU_URL } = process.env;
const { MONGO_DB_URI } = process.env;
const { NODE_ENV } = process.env;

module.exports = {
  TOKEN,
  HEROKU_URL,
  MONGO_DB_URI,
  NODE_ENV,
};
