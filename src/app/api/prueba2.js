import { MercadoPagoConfig, Preference } from "mercadopago";

const client = new MercadoPagoConfig({
    accessToken: "TEST-3524539752788201-012515-593b32ee2e6253a6732d1eb2fb893aa2-1107696534",
    options: { timeout: 5000, idempotencyKey: 'abc' }
});

export const createPreference = async (req, res) => {
    try {
        console.log(req.body);
        console.log("==================================== 1");
        const requestBody = req.body;
        if (!requestBody.title || !requestBody.quantity || !requestBody.price) {
            return res.status(400).json({ error: "Faltan datos" });
        }
        console.log("==================================== 2");
        const body = {
            items: [
                {
                    title: requestBody.title,
                    quantity: Number(requestBody.quantity),
                    unit_price: Number(requestBody.price),
                    currency_id: "COP",
                },
            ],
            back_urls: {
                success: "https://www.youtube.com/@onthecode",
                failure: "https://www.youtube.com/@onthecode",
                pending: "https://www.youtube.com/@onthecode",
            },
            auto_return: "approved",
        };

        const preference2 = new Preference(client);

        const value2 = await preference2.create({
            body: {
                items: [
                    {
                        title: 'My product',
                        quantity: 1,
                        unit_price: 20000
                    }
                ],
                back_urls: {
                    success: "https://www.youtube.com/watch?v=TwC0Db7oerM",
                    failure: "https://www.youtube.com/@onthecode",
                    pending: "https://chatgpt.com",
                },
                auto_return: "approved",
            }
        });
        console.log("==================================== 3");
        const preference = new Preference(client);
        const result = await preference.create({body });
        console.log("valor de result: ", result.id,  "\n valor de preference2: ", value2.id);
        return res.status(200).json({ id: value2.id });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error al crear la preferencia :(" });
    }
}
export { createPreference as POST }

