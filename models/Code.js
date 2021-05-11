const mongoose = require('mongoose');
const { Schema } = mongoose;

const codeSchema = new Schema({
    value: { type: String, required: true },
    redirectUri: { type: String, required: true },
    userId: { type: String, required: true },
    clientId: { type: String, required: true }
});

mongoose.model('codes', codeSchema);