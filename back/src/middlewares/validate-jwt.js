const { response } = require('express');
const jwt = require('jsonwebtoken');
const {jwtSecret} = require('../config/config')
const validateJWT = (req, res = response, next) => {
    //Vale, el usuario me ha mandado su token en los headers, ahora toca validarlo.
    
    //JWT en los headers
    const token = req.header('JWT');
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        })
    }

    try {
        const {uid, name, email, picture} = jwt.verify(token,jwtSecret)
        req.uid = uid;
        req.name = name;
        req.email = email;
        req.picture = picture;
        req.token = token;
    } catch (err) {
        console.log(err)
        return res.status(401).json({
            ok: false,
            msg: 'token no válido'
        })
    }

    next()
}

module.exports = {
    validateJWT
}