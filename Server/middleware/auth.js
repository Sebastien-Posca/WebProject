const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        console.log(req.originalUrl)
        if (req.originalUrl != '/user/login') {
            const token = req.headers.authorization.split(' ')[0];
            const decodedToken = jwt.verify(token, 'shhhhh');
            req.user = decodedToken;
            console.log("RIIIIIICARDOOOOOOOOOOOOOOO");

            console.log(decodedToken);

        }
        next();
    } catch {
        return res.status(401).json({
            error: new Error('Invalid request!')
        });
    }

    // console.log("TOKEN =" + req.headers.authorization);
    // req.user = {
    //     _id: "5e53d7d4d3fe9d13578987ee", name: "pogchamp", password: "valise"
    // }
    //next();

};