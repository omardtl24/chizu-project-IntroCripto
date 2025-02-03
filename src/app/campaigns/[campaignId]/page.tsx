import { notFound } from "next/navigation";
import { getPayloadClient } from "@/getPayload";
import { Media, Tier, User } from "@/payload-types";
import { Check } from "lucide-react";

interface UrlProps {
  params: {
    campaignId: string;
  };
}

const Page = async ({ params }: UrlProps) => {
  const { campaignId } = params;
  const payload = await getPayloadClient();

  const { docs: campaigns } = await payload.find({
    collection: "campaigns",
    limit: 1,
    where: {
      id: { equals: campaignId },
    },
  });

  const [campaign] = campaigns;
  if (!campaign) return notFound();

  const tiers = await payload.find({
    collection: "tiers",
    where: {
      campaign: { equals: campaign.id },
    },
  });

  const bannerImage = campaign.bannerImage as Media;
  const author = campaign.user as User;

  return (
    <div className="bg-gray-100 min-h-screen py-12 px-6 flex flex-col items-center">
      <div className="max-w-6xl w-full">
        <div className="flex flex-col lg:flex-row items-center gap-6">
          <img
            src={bannerImage?.url || "/default-banner.jpg"}
            alt="Imagen de la campaña"
            className="w-full lg:w-1/2 h-72 object-cover rounded-lg"
          />
          <div className="text-center lg:text-left lg:w-1/2">
            <h1 className="text-5xl font-bold text-gray-900">{campaign.title}</h1>
            <p className="text-gray-600 mt-2">Creador: {author.username}</p>
          </div>
        </div>
        <p className="text-justify mt-8 text-lg text-gray-700">
          {campaign.description}
        </p>
        <div className="mt-12">
  <h2 className="text-3xl font-bold mb-6 text-center">Tiers de suscripción</h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    {tiers.docs.map((tier: Tier) => (
      <div key={tier.id} className="p-6 bg-white rounded-lg border flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-semibold">{tier.title}</h3>
          <p className="mt-2 text-gray-600">{tier.description}</p>
          <div className="mt-4 flex items-baseline text-2xl font-bold">
            <span className="text-lg">$</span> {/* Signo de dólar más pequeño */}
            <span className="text-3xl">{tier.price.toLocaleString()}</span> {/* Precio más grande */}
            <span className="text-sm text-gray-400 ml-1">/mes</span> {/* Texto "/mes" pequeño */}
          </div>
          {tier.features && tier.features.length > 0 && (
            <ul className="mt-4 space-y-2">
              {tier.features.map((featureObj: { id: number; feature: string }) => (
                <li key={featureObj.id} className="flex items-center text-gray-700">
                  <Check className="w-4 h-4 mr-2 text-green-500" />
                  {featureObj.feature}
                </li>
              ))}
            </ul>
          )}
        </div>
        <button className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Seleccionar Plan
        </button>
      </div>
    ))}
  </div>
</div>
      </div>
    </div>
  );
};

export default Page;
