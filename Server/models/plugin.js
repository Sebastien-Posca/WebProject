const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

const PluginSchema = new Schema({
    user: { type: String, required: true },
    localPath: { type: String, required: true },
    path: { type: String, required: true },
    name: { type: String, required: true },
    moduleName: { type: String, required: true },
    description: { type: String },
    version: { type: String },
    category: { type: String },
    tags: [{ type: String }],
    likes: [{ type: ObjectId, required: true, ref: "User" }],
    comments: [{
        text: { type: String },
        user: { type: String },
        date: { type: Date }
    }],
    git: { type: String, required: false }
});

module.exports = mongoose.model('Plugin', PluginSchema);