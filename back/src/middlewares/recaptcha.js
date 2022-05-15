const recaptchaIsSuccess = async (req, res, next) => {
    if (req.recaptcha && req.recaptcha.error) {
        return res.status(401).json({
            ok: false,
            msg: req.recaptcha.error
        })
    }
    return next();
};

module.exports = {
    recaptchaIsSuccess,
};
