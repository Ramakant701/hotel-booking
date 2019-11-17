import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cors from 'cors';
import config from 'config';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import passport from 'passport/lib';
import session from 'express-session';
import database from './database';
import {routes} from './middleware';
import lowercasePaths from "express-lowercase-paths";

const app = express();

//gzip compression
app.use(compression());

//polyfill for flatMap
Array.prototype.flatMap = function (lambda) {
    return Array.prototype.concat.apply([], this.map(lambda));
};

const MongoStore = require('connect-mongo')(session);

//object copy for setting new store
const sessionOpts = Object.assign({}, config.get('sessionOpts'));
const mongooseConnection = database();
sessionOpts.store = new MongoStore({mongooseConnection});

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Origin,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,Authorization");
    next();
});


app.use(cors());
// Serves static files
app.use(express.static(path.join(__dirname, 'public')));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json({
    limit: '50mb',
}));
app.use(express.urlencoded({
    limit: '50mb',
    extended: true
}));
app.use(cookieParser());

// Express Session
app.use(session(sessionOpts));

// Passport init
app.use(passport.initialize());

app.use(passport.session(sessionOpts));

// use express router
Object.keys(routes).forEach(el => app.use(el, routes[el]));

//serve all other routes to public
app.get('*', (req,res) => res.sendFile(path.join(__dirname+'/public/index.html')));

//uncapitalize middleware - placed after static middleware
app.use(lowercasePaths());
// Error handling

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});
// error handler
app.use(function (err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
