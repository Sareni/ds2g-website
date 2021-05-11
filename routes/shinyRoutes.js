
const requireLogin = require('../middlewares/requireLogin');
const proxy = require('./shinyProxy')();


module.exports = (app) => {
    app.get('/api/reports/*', requireLogin, async (req, res) => {
        proxy.web(req, res);
    });
}