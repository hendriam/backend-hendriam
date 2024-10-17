const transaksiService = require('../services/TransaksiService');

const createTransaksi = async (req, res, next) => {
    // try {
    //     console.log(req.body);
    //     // const created = await transaksiService.createTransaksi(req.body);
    //     // logger.info(`Transaction created successfully' => ${JSON.stringify(created)}`);
    //     // return res.status(20).json({
    //     //     message: 'Transaction created successfully',
    //     //     data: created,
    //     // });
    // } catch (error) {
    //     next(error);
    // }
};

module.exports = { createTransaksi };
