const Plugin = require('../models/plugin')
var fs = require('fs');
var path = require('path');
var express = require("express");



exports.createPlugin = (user, localPath, path, name, moduleName, description, tags, category, version, git) => {
    return new Promise((resolve, reject) => {
        let plugin = new Plugin();
        plugin.moduleName = moduleName;
        plugin.localPath = localPath;
        plugin.user = user;
        plugin.path = path;
        plugin.name = name;
        plugin.description = description;
        plugin.tags = JSON.parse(tags);
        plugin.category = category;
        plugin.version = version;
        if (git != undefined) {
          plugin.git = git;
        }
        plugin.save((err, plugin) => {
            if (err) reject(err);
            resolve(plugin);
        });
    })
}


exports.getPlugins = (req, res) => {
    Plugin.find({}, function (err, users) {
        if (err) return res.status(500).send(err);
        if (users == null) return res.status(500).send({ "err": "not found" });

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
            plugin.likes = plugin.likes.length;
            pluginMap.push(plugin);
        });

        return res.status(200).send(pluginMap);
    });
}

exports.getPlugin = (req, res) => {
    Plugin.findById(req.params.id).then((plugin, err) => {
        if (err) return res.status(500).send(err);
        if (plugin == null) return res.status(500).send({ "err": "not found" });

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
        plugin.likes = plugin.likes.length;
        return res.status(200).send(plugin);
    });
}

exports.addComment = (req, res) => {
    req.body.comment.user = req.user.name;
    Plugin.findOneAndUpdate({ _id: req.body.id }, { $push: { comments: req.body.comment } }, { upsert: true, new: true }, (err, doc) => {
        if (err) return res.status(500).send(err);
        if (doc == null) return res.status(500).send({ "err": "not found" });
        return res.status(200).send({ "msg": true });
    });
}

exports.addLike = (req, res) => {
    Plugin.findOneAndUpdate({ _id: req.body.id }, { $addToSet: { likes: req.user.id } }, { upsert: true, new: true }, (err, plugin) => {
        if (err) return res.status(500).send(err);
        if (plugin == null) return res.status(500).send({ "err": "not found" });
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
        plugin.likes = plugin.likes.length;
        return res.status(200).send({ "msg": true });
    });
}

exports.hasLike = (req, res) => {
    Plugin.findById(req.body.id).then((plugin, err) => {
        if (err) return res.status(500).send(err);
        if (plugin == null) return res.status(500).send({ "err": "not found" });
        if (plugin.likes.includes(req.user.id)) {
            return res.status(200).send({ "canLike": false });
        }
        return res.status(200).send({ "canLike": true });
    });
}
