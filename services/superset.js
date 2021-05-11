const axios = require('axios');
const { exec } = require('child_process');
const { supersetConfig, testPw } = require('../config/keys');

const DEMO_CONTENT_TYPES = {
    BASIC: 'basic',
    NONE: 'none'
}

async function loginToSuperset() {
    const res = await axios.post(`${supersetConfig.apiURL}/security/login`, {
        password: supersetConfig.password,
        provider: "db",
        refresh: true,
        username: supersetConfig.username
      });
      return res.data.access_token;
}

async function createSupersetDataset(name, authToken) {
    const res = await axios.post(`${supersetConfig.apiURL}/dataset/`, {
        database: 2,
        owners: [1],
        schema: "",
        table_name: name
      }, {
          headers: { Authorization: `Bearer ${authToken}`}
      });
      return res.data.id;
}

async function createSupersetAccount(name, pw, datasetId, authToken) {
    const res = await axios.post(`${supersetConfig.apiURL}/security/create_ta_user/`, {
        username: name,
        password: pw,
        datasourceId: datasetId + ""
      }, {
          headers: { Authorization: `Bearer ${authToken}`}
      });
      return res.data.id;
}

async function createBasicSupersetContent(userid, authToken) {
    // Create "Übersicht -So viele Tracks sind bereits mit deinem Account-Key gemeldet worden."-Chart
    // Create "Herzlich Willkommen"-Dashboard
}

function createNoSupersetContent() {
    console.log('No Superset content created');
}

async function createDemoContent(userid, authToken, type = DEMO_CONTENT_TYPES.BASIC,) {
    switch(type) {
        case DEMO_CONTENT_TYPES.BASIC: await createBasicSupersetContent(userid, authToken); break;
        case DEMO_CONTENT_TYPES.NONE:
        default: createNoSupersetContent();
    }
}

async function initUserInSuperset(accountKey, pw=testPw) {
    const name = accountKeyToName(accountKey);
    const authToken = await loginToSuperset();
    const datasetId = await createSupersetDataset(name, authToken);
    const userId = await createSupersetAccount(name, pw, datasetId, authToken);
    await createDemoContent(userId, authToken);
    console.log('Superset User is ready!');
}

function accountKeyToName(accountKey) {
    return accountKey.replaceAll('-', '3');
}

module.exports = {
    initUserInSuperset,
    accountKeyToName,
}