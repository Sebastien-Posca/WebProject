const User = require('../models/user')
const bcrypt = require('bcrypt');
const saltRounds = 10;
var jwt = require('jsonwebtoken');
var fs = require('fs');


exports.createUser = (req, res) => {
    let user = new User();
    user.name = req.body.name;
    user.thumbnail = req.body.thumbnail;
    bcrypt.hash(req.body.password, saltRounds).then((hash) => {
        user.password = hash;
        user.save((err, user) => {
            if (err) res.status(500).send(err);
            jwt.sign({ id: user._id, name: user.name }, 'shhhhh', function (err, token) {
                if (err) return res.status(500).send(err);
                return res.status(201).send({ "token": token, "user": user })
            });
        });
    });
}

exports.getUsers = (req, res) => {
    User.find({}, function (err, users) {
        if (err) return res.status(500).send(err);
        if (users == null) return res.status(500).send({ "err": "not found" });
        var userMap = {};
        users.forEach(function (user) {
            userMap[user._id] = user;
        });
        return res.send(userMap);
    });
}

exports.login = (req, res) => {
    //console.log(req.body);

    User.findOne({ name: new RegExp('^' + req.body.name + '$', "i") }).then((doc) => {
        if (doc == null) return res.status(500).send({ "err": "not found" });
        //console.log(doc);
        if (doc.thumbnail != undefined) {
            let thumbnail = fs.readFileSync('./profilePics/' + doc.thumbnail, { encoding: 'base64' })
            if (!thumbnail.startsWith('data:image')) {
                doc.thumbnail = "data:image/jpg;base64," + thumbnail;
            } else {
                doc.thumbnail = thumbnail;
            }
        }
        bcrypt.compare(req.body.pwd, doc.password, function (err, resp) {
            if (err) return res.status(500).send(err);
            if (resp == true) {
                console.log(doc);

                jwt.sign({ id: doc._id, name: doc.name }, 'shhhhh', function (err, token) {
                    if (err) return res.status(500).send(err);
                    return res.status(200).send({ "token": token, "user": doc })
                });
            }
        });
    })
}