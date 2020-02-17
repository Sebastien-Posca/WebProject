const Plugin = require('../models/plugin')
var fs = require('fs');
var path = require('path');
var express = require("express");



exports.createPlugin = (user, path, name, moduleName, description, tags, category, version) => {
    let plugin = new Plugin();
    plugin.moduleName = moduleName;
    plugin.user = user;
    plugin.path = path;
    plugin.name = name;
    plugin.description = description;
    console.log(tags);
    plugin.tags = tags;
    plugin.category = category;
    plugin.version = version;
    plugin.save((err, plugin) => {
        if (err) return err;
        return 0;
    });
}


exports.getPlugins = (req, res) => {
    Plugin.find({}, function (err, users) {
        if (err) return res.status(500).send(err);

        var pluginMap = [];

        users.forEach(function (plugin) {
            let thumbnail = fs.readFileSync(plugin.path + '/thumbnail.jpg', "utf8")
            let pair = { thumbnail: thumbnail }

            plugin = {
                ...plugin._doc, ...pair
            };
            pluginMap.push(plugin);
        });

        return res.status(200).send(pluginMap);
    });
}

exports.getPlugin = (req, res) => {
    Plugin.findById(req.params.id).then((err, doc) => {
        if (err) return res.status(500).send(err);
        return res.status(200).send(doc);
    });
}

exports.servePlugin = (req, res) => {
    Plugin.findById(req.params.id).then((err, doc) => {
        if (err) return res.status(500).send(err);
        express.static(path.join(__dirname, "../apps", doc.path))
        return res.sendFile(path.join(__dirname, "../apps", doc.path, req.params.filename));
    });
}
