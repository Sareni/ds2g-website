const axios = require('axios');
const { accountManagementServerURI } = require('../config/keys');

const getUserDetails = async (userId) => {
    const { data } = await axios.get(`${accountManagementServerURI}/getAccount/${userId}`);
    return data;
}

const trackingKeyRegister = { };

module.exports = {
    registerTrackingKey: async (userId) => {
        const { account } = await getUserDetails(userId);
        trackingKeyRegister[userId] = account;
    },
    getTrackingKey: (userId) => {
        return trackingKeyRegister[userId];
    },
    getUserDetails
}