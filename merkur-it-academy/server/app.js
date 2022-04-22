const path = require('path');

const compression = require('compression');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const expressStaticGzip = require('express-static-gzip');
const helmet = require('helmet');
const morgan = require('morgan');

const {
  apiErrorMiddleware,
  logErrorMiddleware,
} = require('@merkur/plugin-error/server');

const expressStaticConfig = {
  enableBrotli: true,
  index: false,
  orderPreference: ['br'],
  maxAge: '14d',
};

const app = express();
app.set('view engine', 'ejs');

const { slowdownMiddleware } = require('./middlewares/slowdownMiddleware');
const authRouteFactory = require('./routes/auth');
const errorRouteFactory = require('./routes/error');
const playgroundRouteFactory = require('./routes/playground');
const widgetAPIRouteFactory = require('./routes/widgetAPI');

const playground = playgroundRouteFactory();
const error = errorRouteFactory();
const widgetAPI = widgetAPIRouteFactory();
const auth = authRouteFactory();

app
  .use(morgan('dev'))
  .use(
    helmet({
      contentSecurityPolicy: false,
    })
  )
  .use(cors())
  .use(compression())
  .use(
    '/static',
    expressStaticGzip(path.join(__dirname, 'static'), expressStaticConfig)
  )
  .use(
    '/static',
    expressStaticGzip(
      path.join(__dirname, '../build/static'),
      expressStaticConfig
    )
  )
  .use(
    '/@merkur/tools/static/',
    express.static(path.join(__dirname, '../node_modules/@merkur/tools/static'))
  )
  .use(express.json())
  .use(cookieParser())
  .use(widgetAPI.router)
  .use(slowdownMiddleware())
  .use('/auth', auth.router)
  .use(playground.router)
  .use(error.router)
  .use(logErrorMiddleware())
  .use(apiErrorMiddleware());

module.exports = {
  app,
};
