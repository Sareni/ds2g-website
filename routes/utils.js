const axios = require('axios');
const { accountManagementServerURI } = require('../config/keys');

const getUserDetails = async (userId) => {
    try {
        const { data } = await axios.get(`${accountManagementServerURI}/getAccount/${userId}`);
        return data;
    } catch (e) {
        return {account: '', plan: ''}
    }
    
}


module.exports = {
    getUserDetails
}