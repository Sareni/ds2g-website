
const requireLogin = require('../middlewares/requireLogin');
//const proxy = require('./supersetProxy')();
var httpProxy = require('http-proxy');
 var proxy = httpProxy.createProxyServer();


module.exports = (app) => {
    app.get('/api/reports', requireLogin, async (req, res) => {
        proxy.web(req, res,  { target: 'http://superset.zenpa.at:80', changeOrigin: true, ignorePath: true }); //http://localhost:8088/login/auth0
    });
}