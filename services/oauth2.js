const oauth2orize = require('oauth2orize')
const User = require('../models/User');
const Client = require('../models/Client');
const Token = require('../models/Token');
const Code = require('../models/Code');


function uid (len) {
    var buf = []
      , chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      , charlen = chars.length;  for (var i = 0; i < len; ++i) {
      buf.push(chars[getRandomInt(0, charlen - 1)]);
    }  return buf.join('');
  };

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

const server = oauth2orize.createServer();

// Register serialialization function
server.serializeClient(function(client, callback) {
    return callback(null, client._id);
  });
  
// Register deserialization function
server.deserializeClient(function(id, callback) {
    Client.findOne({ _id: id }, function (err, client) {
        if (err) { return callback(err); }
        return callback(null, client);
    });
});

// Register authorization code grant type
server.grant(oauth2orize.grant.code(function(client, redirectUri, user, ares, callback) {
    // Create a new authorization code
    var code = new Code({
      value: uid(16),
      clientId: client._id,
      redirectUri: redirectUri,
      userId: user._id
    });  // Save the auth code and check for errors
    code.save(function(err) {
      if (err) { return callback(err); }    callback(null, code.value);
    });
  }));

  server.exchange(oauth2orize.exchange.code(function(client, code, redirectUri, callback) {
    Code.findOne({ value: code }, function (err, authCode) {
      if (err) { return callback(err); }
      if (authCode === undefined) { return callback(null, false); }
      if (client._id.toString() !== authCode.clientId) { return callback(null, false); }
      if (redirectUri !== authCode.redirectUri) { return callback(null, false); }    // Delete auth code now that it has been used
      authCode.remove(function (err) {
        if(err) { return callback(err); }      // Create a new access token
        var token = new Token({
          value: uid(256),
          clientId: authCode.clientId,
          userId: authCode.userId
        });      // Save the access token and check for errors
        token.save(function (err) {
          if (err) { return callback(err); }        callback(null, token);
        });
      });
    });
  }));

exports = {
    getOAuthServer: () => {
        return server;
    }
}