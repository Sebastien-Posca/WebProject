const Plugin = require('../models/plugin')
var fs = require('fs');
var path = require('path');
var express = require("express");



exports.createPlugin = (user, localPath, path, name, moduleName, description, tags, category, version) => {
    return new Promise((resolve, reject) => {
        let plugin = new Plugin();
        plugin.moduleName = moduleName;
        plugin.localPath = localPath;
        plugin.user = user;
        plugin.path = path;
        plugin.name = name;
        plugin.description = description;
        console.log(tags);
        plugin.tags = JSON.parse(tags);
        plugin.category = category;
        plugin.version = version;
        plugin.save((err, plugin) => {
            if (err) reject(err);
            resolve(plugin);
        });
    })
}


exports.getPlugins = (req, res) => {
    Plugin.find({}, function (err, users) {
        if (err) return res.status(500).send(err);

        var pluginMap = [];

        users.forEach(function (plugin) {
            let thumbnail = fs.readFileSync(plugin.localPath + '/thumbnail.jpg', "utf8")
            let pair;
            if (!thumbnail.startsWith('data:image')) {
                pair = { thumbnail: "data:image/jpg;base64," + thumbnail }

            } else {
                pair = { thumbnail: thumbnail }
            }
            plugin = {
                ...plugin._doc, ...pair
            };
            pluginMap.push(plugin);
        });

        return res.status(200).send(pluginMap);
    });
}

exports.getPlugin = (req, res) => {
    Plugin.findById(req.params.id).then((doc, err) => {
        if (err) return res.status(500).send(err);
        return res.status(200).send(doc);
    });
}