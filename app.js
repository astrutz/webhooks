const express = require('express');
const logger = require('morgan');
const createError = require('http-errors');
const requestId = require('@ablegroup/requestid');

const app = express();
const PORT = 3003;

const rootRoute = require('./routes/root.js')();
const testhookRoute = require('./routes/testhook.js')();

app.use(requestId);
logger.token('requestId', (req) => req.requestId);

// eslint-disable-next-line max-len
app.use(logger('[ctx@49610 rid=":requestId"][http@49610 method=":method" url=":url" millis=":response-time" sbytes=":res[content-length]" status=":status"] '));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', rootRoute);
app.use('/test', testhookRoute);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

app.listen(PORT, () => {
  console.log(`Application is running on port ${PORT}.`);
});