const passport = require('passport');
const _ = require('lodash');
const { encrypt } = require('./crypto');
const { getUserDetails } = require('./utils');

module.exports = (app) => {
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    }));
    
    app.get(
        '/auth/google/callback',
        passport.authenticate('google'),
        (req, res) => {
            res.redirect('/account');
        }
    );

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

    app.get('/api/current_user', async (req, res) => {
        if (req.user && req.user._id) {
            const { account } = await getUserDetails(req.user._id);
            const encryptedData = encrypt(account);
            let userWithShinyKey = { shinyKey: {
                key: encryptedData.content,
                iv: encryptedData.iv
            }}
            _.merge(userWithShinyKey, req.user);
            return res.send(userWithShinyKey);
        }
        res.send();
    });

    app.post('/auth/signup', passport.authenticate('local-signup', {
        successRedirect: '/',
        failureRedirect: '/signup',
        failureFlash: {
            type: 'messageFailure',
            message: 'Email already taken.'
        },
        successFlash: {
            type: 'messageSuccess',
            message: 'Successfully signed up.'
        }
    }));

    app.post('/auth/login', passport.authenticate('local', {
            successRedirect: '/account',
            failureRedirect: '/login',
            failureFlash: true
        }
    ));
}
