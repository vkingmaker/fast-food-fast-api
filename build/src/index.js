// import app from './app';
var app = require('./app');

const { PORT = 3000 } = process.env;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`)); // eslint-disable-line no-console
module.exports = app;
