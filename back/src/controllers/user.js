//@ts-check
const { promisify } = require("util");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const nodemailerSendgrid = require("nodemailer-sendgrid");
const passport = require("passport");
const _ = require("lodash");
const validator = require("validator");
const User = require("../models/User");
const { generateJWT } = require("../helpers/jwt");
const { smtpPassword, smtpUser, sendGridKey, clientUrl } = require("../config/config");
const { ERROR_CODES } = require("../constants/error");
const randomBytesAsync = promisify(crypto.randomBytes);

const ENTITY = ERROR_CODES.ENTITY.USER;

/**
 * POST /signup
 * Create a new local account.
 */
module.exports.postSignup = async (req, res, next) => {
    let type = "unknown";
    req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false });

    const user = new User({
        email: req.body.email,
        password: req.body.password,
        profile: {
            name: req.body.name,
            picture: "",
        },
    });
    try {
        const existingUser = await User.findOne({ email: req.body.email });

        if (existingUser) {
            type = "exists";
            return res.status(400).json({
                ok: false,
                error: `${ENTITY}.${type}`,
            });
        }

        await user.save();
        const token = await generateJWT({
            uid: user.id,
            email: user.email,
            name: user.profile.name,
            picture: user.profile.picture,
        });
        return res.status(201).json({
            ok: true,
            uid: user.id,
            email: user.email,
            name: user.profile.name,
            token,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            ok: false,
            error: `${ENTITY}.${type}`,
        });
    }
};

/**
 * POST /login
 * Sign in using email and password.
 */
module.exports.postLogin = (req, res, next) => {
    let type = "unknown";
    req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false });
    passport.authenticate("local", async (err, user, info) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                error: `${ENTITY}.${type}`,
            });
        }
        if (info?.msg) {
            return res.status(400).json({
                ok: false,
                error: `${ENTITY}.${type}`,
            });
        }
        if (user) {
            const token = await generateJWT({
                uid: user.id,
                username: user.username,
                email: user.email,
                picture: user.picture,
            });
            res.json({
                ok: true,
                email: user.email,
                username: user.username,
                picture: user.picture,
                token,
            });
        }
    })(req, res, next);
};

module.exports.revalidateToken = async (req, res = response) => {
    const { uid, username, email, picture, token } = req;
    res.json({
        ok: true,
        uid,
        token,
        username,
        email,
        picture,
    });
};

module.exports.handleServiceLogin = async (req, res) => {
    const user = {
        email: req.user.email,
        username: req.user.profile.name,
        picture: req.user.profile.picture,
        id: req.user._id,
    };

    const token = await generateJWT({
        uid: user.id,
        username: user.username,
        email: user.email,
        picture: user.picture,
    });
    return res.redirect(`${clientUrl}/login?token=${token}`);
};

module.exports.modifyBinanceApi = async (req, res = response) => {
    const { apiKey, apiSecret } = req.body;
    let type = "updating";
    try {
        const user = await User.findById(req.uid);
        user.binanceApiKey = apiKey;
        user.binanceApiSecret = apiSecret;
        await user.save();
        res.json({
            ok: true,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false,
            error: `${ERROR_CODES.EXTRAS.BINANCE}.${type}`,
        });
    }
};

module.exports.modifyKucoinApi = async (req, res = response) => {
    let type = "updating";
    const { apiKey, apiSecret } = req.body;
    try {
        const user = await User.findById(req.uid);
        user.kucoinApiKey = apiKey;
        user.kucoinApiSecret = apiSecret;
        await user.save();
        res.json({
            ok: true,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false,
            error: `${ERROR_CODES.EXTRAS.KUCOIN}.${type}`,
        });
    }
};

module.exports.existingPortfolios = async (req, res = response) => {
    let type = "unknown";
    try {
        const user = await User.findById(req.uid);
        return res.status(200).json({
            ok: true,
            binance: Boolean(user.binanceApiKey || user.binanceApiSecret),
            kucoin: Boolean(user.kucoinPassphrase || user.kucoinApiKey || user.kucoinApiSecret),
        });
    } catch (err) {
        return res.status(401).json({
            ok: false,
            error: `${ERROR_CODES.ENTITY.PORTFOLIO}.${type}`,
        });
    }
};

module.exports.profile = async (req, res = response) => {
    let type = "unknown";
    try {
        const user = await User.findById(req.uid);
        const {
            _id: id,
            email,
            profile: { name },
        } = user;
        return res.status(200).json({
            ok: true,
            id,
            email,
            name,
        });
    } catch (err) {
        return res.status(401).json({
            ok: false,
            error: `${ERROR_CODES.ENTITY.PORTFOLIO}.${type}`,
        });
    }
};

/**
 * POST /reset/:token
 * Process the reset password request.
 */
module.exports.postReset = async (req, res, next) => {
    console.log(req.body.recoverToken);
    const validationErrors = [];
    let type = "unknown";
    if (!validator.isLength(req.body.password, { min: 8 })) {
        type = "passwordLength";
        validationErrors.push({ error: `${ENTITY}.${type}` });
    }
    if (req.body.password !== req.body.confirmPassword) {
        type = "passwordMatch";
        validationErrors.push({ error: `${ENTITY}.${type}` });
    }
    if (!validator.isHexadecimal(req.body.recoverToken)) {
        type = "token";
        validationErrors.push({ error: `${ENTITY}.${type}` });
    }

    if (validationErrors.length) {
        return res.status(400).json({
            ok: false,
            msg: validationErrors,
        });
    }

    const resetPassword = async () => {
        console.log(req.body.recoverToken);
        const user = await User.findOne({ passwordResetToken: req.body.recoverToken })
            .where("passwordResetExpires")
            .gt(Date.now());

        if (!user) {
            throw new Error("Password reset token is invalid or has expired");
        }
        user.password = req.body.password;
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        return await user.save();
    };

    const sendResetPasswordEmail = (user) => {
        if (!user) {
            return;
        }
        const mailOptions = {
            to: user.email,
            from: "coinholder@tech",
            subject: "Your Coinholder password has been changed",
            text: `Hello,\n\nThis is a confirmation that the password for your account ${user.email} has just been changed.\n`,
        };
        const mailSettings = {
            successfulType: "success",
            successfulMsg: "Success! Your password has been changed.",
            loggingError:
                "ERROR: Could not send password reset confirmation email after security downgrade.\n",
            errorType: "warning",
            errorMsg:
                "Your password has been changed, however we were unable to send you a confirmation email. We will be looking into it shortly.",
            mailOptions,
            req,
        };
        return sendMail(mailSettings);
    };
    try {
        const user = await resetPassword();
        try {
            const mail = await sendResetPasswordEmail(user);
            return res.status(200).json({
                ok: true,
                msg: mail,
            });
        } catch (err) {
            return res.status(400).json({
                ok: false,
                error: `${ENTITY}.${type}`,
            });
        }
    } catch (err) {
        return res.status(400).json({
            ok: false,
            error: `${ENTITY}.${type}`,
        });
    }
};

/**
 * POST /forgot
 * Create a random token, then the send user an email with a reset link.
 */
module.exports.postForgot = (req, res, next) => {
    const validationErrors = [];
    let type = "unknown";
    if (!validator.isEmail(req.body.email)) {
        type = "email";
        validationErrors.push({ error: `${ENTITY}.${type}` });
    }

    if (validationErrors.length) {
        return res.status(400).json({
            ok: false,
            msg: validationErrors,
        });
    }
    req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false });

    const createRandomToken = randomBytesAsync(16).then((buf) => buf.toString("hex"));

    const setRandomToken = (token) =>
        User.findOne({ email: req.body.email }).then((user) => {
            if (!user) {
                type = "nonExist";
                return res.status(400).json({
                    ok: false,
                    error: `${ENTITY}.${type}`,
                });
            } else {
                user.passwordResetToken = token;
                user.passwordResetExpires = Date.now() + 3600000; // 1 hour
                user = user.save();
            }
            return user;
        });

    const sendForgotPasswordEmail = (user) => {
        if (!user) {
            return;
        }
        const token = user.passwordResetToken;
        const mailOptions = {
            to: user.email,
            from: "coinholder@tech",
            subject: "Reset your password on Coinholder",
            text: `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n
        Please click on the following link, or paste this into your browser to complete the process:\n\n
        ${clientUrl}/reset/${token}\n\n
        If you did not request this, please ignore this email and your password will remain unchanged.\n`,
        };
        const mailSettings = {
            successfulType: "info",
            successfulMsg: `An e-mail has been sent to ${user.email} with further instructions.`,
            loggingError: "ERROR: Could not send forgot password email after security downgrade.\n",
            errorType: "errors",
            errorMsg: "Error sending the password reset message. Please try again shortly.",
            mailOptions,
            req,
        };
        return res.status(200).json({
            ok: true,
            email: sendMail(mailSettings),
        });
    };

    createRandomToken.then(setRandomToken).then(sendForgotPasswordEmail);
};

/**
 * Helper Function to Send Mail.
 */
const sendMail = (settings) => {
    let transportConfig;
    if (sendGridKey) {
        transportConfig = nodemailerSendgrid({
            apiKey: sendGridKey,
        });
    } else {
        transportConfig = {
            host: "smtp.eu.mailgun.org",
            port: 587,
            domain: 'coinholder.tech',
            auth: {
                user: smtpUser,
                pass: smtpPassword,
            },
        };
    }
    let transporter = nodemailer.createTransport(transportConfig);

    return transporter
        .sendMail(settings.mailOptions)
        .then(() => {
            return settings.successfulMsg;
            // settings.req.flash(settings.successfulType, { msg: settings.successfulMsg });
        })
        .catch((err) => {
            if (err.message === "self signed certificate in certificate chain") {
                console.log(
                    "WARNING: Self signed certificate in certificate chain. Retrying with the self signed certificate. Use a valid certificate if in production."
                );
                transportConfig.tls = transportConfig.tls || {};
                transportConfig.tls.rejectUnauthorized = false;
                transporter = nodemailer.createTransport(transportConfig);
                return transporter.sendMail(settings.mailOptions).then(() => {
                    settings.req.flash(settings.successfulType, { msg: settings.successfulMsg });
                });
            }
            console.log(settings.loggingError, err);
            // settings.req.flash(settings.errorType, { msg: settings.errorMsg });
            return err;
        });
};
