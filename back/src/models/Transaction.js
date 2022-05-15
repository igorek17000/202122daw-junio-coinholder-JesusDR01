const { Schema, model } = require("mongoose");

const TransactionSchema = Schema({
    idCoin: {
        type: Schema.Types.ObjectId,
        ref: "Coin",
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    investment: {
        type: Number,
        required: true,
    },
    entryPrice: {
        type: Number,
    },
    notes: {
        type: String,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    type: {
        type: String,
        enum: ["buy", "sell"],
        required: true,
    },
});

//Esto sirve para que el objeto Evento en lugar de mandar _id mande id, sustituye el nombre
//También quita el __v
TransactionSchema.method("toJSON", function () {
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model("Transaction", TransactionSchema);
