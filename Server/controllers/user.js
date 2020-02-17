const User = require('../models/user')
const bcrypt = require('bcrypt');
const saltRounds = 10;
var jwt = require('jsonwebtoken');

exports.createUser = (req, res) => {
    let user = new User();
    user.name = req.body.name;
    bcrypt.hash(req.body.password, saltRounds).then((hash) => {
        user.password = hash;
        user.save((err, user) => {
            if (err) res.status(500).send(err);
            return res.status(201).send(user);
        });
    });
}

exports.getUsers = (req, res) => {
    User.find({}, function (err, users) {
        if (err) res.status(500).send(err);
        var userMap = {};
        users.forEach(function (user) {
            userMap[user._id] = user;
        });
        return res.send(userMap);
    });
}

exports.login = (req, res) => {
    User.findOne({ name: new RegExp('^' + req.body.name + '$', "i") }).then((doc) => {
        bcrypt.compare(req.body.psd, doc.password, function (err, resp) {
            if (err) res.status(500).send(err);
            if (resp == true) {
                jwt.sign({ name: req.body.name }, 'shhhhh', function (err, token) {
                    if (err) return res.status(500).send(err);
                    return res.send(token)
                });
            }
        });
    })
}