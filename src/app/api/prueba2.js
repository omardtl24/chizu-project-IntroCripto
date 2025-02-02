const { MercadoPagoConfig, Preference } = require("mercadopago");

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
        console.log(req.body);

        const products = req.body;

        if (!Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ error: "No se recibieron productos" });
        }

        for (const product of products) {
            if (!isProductValid(product)) {
                return res.status(400).json({ error: "Formato de producto inválido" });
            }
        }

        const preference2 = new Preference(client);

        const value2 = await preference2.create({
            body: {
                items: products,
                back_urls: {
                    success: "https://www.youtube.com/watch?v=TwC0Db7oerM",
                    failure: "https://www.youtube.com/@onthecode",
                    pending: "https://chatgpt.com",
                },
                auto_return: "approved",
            }
        });

        console.log("Preferencia creada:", value2);
        return res.status(200).json({ id: value2.id });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error al crear la preferencia :(" });
    }
};

module.exports = { createPreference };
