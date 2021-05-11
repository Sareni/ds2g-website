const mongoose = require('mongoose');
const { Schema } = mongoose;

const tokenSchema = new Schema({
    value: { type: String, required: true },
    userId: { type: String, required: true },
    clientId: { type: String, required: true }
});

mongoose.model('tokens', tokenSchema);