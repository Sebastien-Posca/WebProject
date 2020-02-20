const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // try {
    //     console.log(req.originalUrl)
    //     if (req.originalUrl != '/user/login') {
    //         const token = req.headers.authorization.split(' ')[0];
    //         const decodedToken = jwt.verify(token, 'shhhhh');
    //         req.name = decodedToken.name;
    //     }
    //     next();
    // } catch {
    //     return res.status(401).json({
    //         error: new Error('Invalid request!')
    //     });
    // }
    req.user = {
        _id: "5e41621c3b41ba1631a6d79e", name: "moi", password: "pswd"
    }
    next();

};