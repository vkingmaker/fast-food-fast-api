// import express from 'express';
var express = require('express');
// import path from 'path';
var path =require('path');
// import logger from 'morgan';
var logger = require('morgan');
// import bodyParser from 'body-parser';
var bodyParser = require('body-parser');
// import routes from './routes';
// var routes = require('./routes');
var order = require('./order');

const app = express();
app.disable('x-powered-by');

// View engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');

app.use(logger('dev', {
  skip: () => app.get('env') === 'test'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')));

// Routes
// app.use('/', routes);
app.use('/order', order);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  res
    .status(err.status || 500)
    .render('error', {
      message: err.message
    });
});

module.exports = app;
// export default app;
