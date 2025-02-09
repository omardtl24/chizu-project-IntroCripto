// Esta es una API que crea una preferencia de MercadoPago con los productos recibidos en el body
const payload = require("payload");
const getPayloadClient = require("../../getPayload");
const { MercadoPagoConfig, Preference } = require("mercadopago");
const { any } = require("zod");

const client = new MercadoPagoConfig({
    accessToken: "TEST-3524539752788201-012515-593b32ee2e6253a6732d1eb2fb893aa2-1107696534",
    options: { timeout: 5000, idempotencyKey: 'abc' }
});

const isProductValid = (product) => {
    return typeof product.title === 'string' &&
        typeof product.quantity === 'number' &&
        typeof product.unit_price === 'number' &&
        typeof product.picture_url === 'string';
};

const createPreference = async (req, res) => {
    try {
        console.log("Llegaste al primer paso :)");

        const isProduct = req.body[0].isProduct;

        const productsIDS = req.body.map((product) => product.id)
        const userID = req.body[0].user_id;
        const products = req.body.map(({ id, user_id, isProduct,...rest }) => rest);


        if (!Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ error: "No se recibieron productos" });
        }

        for (const product of products) {
            if (!isProductValid(product)) {
                return res.status(400).json({ error: "Formato de producto inválido" });
            }
        }
        const preference2 = new Preference(client);

        //#region ~~~~~~~~~~~~~~~~~~~~~~~~~~~ Payload truco ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        // traer user de la DB
        const { docs: users } = await payload.find({
            collection: 'users',
            where: {
                id: { equals: userID },
            },
        });
        const user = users[0];
        let chizuOrder = any
        // Crear la orden en la base de datos
        if (isProduct) {
            chizuOrder = await payload.create({
                collection: 'orders',
                data: {
                    preferenceId: null,
                    paymentId: null,
                    _isPaid: false,
                    products: productsIDS,
                    user: userID,
                    total: products.reduce((acc, product) => {
                        return acc + product.unit_price;
                    }, 0),
                },
            });
        }
        else {
            chizuOrder = await payload.create({
                collection: 'orders',
                data: {
                    preferenceId: null,
                    paymentId: null,
                    _isPaid: false,
                    tiers: productsIDS,
                    user: userID,
                    total: products.reduce((acc, product) => {
                        return acc + product.unit_price;
                    }, 0),
                },
            });
        }


        await payload.update({
            collection: 'users',
            id: userID,
            data: {
                ordenes: ((user.ordenes_hist ?? []).length + 1),
                ordenes_hist: [
                    ...(user.ordenes_hist?.map((ord) => typeof ord === 'object' ? ord.id : '') ?? []),
                    chizuOrder.id
                ],
            }
        });

        if (isProduct) {
            const { docs: productsPayload } = await payload.find({
                collection: 'products',
                where: {
                    id: {
                        in: productsIDS
                    },
                },
            })

            productsPayload.forEach(async (product) => {
                // const qty = products_info.find( ([id, qty]) => id === product.id )?.[1] ?? 1

                await payload.update({
                    collection: 'products',
                    id: product.id,
                    data: { compras: (typeof product.compras === 'number' ? product.compras : 0) + 1 },
                });

            })
        }

        //#endregion ~~~~~~~~~~~~~~~~~~~~~~~~~~~ Payload truco ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        console.log("Productos", products);

        if (isProduct) {
            const value2 = await preference2.create({
                body: {
                    items: products,
                    back_urls: {

                        success: `${process.env.NEXT_PUBLIC_SERVER_URL}/thank-you?orderId=${chizuOrder.id}`, // crear order
                        failure: `${process.env.NEXT_PUBLIC_SERVER_URL}/cart`,
                        pending: `${process.env.NEXT_PUBLIC_SERVER_URL}/thank-you?orderId=${chizuOrder.id}`,
                    },
                    auto_return: "approved",
                }
            });

            return res.status(200).json({ id: value2.id });
        }

        else {
            const value2 = await preference2.create({
                body: {
                    items: products,
                    back_urls: {
                        success: `${process.env.NEXT_PUBLIC_SERVER_URL}/tier-thank-you?orderId=${chizuOrder.id}`, // crear order
                        failure: `${process.env.NEXT_PUBLIC_SERVER_URL}/products`,
                        pending: `${process.env.NEXT_PUBLIC_SERVER_URL}/tier-thank-you?orderId=${chizuOrder.id}`,
                    },
                    auto_return: "approved",
                }
            });

            return res.status(200).json({ id: value2.id });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error al crear la preferencia :(" });
    }
};

module.exports = { createPreference };
