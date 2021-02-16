const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
const app = express();
const proxy = require('./routes/proxy')();

require('./models/User');
require('./models/Survey');
require('./services/passport');

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(
    cookieSession({ // TODO: express-session?
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);
require('./routes/accountRoutes')(app);
require('./routes/shinyRoutes')(app);

mongoose.connect(keys.mongodbConnectionString, { useNewUrlParser: true });

//if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
       });
//}

const PORT = process.env.PORT || 5001; 
const server = app.listen(PORT);
server.on('upgrade', function (req, socket, head) {
    proxy.ws(req, socket, head);
  });
