const User = require('../models/user')
const bcrypt = require('bcrypt');
const saltRounds = 10;
var jwt = require('jsonwebtoken');




exports.createUser = (req, res) => {
    let user = new User();
    user.name = req.body.name;
    console.log(req.body.password)
    bcrypt.hash(req.body.password, saltRounds).then((hash) => {
        user.password = hash;
        console.log(hash)
        user.save((err, user) => {
            if (err) res.send(err);
            res.send(user);
        });
    });

}

exports.getUsers = (req, res) => {
    User.find({}, function (err, users) {
        var userMap = {};

        users.forEach(function (user) {
            userMap[user._id] = user;
        });

        res.send(userMap);
    });
}

exports.login = (req, res) => {
    User.findOne({ name: new RegExp('^' + req.body.name + '$', "i") }).then((doc) => {
        bcrypt.compare(req.body.psd, doc.password, function (err, resp) {
            if (resp == true) {
                jwt.sign({ name: req.body.name }, 'shhhhh', function (err, token) {
                    console.log(token);
                    jwt.verify(token, 'shhhhh', function (err, decoded) {
                        console.log(decoded.name) // bar
                    });
                });

            }
            res.send(resp)
        });

    })

}