const mongoose = require('mongoose'),
    Schema = mongoose.Schema

const UserSchema = new Schema({
    name: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    thumbnail: { type: String, required: false }
});

module.exports = mongoose.model('User', UserSchema);