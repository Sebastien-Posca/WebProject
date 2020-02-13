const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

const PluginSchema = new Schema({
    user: { type: ObjectId, required: true, ref: "User" },
    path: { type: String, required: true },
    name: { type: String, required: true },
    likes: [{ type: ObjectId, required: true, ref: "User" }],
    comments: [{
        text: { type: String },
        user: { type: String },
        date: { type: Date }
    }]
});

module.exports = mongoose.model('Plugin', PluginSchema);