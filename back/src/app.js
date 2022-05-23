const express = require("express");
const compression = require("compression");
const bodyParser = require("body-parser");
const logger = require("morgan");
const errorHandler = require("errorhandler");
const mongoose = require("mongoose");
const passport = require("passport");
const cors = require("cors");
const session = require("express-session");
const path = require("path");
const { mongoDbUri, port, sessionKey } = require("./config/config");
require("./config/passport");

const app = express();
app.use(express.json());

mongoose.connect(mongoDbUri);
mongoose.connection.on("error", (err) => {
    console.error(err);
    console.log("%s MongoDB connection error. Please make sure MongoDB is running.");
    process.exit();
});

app.set("host", "0.0.0.0");
app.set("port", port);
app.use(compression());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: sessionKey }));
app.use(passport.initialize());
app.use(passport.session());

app.use(cors());
app.disable("x-powered-by");
app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});

process.env.NODE_ENV = "development";
if (process.env.NODE_ENV === "development") {
    app.use(errorHandler());
} else {
    app.use((err, req, res) => {
        console.error(err);
        console.log(process.env.NODE_ENV);
        res.status(500).send("Server Error");
    });
}

app.use("/api/auth", require("./routes/auth"));
app.use("/api/transactions", require("./routes/transactions"));
app.use("/api/coins", require("./routes/coins"));
app.use("/api/portfolios", require("./routes/portfolios"));
app.use("/api/account", require("./routes/account"));
app.use("/api/binance", require("./routes/binance"));
app.use("/api/kucoin", require("./routes/kucoin"));
app.use("/api/wallet", require("./routes/wallet"));

app.use(express.static("public"));

app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"), function (err) {
        if (err) {
            res.status(500).send(err);
        }
    });
});

app.listen(app.get("port"), () => {
    console.log(`App is running on http://localhost:${app.get("port")} in ${app.get("env")} mode`);
});

module.exports = app;
