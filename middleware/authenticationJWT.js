const jwt = require("jsonwebtoken");

//JWT AUTHENTICATION

const authenticationJWT = (req,res,next) =>{
    const authHeader = req.headers.authorization;


    if (!authHeader) return res.sendStatus(401);

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.MY_JWT_TOKEN, (err, user) => {
        if (err) return res.sendStatus(403);

        req.user = user;
        next();
    });
}

module.exports = authenticationJWT;


