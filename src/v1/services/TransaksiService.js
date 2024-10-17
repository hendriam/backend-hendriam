const transaksiRepository = require('../repositories/TransaksiRepository');

const createTransaksi = async (order, user) => {
    if (user.level !== 'customer') {
        throw new ResponseError('Only customer users can transaction', 403);
    }

    const transaksiDetail = await createTransaksiDetail(order);
    console.console.log(transaksiDetail);

    // return await transaksiRepository.createTransaksi(order);
};

async function createTransaksiDetail(order) {
    console.log(order);
}

module.exports = {
    createTransaksi,
};
