const jwt = require('jsonwebtoken');

const checkAuth = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).send('Unauthorized: No token provided');
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send('Unauthorized: Invalid token');
        }

        req.username = decoded.username;
        next();
    });
}

module.exports = checkAuth;