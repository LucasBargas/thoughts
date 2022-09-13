const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const flash = require('express-flash'); // Flash messages

const app = express();

const conn = require('./db/conn');

// Models
const Toughts = require('./models/Tought');
const User = require('./models/User');

// Routes
const toughtsRoutes = require('./routes/toughtsRoutes');
const authRoutes = require('./routes/authRoutes');

// Controller Toughts
const ToughtController = require('./controllers/ToughtController');

// template engine
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

// Statics files
app.use(express.static('public'));

// body answer
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Session middleware
// This feature show where express will save sessions
// This will ensure that the user stay logged.
app.use(
  session({
    name: 'session',
    secret: 'nosso_secret',
    resave: false,
    saveUninitialized: 'false',
    store: new FileStore({
      logFn: () => {},
      // Path where files will be saved
      path: require('path').join(require('os').tmpdir(), 'sessions'),
    }),
    // This Cookie will stay on user pc
    cookie: {
      secure: false,
      maxAge: 3600000,
      expires: new Date(Date.now() + 3600000),
      httpOnly: true,
    },
  }),
);

// Middleware flash messages - system status
app.use(flash());

// Set session to res
app.use((req, res, next) => {
  if (req.session.userId) {
    res.locals.session = req.session;
  }

  next();
});

// Routes
app.use('/toughts', toughtsRoutes);
app.use('/', authRoutes);

app.get('/', ToughtController.showToughts);

conn
  .sync()
  // .sync({ force: true }) // - Delete all datas, isn't good to produce
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
