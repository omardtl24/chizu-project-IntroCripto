import Link from "next/link";
import { notFound } from "next/navigation";
import { getPayloadClient } from "@/getPayload";
import { Campaign, Media, Tier, User } from "@/payload-types";

const Page = async ({ params }: { params: { campaignId: string } }) => {
  const { campaignId } = params;
  const payload = await getPayloadClient();

  // Consultar la campaña con las relaciones necesarias
  const { docs: campaigns } = await payload.find({
    collection: 'campaigns',
    limit: 1,
    where: { id: { equals: campaignId } },
    depth: 2,  // Expandir relaciones
  });

  const [campaign] = campaigns as unknown as Campaign[];
  if (!campaign) {
    return notFound();
  }

  const bannerImage = campaign.bannerImage as Media;
  const tiers = await payload.find({
    collection: 'tiers',
    where: { 'campaign.id': { equals: campaignId } },
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner de la campaña */}
      <div className="relative mb-8">
        <img
          src={bannerImage?.url || '/default-banner.jpg'}
          alt="Banner"
          className="h-48 w-full rounded-3xl object-cover"
        />
      </div>

      {/* Información de la campaña */}
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold">{campaign.title}</h1>
        <p className="mt-4 text-gray-600">{campaign.description}</p>
        <span className="bg-blue-100 text-blue-800 py-2 px-4 rounded-full mt-2">
          {campaign.status}
        </span>
      </div>

      {/* Tiers de suscripción */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold">Tiers de suscripción</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          {tiers.docs.length > 0 ? (
            tiers.docs.map((tier: Tier) => (
              <div key={tier.id} className="p-4 bg-white rounded-lg shadow-md">
                <h3 className="font-bold">{tier.title}</h3>
                <p className="text-gray-500">{tier.description}</p>
                <p className="text-xl font-semibold mt-2">${tier.price}</p>
              </div>
            ))
          ) : (
            <p>No hay tiers asociados a esta campaña.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
