import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import winston from 'winston';
import expressWinston from 'express-winston';
import indexRouter from './routes/index';
import newsRouter from './routes/news-router';
import userRouter from './routes/user-router';
import authRouter from './routes/auth-router';
import passport from './auth';
import expressSession from 'express-session';
import bodyParser from 'body-parser';

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// log winston
app.use(expressWinston.logger({
  transports: [
    new winston.transports.File({filename: 'combined.log'}),
  ],
  msg: "HTTP {{req.method}} {{req.url}}", 
}));

app.use(expressSession({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use (passport.initialize());
app.use(passport.session());

app.use('/', authRouter);
app.use('/', indexRouter);
app.use('/news', newsRouter);
app.use('/user', userRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
