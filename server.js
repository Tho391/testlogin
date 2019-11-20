const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const keys = require('./config/key');
const cookieSession = require('cookie-session');
// const expressSession = require('express-session');
const passport = require('passport');

// Register passport
require('./app/services/passport');
// Connect to database
require('./app/services/connectDatabase').connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(cookieSession({
  maxAge: keys.cookieMaxAge | 0,
  keys: [keys.cookieKey]
}));
// app.use(expressSession({
//   secret: keys.expressSessionSecret,
//   resave: true,
//   saveUninitialized: true,
//   cookie: {
//     maxAge: 86400000
//   }
// }));

app.use(passport.initialize());
app.use(passport.session());

// Route api
let apiRouter = express.Router();



require('./app/data/seedDatabase')(app);
require('./app/middlewares/setHeaders')(app);
require('./app/routes/homepageRoute')(app);
require('./app/routes/authRoutes')(app);
require('./app/routes/userRoutes')(apiRouter);
require('./app/routes/deckRoutes')(apiRouter);
require('./app/routes/cardRoutes')(apiRouter);
require('./app/routes/testRoutes')(apiRouter);
require('./app/routes/statisticsRoutes')(apiRouter);
require('./app/routes/proposedDeckRoutes')(apiRouter);

app.use('/api', apiRouter);

app.listen(keys.port);
console.log('App listening on port ' + keys.port);
