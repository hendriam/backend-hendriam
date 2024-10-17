const DB_NAME = process.env.DB_NAME || "merah-kuning-hijau-db";
const DEFAULT_ONGKIR = parseInt(process.env.DEFAULT_ONGKIR) || 5000;
const FREE_ONGKIR_THRESHOLD =
  parseInt(process.env.FREE_ONGKIR_THRESHOLD) || 15000;
const DEFAULT_DISCOUNT = parseInt(process.env.DEFAULT_DISCOUNT) || 10;
const DISCOUNT_THRESHOLD = parseInt(process.env.DISCOUNT_THRESHOLD) || 50000;

const db = require(`./models/${DB_NAME}`);

const Produk = db.sequelize.models.Produk;
const Transaksi = db.sequelize.models.Transaksi;
const TransaksiDetail = db.sequelize.models.TransaksiDetail;

async function buyApi(req, res) {
  try {
    const accessToken = extractAccessToken(req);
    const isAccessTokenValid = isJwtValid(accessToken);
  } catch (err) {
    return res.status(401).send(err.message);
  }

  try {
    const user = extractUserFromJwt(extractAccessToken(req));
    const transaksi = await buy(user, req.body);

    return res
      .status(200)
      .json({ message: createMessage(transaksi), data: transaksi });
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

function extractAccessToken(req) {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    throw new Error("No authorization header");
  }

  if (!isAccessTokenValid(authHeader)) {
    throw new Error("Invalid access token");
  }

  const tokenParts = authHeader.split(" ");
  return tokenParts[1];
}

function isAccessTokenValid(accessToken) {
  const tokenParts = accessToken.split(" ");
  return tokenParts.length === 2 && tokenParts[0] === "Bearer";
}

function isJwtValid(accessToken) {
  return true;
}

function extractUserFromJwt(accessToken) {
  return {
    id: 3,
    name: "Customer 1",
    username: "customer1",
  };
}

async function buy(user, order) {
  const transaksi = await createTransaction(user, order);

  await saveTransaksi(transaksi);

  return transaksi;
}

function createMessage(transaksi) {
  const message = "Transaksi berhasil dilakukan";

  if (
    isFreeOngkir(transaksi.total) &&
    isDiscountThresholdReached(transaksi.total)
  ) {
    return `${message}, diskon ${DEFAULT_DISCOUNT}% dengan gratis ongkir`;
  }

  if (isFreeOngkir(transaksi.total)) {
    return `${message}, gratis ongkir`;
  }

  if (isDiscountThresholdReached(transaksi.total)) {
    return `${message}, diskon ${DEFAULT_DISCOUNT}%`;
  }

  return message;
}

async function createTransaction(user, order) {
  return {
    user_id: user.id,
    total: await countTotalTransaksi(order),
    ongkir: await countOngkir(order),
    diskon: await countDiskon(order),
    total_bayar: await countTotalBayar(order),
    transaksiDetail: await createTransaksiDetail(order),
  };
}

async function countTotalTransaksi(order) {
  const transaksiDetail = await createTransaksiDetail(order);

  return transaksiDetail.reduce((acc, cur) => acc + cur.amount, 0);
}

async function countOngkir(order) {
  const totalTransaksi = await countTotalTransaksi(order);

  if (isFreeOngkir(totalTransaksi)) {
    return 0;
  }

  return DEFAULT_ONGKIR;
}

function isFreeOngkir(total) {
  return total > FREE_ONGKIR_THRESHOLD;
}

async function countDiskon(order) {
  const totalTransaksi = await countTotalTransaksi(order);

  if (isDiscountThresholdReached(totalTransaksi)) {
    return (DEFAULT_DISCOUNT * totalTransaksi) / 100;
  }

  return 0;
}

function isDiscountThresholdReached(total) {
  return total > DISCOUNT_THRESHOLD;
}

async function countTotalBayar(order) {
  const totalTransaksi = await countTotalTransaksi(order);
  const ongkir = await countOngkir(order);
  const diskon = await countDiskon(order);

  return totalTransaksi + ongkir - diskon;
}

async function createTransaksiDetail(order) {
  return await Promise.all(order.items.map(createSingleTransaksiDetail));
}

async function createSingleTransaksiDetail(item) {
  return {
    produk_id: item.id,
    qty: item.qty,
    amount: await countAmount(item),
  };
}

async function countAmount(item) {
  const price = await getProdukPrice(item.id);

  return price * item.qty;
}

async function getProdukPrice(produkId) {
  const produk = await getProdukByID(produkId);

  if (null == produk) {
    throw new Error(`Produk ${produkId} tidak ditemukan`);
  }

  return produk.harga;
}

async function getProdukByID(produkId) {
  return await Produk.findOne({
    where: { id: produkId },
    raw: true,
  });
}

async function saveTransaksi(transaksi) {
  const transaksiCreated = await Transaksi.create({
    user_id: transaksi.user_id,
    total: transaksi.total,
    ongkir: transaksi.ongkir,
    diskon: transaksi.diskon,
    total_bayar: transaksi.total_bayar,
    tanggal: new Date(),
  });

  for (const detail of transaksi.transaksiDetail) {
    await createTransactionDetail(transaksiCreated.id, detail);
  }
}

async function createTransactionDetail(transaksiId, detail) {
  await TransaksiDetail.create({
    transaksi_id: transaksiId,
    produk_id: detail.produk_id,
    qty: detail.qty,
    amount: detail.amount,
    tanggal: new Date(),
  });
}

module.exports = {
  buyApi,
};
