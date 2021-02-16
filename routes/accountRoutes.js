const { getUserDetails } = require('./utils');
const requireLogin = require('../middlewares/requireLogin');


module.exports = (app) => {
    app.get('/api/accountDetails', requireLogin, async (req, res) => {
        const details = await getUserDetails(req.user._id);
        res.send([
            {
                title: 'Account-Key',
                value: details.account
            },
            {
                title: 'Plantyp',
                value: details.plan
            }
        ]);
    });
}