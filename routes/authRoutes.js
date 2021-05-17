const passport = require('passport');
const mongoose = require('mongoose');
const _ = require('lodash');
const keys = require('../config/keys');

module.exports = (app) => {
    app.get('/api/login', (req, res) => {
        res.send();
    });

    app.get('/api/logout', (req, res) => {
        res.send();
    });

    app.get('/api/current_user', async (req, res) => {
        res.send();
    });
}