import { notFound } from "next/navigation";
import { getPayloadClient } from "@/getPayload";
import { Campaign, Tier, User } from "@/payload-types";

interface UrlProps {
  params: {
    campaignId: string;
  };
}

const Page = async ({ params }: UrlProps) => {
  const { campaignId } = params;

  // Depurar el ID de la campaña
  if (!campaignId) {
    console.error("No se recibió un ID de campaña.");
    return notFound();
  }

  // Inicializar Payload
  const payload = await getPayloadClient();

  // Intentar obtener la campaña
  try {
    console.log("Buscando campaña con ID:", campaignId);

    const { docs: campaigns } = await payload.find({
      collection: "campaigns",
      limit: 1,
      where: {
        id: { equals: campaignId },
      },
    });

    // Verificar resultados
    if (campaigns.length === 0) {
      console.warn("No se encontró ninguna campaña con ese ID.");
      return notFound();
    }

    // Obtener la campaña y logear la información completa
    const campaign = campaigns[0] as Campaign;
    console.log("Datos de la campaña encontrada:", campaign);

    // Obtener usuario relacionado (creador)
    const user = campaign.user as User;
    console.log("Usuario creador:", user);

    // Obtener tiers relacionados
    const tiers = campaign.tiers as Tier[] || [];
    console.log("Tiers asociados a la campaña:", tiers);

    return (
      <div className="p-6">
        <h1 className="text-4xl font-bold">{campaign.title}</h1>
        <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full">{campaign.status}</span>
        <p className="mt-4">{campaign.description}</p>

        <div className="mt-8">
          <h2 className="text-2xl font-bold">Tiers de suscripción</h2>
          {tiers.length > 0 ? (
            <ul className="space-y-4">
              {tiers.map((tier) => (
                <li key={tier.id} className="border p-4 rounded-lg">
                  <h3 className="font-bold">{tier.title}</h3>
                  <p>Precio: ${tier.price}</p>
                  <ul className="list-disc pl-6 mt-2">
                    {tier.features?.map((feature, index) => (
                      <li key={index}>{feature.feature}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay tiers asociados a esta campaña.</p>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error al obtener los datos de la campaña:", error);
    return notFound();
  }
};

export default Page;
