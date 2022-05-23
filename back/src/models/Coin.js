const { Schema, model } = require("mongoose");

const CoinSchema = Schema({
    idCoingecko: {
        type: String,
        required: true,
        unique: false
    }, 
    idPortfolio:{
        type: Schema.Types.ObjectId,
        ref: "Portfolio",
        required: true,
        unique: false
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    image:{
        type: String,
        required: true,
    },
    name :String,
    symbol: String,
    transactions:{
        type:  [{ type: Schema.Types.ObjectId, ref: 'Transaction'}],
        required: true,
        default: []
    },
    invisible: Boolean,
    address: String,
});

//Esto sirve para que el objeto Evento en lugar de mandar _id mande id, sustituye el nombre
//También quita el __v
CoinSchema.method("toJSON", function () {
    const { __v, ...object } = this.toObject();
    // object.id = _id;
    return object;
});

CoinSchema.index({ idCoingecko: 1, idPortfolio: 1, user: 1}, { unique: true });
CoinSchema.method("addTransaction", function (transaction) {
    this.transactions.push(transaction);
});
module.exports = model("Coin", CoinSchema);
