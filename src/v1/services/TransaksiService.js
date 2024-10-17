const transaksiRepository = require('../repositories/TransaksiRepository');
const productRepository = require('../repositories/ProductRepository');
const ResponseError = require('../../utilities/response-error');

const DEFAULT_ONGKIR = 5000;
const FREE_ONGKIR_THRESHOLD = 15000;
const DEFAULT_DISCOUNT = 10;
const DISCOUNT_THRESHOLD = 50000;

const createTransaksi = async (order, user) => {
    if (user.level !== 'customer') {
        throw new ResponseError(
            'Only customer users can create transaction',
            403
        );
    }

    const transaksi = await createTransaction(order, user);
    return await saveTransaksi(transaksi);
};

const getAllTransaksi = async (user) => {
    if (user.level !== 'merchant') {
        throw new ResponseError('Only merchant users can get transaction', 403);
    }

    return await transaksiRepository.findAllTransaksi();
};

const createTransaction = async (order, user) => {
    const transaksiDetail = await createTransaksiDetail(order);
    const countTotal = countTotalTransaksi(transaksiDetail);
    const ongkir = await countOngkir(countTotal);
    const diskon = countDiskon(countTotal);
    const total_bayar = await countTotalBayar(countTotal, ongkir, diskon);
    return {
        user_id: user.id,
        invoice: generateInvoice(),
        total: countTotal,
        ongkir: ongkir,
        diskon: diskon,
        total_bayar: total_bayar,
        transaksiDetail: transaksiDetail,
    };
};

const generateInvoice = () => {
    var date = new Date();
    return (
        date.getFullYear() +
        ('0' + (date.getMonth() + 1)).slice(-2) +
        ('0' + date.getDate()).slice(-2) +
        ('0' + date.getHours()).slice(-2) +
        ('0' + date.getMinutes()).slice(-2) +
        ('0' + date.getSeconds()).slice(-2)
    );
};

const countTotalTransaksi = (transaksiDetail) => {
    return transaksiDetail.reduce((acc, cur) => acc + cur.total, 0);
};

const countOngkir = async (countTotal) => {
    if (isFreeOngkir(countTotal)) {
        return 0;
    }

    return DEFAULT_ONGKIR;
};

function isFreeOngkir(total) {
    return total > FREE_ONGKIR_THRESHOLD;
}

const countDiskon = (totalTransaksi) => {
    if (isDiscountThresholdReached(totalTransaksi)) {
        return (DEFAULT_DISCOUNT * totalTransaksi) / 100;
    }

    return 0;
};

const isDiscountThresholdReached = (total) => {
    return total > DISCOUNT_THRESHOLD;
};

async function countTotalBayar(totalTransaksi, ongkir, diskon) {
    return totalTransaksi + ongkir - diskon;
}

const createTransaksiDetail = async (order) => {
    // Validasi ketersedian produk dan stok
    for (const item of order.items) {
        const product = await productRepository.findById(item.id);
        if (!product) {
            throw new ResponseError(
                `Product dengan id ${item.id} tidak ada`,
                404
            );
        }
    }

    return await Promise.all(order.items.map(createSingleTransaksiDetail));
};

const createSingleTransaksiDetail = async (item) => {
    return {
        produk_id: item.id,
        qty: item.qty,
        total: await countTotal(item),
    };
};

const countTotal = async (item) => {
    const product = await productRepository.findById(item.id);
    return product.harga * item.qty;
};

const saveTransaksi = async (transaksi) => {
    const transaksiCreated = await transaksiRepository.createTransaksi({
        user_id: transaksi.user_id,
        invoice: transaksi.invoice,
        total: transaksi.total,
        ongkir: transaksi.ongkir,
        diskon: transaksi.diskon,
        total_bayar: transaksi.total_bayar,
    });

    for (const detail of transaksi.transaksiDetail) {
        await createTransactionDetail(transaksiCreated.id, detail);
    }

    return transaksiCreated;
};

const createTransactionDetail = async (transaksiId, detail) => {
    await transaksiRepository.createTransaksiDetail({
        transaksi_id: transaksiId,
        produk_id: detail.produk_id,
        qty: detail.qty,
        total: detail.total,
    });
};

module.exports = {
    createTransaksi,
    getAllTransaksi,
};
