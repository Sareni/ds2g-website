const passport = require('passport');
const _ = require('lodash');
const { encrypt } = require('./crypto');
const { getUserDetails } = require('./utils');
const requireLogin = require('../middlewares/requireLogin');
const oauth2Service = require('../services/oauth2.js');

const server = oauth2Service.getOAuthServer();

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

    app.post('/api/client', /*requireLogin,*/ (req, res) => {
        var client = new Client();  // Set the client properties that came from the POST data
        client.name = req.body.name;
        client.id = req.body.id;
        client.secret = req.body.secret;
        client.userId = req.user._id;  // Save the client and check for errors
        client.save(
            function(err) {
                if (err)
                    res.send(err);   
                res.json({ message: 'Client added to the locker!', data: client });
            }
        );
    });

    app.get('/api/client', /*requireLogin,*/ (req, res) => {
        Client.find({ userId: req.user._id }, function(err, clients) {
            if (err)
              res.send(err);    
            
            res.json(clients);
          });
    });

    app.get('/api/oauth2/authorize', requireLogin, (req, res) => {
        server.authorization(
            function(clientId, redirectUri, callback) {
                Client.findOne({ id: clientId }, function (err, client) {
                    if (err) { return callback(err); }     
                    return callback(null, client, redirectUri);
                });
        });
        function (req, res){
          res.render('dialog', { transactionID: req.oauth2.transactionID, user: req.user, client: req.oauth2.client });
        }
    });

    app.post('/api/oauth2/authorize', requireLogin, server.decision); // , server.errorHandler

    app.post('/api/oauth2/token', requiereBearerAuthentication, server.decision, server.errorHandler);

    app.get('/api/userinfo', 
  passport.authenticate('bearer', { session: false }),
  function(req, res) {
    res.json(req.user);
  });
}