import { getPayloadClient } from "@/getPayload";
import { cookies } from "next/headers";

export async function getUser() {
  try {
    const payload = await getPayloadClient();
    const token = cookies().get("payload-token")?.value;

    if (!token) return null; // No hay usuario autenticado

    // 🔹 Buscar usuario con el token de autenticación
    const { docs } = await payload.find({
      collection: "users", // Reemplaza con el nombre real de la colección de usuarios
      limit: 1,
      where: {
        _verified: { equals: true }, // Asegurar que es un usuario verificado
      },
    });

    return docs.length > 0 ? docs[0] : null;
  } catch (error) {
    console.error("Error al obtener el usuario:", error);
    return null;
  }
}
