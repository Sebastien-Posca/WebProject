const Plugin = require('../models/plugin')
const User = require('../models/user')

exports.createPlugin = (user, path, name) => {
    User.findOne({ name: new RegExp('^' + user + '$', "i") }).then((doc) => {
        let plugin = new Plugin();
        plugin.user = doc;
        plugin.path = path;
        plugin.name = name;
        plugin.save((err, plugin) => {
            if (err) console.log(err);
            console.log(plugin);
            ;
        });
    });
}


exports.getPlugins = (req, res) => {
    Plugin.find({}, function (err, users) {
        var pluginMap = [];

        users.forEach(function (plugin) {
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
