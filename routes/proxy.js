const httpProxy = require('http-proxy');
const keys = require('../config/keys');
const { getTrackingKey } = require('./utils');

const proxy = httpProxy.createProxyServer({
    target: {
        host: keys.shinyHost,
        port: keys.shinyPort
      },
    //prependPath: false,
    //ignorePath: true,
    //changeOrigin: true,
    //ws: true,
    //protocolRewrite: 'http',
    //target: 'http://info.cern.ch/'
});

proxy.on('error', function(e) {
    console.log('Error connecting');
    console.log(e);
});

const setIfExists = function(proxyReq, header, value){
    if(value){
        proxyReq.setHeader(header, encodeURIComponent(value));
    }
}
  
proxy.on('proxyReq', function(proxyReq, req, res, options) {
    setIfExists(proxyReq, 'x-ta-key', getTrackingKey(req.user._id));
});


module.exports = () => {
    return proxy;
}