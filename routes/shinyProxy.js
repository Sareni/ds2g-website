const httpProxy = require('http-proxy');
const keys = require('../config/keys');
const { getTrackingKey } = require('./utils');

const proxy = httpProxy.createProxyServer({
    target: {
        host: keys.shinyHost,
        port: keys.shinyPort,
        protocol: 'http'
      },
    changeOrigin: true,
    prependPath: false,
    auth: 'test:test123'
});

function setIfExists(proxyReq, header, value){
    if(value){
        proxyReq.setHeader(header, encodeURIComponent(value));
    }
}

proxy.on('error', () => {
    console.log('Error connecting');
    console.log(e);
});
  
proxy.on('proxyReq', async (proxyReq, req, res, options) => {
    /* if (req.user && req.user._id) {
        const { account } = await getUserDetails(req.user._id);
        setIfExists(proxyReq, 'x-ta-key', account);
    } */
});

proxy.on('proxyRes', (proxyRes, req, res) => {
    if (proxyRes.headers['x-ta-key'])
        delete proxyRes.headers['x-ta-key'];
});

proxy.on('proxyReqWs', (proxyReq, req, socket, options, head) => {
    //setIfExists(proxyReq, 'x-ta-key', getTrackingKey(req.user._id));
});

module.exports = () => {
    return proxy;
}