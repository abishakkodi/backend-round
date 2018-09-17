const express = require( 'express');
const path = require( 'path');
const logger = require( 'morgan');
const bodyParser = require( 'body-parser');
const moment = require('moment');
const simpleId = require('simple-unique-id');
const routes = require('./routes')
const app = express();

const idMaker = () => {
  const idString = moment();
  const uniqueId = simpleId.generate(idString);
  console.log(uniqueId);
  return uniqueId;
}

app.disable('x-powered-by');

app.use(logger('dev', {
  skip: () => app.get('env') === 'test'
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')));
app.use((req,res, next)=>{
  console.log("IN CUSTOM MIDDLEWARE", req.body);
  req.body.id = idMaker();
  next();
});

// Routes
app.use('/', routes);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  res
    .status(err.status || 500).end();
});


module.exports = app;
