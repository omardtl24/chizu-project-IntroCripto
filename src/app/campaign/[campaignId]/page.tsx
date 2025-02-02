
import { notFound } from "next/navigation";
import { getPayloadClient } from "@/getPayload";
import { Campaign, Tier } from "@/payload-types";

interface UrlProps {
  params: {
    campaignId: string;
  };
}

const Page = async ({ params }: UrlProps) => {
  const payload = await getPayloadClient();

  // Obtener la campaña
  const { docs: [campaign] } = await payload.find({
    collection: 'campaigns',
    where: {
      id: { equals: params.campaignId },
    },
    limit: 1,
  });

  if (!campaign) return notFound();

  // Obtener los tiers relacionados
  const { docs: tiers } = await payload.find({
    collection: 'tiers',
    where: {
      campaign: { equals: campaign.id },
    },
  });

  return (
    <div className="min-h-screen">
      <div className="px-6 py-4">
        <h1 className="text-4xl font-bold">{campaign.title}</h1>
        <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full">{campaign.status}</span>
        <p className="mt-4">{campaign.description}</p>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold">Tiers de suscripción</h2>
        {tiers.length ? (
          <ul className="mt-4">
            {tiers.map((tier: Tier) => (
              <li key={tier.id} className="border p-4 rounded-lg mb-2">
                <h3 className="font-semibold text-lg">{tier.title}</h3>
                <p>{tier.description}</p>
                <span className="font-bold">${tier.price}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay tiers asociados a esta campaña.</p>
        )}
      </div>
    </div>
  );
};

export default Page;
