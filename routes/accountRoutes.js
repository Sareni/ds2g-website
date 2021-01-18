const mongoose = require('mongoose');
const axios = require('axios');
const requireLogin = require('../middlewares/requireLogin');
const { accountManagementServerURI } = require('../config/keys');


module.exports = (app) => {
    app.get('/api/accountDetails', requireLogin, async (req, res) => {
        const { data } = await axios.get(`${accountManagementServerURI}/getAccount/${req.user._id}`);
        res.send([
            {
                title: 'Account-Key',
                value: data.account
            },
            {
                title: 'Plantyp',
                value: data.plan
            }
        ]);
    });
}