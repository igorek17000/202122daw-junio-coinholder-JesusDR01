const { Schema, model } = require("mongoose");

const PortfolioSchema = Schema({
    title: {
        type: String,
        required: true,
    }, 
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    coins:{
        type:  [{ type: Schema.Types.ObjectId, ref: 'Coin'}],
        required: true,
        default: []
    },
    editable:{
        type: Boolean,
        default: true
    },
    type:{
        type: String
    }
});

//Esto sirve para que el objeto Evento en lugar de mandar _id mande id, sustituye el nombre
//También quita el __v
PortfolioSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model("Portfolio", PortfolioSchema);
