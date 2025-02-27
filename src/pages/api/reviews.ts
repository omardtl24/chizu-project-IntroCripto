import { NextApiRequest, NextApiResponse } from "next";
import { getPayloadClient } from "@/getPayload"; // Asegúrate de que esta importación es correcta

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const payload = await getPayloadClient();

    if (req.method === "POST") {
        try {
            const { review, recommend, user, product } = req.body;

            if (!review || !user || !product) {
                return res.status(400).json({ message: "Todos los campos son obligatorios." });
            }

            const newReview = await payload.create({
                collection: "reviews",
                data: { review, recommend, user, product },
            });

            return res.status(201).json(newReview);
        } catch (error) {
            return res.status(500).json({ message: "Error interno del servidor" });
        }
    } else {
        return res.status(405).json({ message: "Método no permitido" });
    }
}
