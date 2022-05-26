const { response } = require("express");
const jwt = require("jsonwebtoken");
const Coin = require("../models/Coin");
const Transaction = require("../models/Transaction");
const { ERROR_CODES } = require("../constants/error");
const ENTITY = ERROR_CODES.ENTITY.TRANSACTION;

const getTransactions = async (req, res = response) => {
    const transactions = await Transaction.find({
        user: { _id: jwt.decode(req.header("JWT"))?.uid },
    });
    return res.json({ ok: true, transactions });
};

const createTransaction = async (req, res = response) => {

    let type = "creating"
    try {
        const transaction = new Transaction(req.body);
        const coin = await Coin.findById(req.body.idCoin);
        transaction.user = req.uid;
        const savedTransaction = await transaction.save();
        coin.transactions.push(savedTransaction._id);
        await Coin.findByIdAndUpdate(coin.id, coin, { new: true });
        return res.json({
            ok: true,
            savedTransaction,
        });
    } catch (error) {
        console.log(error);
        if (error?.errors?.type?.kind === "enum") {
            type = "type"
            return res.status(400).json({
                ok: false,
                error: `${ENTITY}.${type}`
            });
        }
        return res.status(500).json({
            ok: false,
            error: `${ENTITY}.${type}`
        });
    }
};

const updateTransaction = async (req, res = response) => {
    const transactionId = req.params.id;
    const uid = req.uid;
    let type  = "updating"
    try {
        const transaction = await Transaction.findById(transactionId);
        if (!transaction) {
            type = "nonExist"
            return res.status(404).json({
                ok: false,
                error: `${ENTITY}.${type}`
            });
        }

        if (transaction.user.toString() !== uid) {
            type = "privilege"
            return res.status(401).json({
                ok: false,
                error: `${ENTITY}.${type}`
            });
        }
        const newTransaction = {
            ...req.body,
            user: uid,
        };
        const UpdatedTransaction = await Transaction.findByIdAndUpdate(
            transactionId,
            newTransaction,
            // { new: true }
        );

        return res.json({
            ok: true,
            UpdatedTransaction,
        });
    } catch (error) {
        
        console.log(error);
        return res.status(500).json({ ok: false,  error: `${ENTITY}.${type}`});
    }
};

const deleteTransaction = async (req, res = response) => {
    const transactionId = req.params.id;
    const uid = req.uid;
    let type = "deleting"
    try {
        const transaction = await Transaction.findById(transactionId).populate([
            {
                path: "idCoin",
                model: "Coin",
                
            },
            {
                path: "idCoin",
                select: "user._id",
            },
        ]);;
        console.log(transaction.idCoin)
        if (!transaction) {
            type = "nonExist"
            return res.status(404).json({
                ok: false,
                error: `${ENTITY}.${type}`
            });
        }

        if (transaction.user.toString() !== uid) {
            type = "privilege"
            return res.status(401).json({
                ok: false,
                error: `${ENTITY}.${type}`
            });
        }

        await Transaction.findByIdAndDelete(transactionId);

        return res.json({
            ok: true,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok: false,  error: `${ENTITY}.${type}` });
    }
};

module.exports = {
    getTransactions,
    createTransaction,
    updateTransaction,
    deleteTransaction,
};
