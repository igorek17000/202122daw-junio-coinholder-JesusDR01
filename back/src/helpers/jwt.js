const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/config");
//En los parámetros me llega el payload del JWT
const generateJWT = (payload) => {
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            jwtSecret,
            {
                expiresIn: "2h",
            },
            (err, token) => {
                if (err) {
                    console.log(err);
                    reject("No se pudo generar el jwt");
                }
                resolve(token);
            }
        );
    });
};

module.exports = {
    generateJWT,
};
