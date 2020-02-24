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
        if (users == null) res.status(500).send({ "err": "not found" });

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
    console.log(req.params.id);

    Plugin.findById(req.params.id).then((plugin, err) => {
        if (err) return res.status(500).send(err);
        if (plugin == null) res.status(500).send({ "err": "not found" });

        console.log(plugin);
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
    // let json = JSON.parse(req.body.comment);
    console.log(req.body);

    console.log(req.body.comment);

    // console.log(json);
    req.body.comment.user = req.user.name;
    Plugin.findOneAndUpdate({ _id: req.body.id }, { $push: { comments: req.body.comment } }, { upsert: true, new: true }, (err, doc) => {
        if (err) return res.status(500).send(err);
        if (doc == null) res.status(500).send({ "err": "not found" });
        return res.status(200).send(doc);
    });
}

exports.addLike = (req, res) => {
    Plugin.findOneAndUpdate({ _id: req.body.id }, { $addToSet: { likes: req.user } }, { upsert: true, new: true }, (err, plugin) => {
        if (err) return res.status(500).send(err);
        if (plugin == null) res.status(500).send({ "err": "not found" });
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

exports.hasLike = (req, res) => {

    Plugin.findById(req.body.id).then((plugin, err) => {
        if (err) return res.status(500).send(err);
        if (plugin == null) res.status(500).send({ "err": "not found" });
        if (plugin.likes.includes(req.user._id)) {
            return res.status(200).send({ "canLike": false });
        }
        return res.status(200).send({ "canLike": true });
    });
}

