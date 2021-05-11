const passport = require('passport');
module.exports = passport.authenticate('client-basic', { session: false });