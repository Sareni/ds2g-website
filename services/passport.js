const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');
const bcrypt = require('bcrypt');
const axios = require('axios');

const { accountManagementServerURI } = require('../config/keys');

// TODO: passport-local-mongoose

const User = mongoose.model('users');


async function createTrackingAccount(userId, plan) {
  await axios.post(`${accountManagementServerURI}/createAccount`, {
    userId,
    plan
  });
}

/* passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
}); */

passport.serializeUser((user, done) => {
  done(null, user); // TODO: secure to
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });

      if (existingUser) {
        return done(null, existingUser);
      }

      const user = await new User({ googleId: profile.id }).save();
      await createTrackingAccount(user.id, null);

      done(null, user);
    }
  )
);

passport.use(
  new LocalStrategy({
    usernameField: 'email',
    },
    async (email, password, done) => {
      const existingUser = await User.findOne({ username: email });

      //if (err) { return done(err); }
      // if (!user) { return done(null, false); }

      if (existingUser) {
        if (!bcrypt.compareSync(password, existingUser.passwordHash)) {
          // wrong password
          console.log('wrong password');
          return done(null, false);
        }
        // return user
        console.log('return user');
        return done(null, existingUser);
      }
      
      // user not found
      console.log('user not found');
      return done(null, false); 
    }
  )
);

passport.use('local-signup', new LocalStrategy({
  usernameField: 'email', // map username to custom field, we call it email in our form
  passwordField: 'password',
  passReqToCallback: true // lets you access other params in req.body
},
async (req, email, password, done) => {
  // Return false if user already exists - failureRedirect
  const existingUser = await User.findOne({ username: email });
  if (existingUser) { return done(null, false) }

  // Create new user and return the user - successRedirect
  const newUser = await User.create({
    username: email,
    passwordHash: bcrypt.hashSync(password, 10), // hash the password early
    //phone: req.body.phone
  });
  
  await createTrackingAccount(newUser.id, null);

  // save the user_id to the req.user property
  return done(null, newUser);
}
));
