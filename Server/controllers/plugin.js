const Plugin = require('../models/plugin')
var fs = require('fs');
var path = require('path');


exports.createPlugin = (user, path, name) => {
    let plugin = new Plugin();
    plugin.user = user;
    plugin.path = path;
    plugin.name = name;
    plugin.save((err, plugin) => {
        if (err) console.log(err);
        console.log(plugin);
        ;
    });
}


exports.getPlugins = (req, res) => {
    Plugin.find({}, function (err, users) {
        var pluginMap = [];

        users.forEach(function (plugin) {
            let thumbnail = fs.readFileSync(plugin.path + '/thumbnail.jpg', "utf8")
            let pair = { thumbnail: thumbnail }

            plugin = {
                ...plugin._doc, ...pair
            };
            pluginMap.push(plugin);
        });

        res.send(pluginMap);
    });
}

exports.getPlugin = (req, res) => {
    Plugin.findById(req.params.id).then((doc) => {
        res.send(doc);
    });
}

exports.getPlugin = (req, res) => {
    Plugin.findById(req.params.id).then((doc) => {
        res.sendFile(path.join(doc.path, doc.name, "index.html"));
    });
}
