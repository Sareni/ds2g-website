const mongoose = require('mongoose');
const { Schema } = mongoose;

const clientSchema = new Schema({
    name: { type: String, unique: true, required: true },
    id: { type: String, required: true },
    secret: { type: String, required: true },
    userId: { type: String, required: true }
});

mongoose.model('clients', clientSchema);