const axios = require('axios');
const { accountManagementServerURI } = require('../config/keys');

const getUserDetails = async (userId) => {
    const { data } = await axios.get(`${accountManagementServerURI}/getAccount/${userId}`);
    return data;
}


module.exports = {
    getUserDetails
}