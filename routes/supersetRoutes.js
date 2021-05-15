
const requireLogin = require('../middlewares/requireLogin');
//const proxy = require('./supersetProxy')();
var httpProxy = require('http-proxy');
var proxy = httpProxy.createProxyServer({
    target: 'http://superset.zenpa.at:80/login/ownauth',
    changeOrigin: true,
    ignorePath: true,
    //ws: true,
    //preserveHeaderKeyCase: true,
    cookieDomainRewrite: {
        "test.zenpa.at": "superset.zenpa.at"
    }
});
proxy.on('upgrade', function (req, socket, head) {
    proxy.ws(req, socket, head);
  });

// let cookie;

proxy.on('proxyRes', (proxyRes, req, res) => {
    /*Object.keys(proxyRes.headers).forEach(function (key) {
        if (key === 'set-cookie') {
            console.log(proxyRes.headers[key]);
            const proxyCookie = proxyRes.headers["set-cookie"];
            if (proxyCookie) {
                cookie = proxyCookie;
            }
            //proxyRes.headers[key] = 'session=.test; HttpOnly; Path=/; SameSite=None; Domain=test.zenpa.at'; // HttpOnly; Path=/; SameSite=None; // Domain=http://test.zenpa.at
            //res.append(key, proxyRes.headers[key] + '; Domain=http://superset.zenpa.at');
        }
        //res.append('set-cookie', 'test');
        //proxyRes.append('set-cookie', 'test');
    });*/
});

proxy.on('proxyReq', (proxyReq, req, res, options) => {
    console.log('req ---');
    Object.keys(req.headers).forEach(function (key) {
        console.log(key, req.headers[key]);
        //proxyReq.setHeader(key, req.headers[key]);
    });
    //console.log('proxyReq', proxyReq);
  
    /*if (cookie) {
        proxyReq.setHeader('cookie', cookie);
    }*/
});

module.exports = (app) => {
    // CSRF TOKEN-cookie doesnt get proxied...
    app.get('/api/reports', requireLogin, async (req, res) => {
        proxy.web(req, res); //http://superset.zenpa.at:80/login/auth0
    });
}