import { MercadoPagoConfig, Preference } from "mercadopago";

const client = new MercadoPagoConfig({
    accessToken: "APP_USR-3623515732418680-012605-56a47655d860cd180ebccb9bebcdfd16-277425185",
});

export const createPreference = async (req: any, res: any) => {
    try {
        console.log(req.body);
        console.log("==================================== 1"); 
        const requestBody = req.body;
        if (!requestBody.title || !requestBody.quantity || !requestBody.price || !requestBody.id) {
            return res.status(400).json({ error: "Faltan datos" });
        }
        console.log("==================================== 2");
        const body = {
            items: [
                {
                    id: requestBody.id,
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
            payment_methods: {
                excluded_payment_types: [{ id: "ticket" }], // Excluye métodos de pago que no sean tarjeta
                installments: 1, // Opcional: Limita el número de cuotas
            },
        };
        console.log("==================================== 3");
        const preference = new Preference(client);
        const result = await preference.create({ body });
        return res.status(200).json({ id: result.id });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error al crear la preferencia :(" });
    }
}
export {createPreference as POST}
