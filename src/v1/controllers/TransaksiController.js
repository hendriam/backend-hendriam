const transaksiService = require('../services/TransaksiService');
const logger = require('../../configs/logger');

const getAllTransaksi = async (req, res, next) => {
    try {
        const transactions = await transaksiService.getAllTransaksi(req.user);
        logger.info(
            `Transaction list successfully retrieved' => ${JSON.stringify(
                transactions
            )}`
        );
        return res.status(201).json({
            message: 'Transaction list successfully retrieved',
            data: transactions,
        });
    } catch (error) {
        next(error);
    }
};

const createTransaksi = async (req, res, next) => {
    try {
        const created = await transaksiService.createTransaksi(
            req.body,
            req.user
        );
        logger.info(
            `Transaction created successfully' => ${JSON.stringify(created)}`
        );
        return res.status(201).json({
            message: 'Transaction created successfully',
            data: created,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { createTransaksi, getAllTransaksi };
