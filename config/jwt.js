var jwt = require('jsonwebtoken');
var User = require('../models/user')


function createToken(userId) {
    return jwt.sign({ userId }, 'my black cat');
}

function verifyToken(req, res, next) {

    const authorizationHeader = req.headers['authorization'];
    let token;

    if (authorizationHeader) {
        token = authorizationHeader.split(' ')[1];
    }

    if (!token) return res.status(403).json({ message: 'No token provided', status: 403 });

    jwt.verify(token, 'my black cat', function (err, decoded) {
        if (err) return res.status(500).json({ message: 'Something happen bad. Please try again in few minutes.', error: err, status: 500 })

        User.findOne({ _id: decoded.userId }, (err, user) => {
            if (err) return res.status(500).json({ message: 'Something happen bad. Please try again in few minutes.', error: err, status: 500 })

            if (!user) return res.status(399).json({ message: 'Invalid Creadentinals. User Not Found.', status: 399 })

            req.user = user
            next()
        })
    });
}

module.exports = {
    createToken,
    verifyToken
}