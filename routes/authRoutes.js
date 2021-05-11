const passport = require('passport');
const _ = require('lodash');
const { encrypt } = require('./crypto');
const { getUserDetails } = require('./utils');
const requireLogin = require('../middlewares/requireLogin');
const requireBearerAuthentication = require('../middlewares/requireBearerAuthentication');
const requireClientAuthentication = require('../middlewares/requireClientAuthentication');
const oauth2Service = require('../services/oauth2.js');
const keys = require('../config/keys');

module.exports = (app) => {
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    }));

    app.get('/auth/auth0', passport.authenticate('auth0', {
        scope: 'openid email profile'
    }));

    app.get(
        '/auth/auth0/callback',
        passport.authenticate('auth0'),
        (req, res) => {
            res.redirect('/account');
        }
    );
    
    app.get(
        '/auth/google/callback',
        passport.authenticate('google'),
        (req, res) => {
            res.redirect('/account');
        }
    );


// https://dev-x4orscvo.eu.auth0.com/v2/logout
    app.get('/api/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

    app.get('/api/current_user', async (req, res) => {
        if (req.user && req.user._id) {
            const { account } = await getUserDetails(req.user._id);

            let encryptedData;
            let key = '';
            let iv = '';
            if (account) {
                encryptedData = encrypt(account);
                key =  encryptedData.content;
                iv = encryptedData.iv;
            }
            let userUpdate = {
                shinyKey: {
                    key,
                    iv 
                }
            }
            _.merge(userUpdate, req.user);
            return res.send(userUpdate);
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


    app.get('/api/oauth2/authorize', requireLogin, async (req, res) => {
        const { response_type, client_id, redirect_uri, scope, state, nonce} = req.query;

        if (client_id !== keys.client_id) {
            res.status(404).end('Client ID not found!');
            return;
        }
        if (response_type !== 'code') {
            res.status(404).end('Response Type not found!');
            return;
        }

        const code = await oauth2Service.createNewCode(client_id, redirect_uri, req.user._id);
        res.redirect(`${redirect_uri}?code=${code.value}&state=${state}`);
    });

    app.post('/api/oauth2/token', requireClientAuthentication, async (req, res) => {
        const responseObject = await oauth2Service.exchangeCodeForToken(req.body.code, req.user.client_id); //req.user._id
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(responseObject));
    });

    app.get('/api/userinfo', requireBearerAuthentication, (req, res) => {
        const responseObject = {
            'username': 'Martin Limberger',
            'email': 'martin.limberger@gmx.net'
        }
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(responseObject));
    });
}