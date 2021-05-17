const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
const app = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(
    cookieSession({ // TODO: express-session?
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);

/* var sess = {
    secret: 'CHANGE THIS TO A RANDOM SECRET',
    cookie: {},
    resave: false,
    saveUninitialized: true
  }; */

// sess.cookie.secure = true; // production

app.use(passport.initialize());
app.use(passport.session()); // sess

require('./routes/authRoutes')(app);


//if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
       });
//}

const PORT = process.env.PORT || 5002; 
const server = app.listen(PORT);