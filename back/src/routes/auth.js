/*
    Rutas de usuarios /auth
    host + api/auth
*/
const passport = require("passport");
const { Router } = require("express");
const router = Router();
const {
    postSignup,
    postLogin,
    revalidateToken,
    handleServiceLogin,
    postForgot,
    postReset,
} = require("../controllers/user");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");
const { clientUrl } = require("../config/config");
const { recaptchaIsSuccess } = require("../middlewares/recaptcha");
const recaptcha = require("../helpers/recaptcha");
router.post(
    "/signup",
    [
        recaptcha.middleware.verify,
        recaptchaIsSuccess,
        check("name", "El nombre es obligatorio"),
        check("email", "El email es obligatorio").isEmail(),
        check("password", "El password debe de ser de 6 caracteres").isLength({ min: 6 }),
        validateFields,
    ],
    postSignup
);

router.post(
    "/login",
    [
        recaptcha.middleware.verify,
        recaptchaIsSuccess,
        check("email", "El email es obligatorio").isEmail(),
        check("password", "El password debe de ser de 6 caracteres").isLength({ min: 6 }),
        validateFields,
    ],
    postLogin
);

router.get("/validate", validateJWT, revalidateToken);

router.post("/forgot", [recaptcha.middleware.verify, recaptchaIsSuccess], postForgot);

router.post("/reset", [check("recoverToken", "Token es obligatorio"), validateFields], postReset);

/**
 * OAuth authentication routes. (Sign in)
 */

router.get("/facebook", passport.authenticate("facebook", { scope: ["email", "public_profile"] }));
router.get(
    "/facebook/callback",
    passport.authenticate("facebook", {
        assignProperty: "user",
        successRedirect: clientUrl,
        failureRedirect: clientUrl,
    }),
    handleServiceLogin
);
router.get("/github", passport.authenticate("github"));
router.get(
    "/github/callback",
    passport.authenticate("github", { assignProperty: "user" }),
    handleServiceLogin
);

router.get(
    "/google",
    passport.authenticate("google", {
        scope: ["profile", "email"],
        accessType: "offline",
        prompt: "consent",
    })
);
router.get(
    "/google/callback",
    passport.authenticate("google", { assignProperty: "user", successRedirect: "" }),
    handleServiceLogin
);
router.get("/twitter", passport.authenticate("twitter"));
router.get(
    "/twitter/callback",
    passport.authenticate("twitter", { assignProperty: "user" }),
    handleServiceLogin
);

module.exports = router;
