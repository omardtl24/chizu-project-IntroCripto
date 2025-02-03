import { notFound } from "next/navigation";
import { getPayloadClient } from "@/getPayload";
import { Campaign, Media, Tier, User } from "@/payload-types";
import { Check } from "lucide-react";

interface UrlProps {
  params: {
    campaignId: string;
  };
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "finalizada":
      return "bg-green-100 text-green-800 border-green-200";
    case "suspendida":
      return "bg-red-100 text-red-800 border-red-200";
    case "activa":
      return "bg-blue-100 text-blue-800 border-blue-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

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
  let [campaign] = campaigns;
  const campaignData = campaign as unknown as Campaign;
  if (!campaign) return notFound();

  const { docs: tiers } = await payload.find({
    collection: "tiers",
    where: {
      campaign: { equals: campaignData.id },
    },
  });

  const bannerImage = campaignData.bannerImage as Media;
  const author = campaignData.user as User;

  return (
    <div className="min-h-screen bg-radial-gradient flex items-center justify-center p-6">
      <div className="max-w-6xl w-full backdrop-blur-xl bg-white/10 rounded-3xl p-8 shadow-2xl border border-white/20">
        {/* Container with relative positioning for status tag */}
        <div className="relative">
          {/* Status tag positioned absolutely in the top-right corner */}
          <div className={`absolute -top-2 -right-2 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(campaignData.status)}`}>
            {campaignData.status}
          </div>

          {/* Campaign Info */}
          <div className="flex flex-col lg:flex-row items-center gap-6 mb-12">
            <img
              src={bannerImage?.url || "/default-banner.jpg"}
              alt="Imagen de la campaña"
              className="w-full lg:w-1/2 h-72 object-cover rounded-lg"
            />
            <div className="text-center lg:text-left lg:w-1/2">
              <h1 className="text-5xl font-bold text-gray-900">{campaignData.title}</h1>
              <p className="text-gray-600 mt-2">Creador: {author.username}</p>
            </div>
          </div>

          {/* Description */}
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-black mb-4">Descripción de la campaña</h1>
            <p className="text-gray-800 mx-auto text-justify">{campaignData.description}</p>
          </div>

          {/* Subscription Tiers */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {(tiers as unknown as Tier[]).map((tier: Tier) => (
              <div key={tier.id} className="relative bg-transparent rounded-xl p-[2px] hover:border-indigo-500/50 transition-all duration-300 hover:transform hover:-translate-y-1 subscription-card">
                <div className="bg-white rounded-xl border p-4 h-full flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-black mb-4">{tier.title}</h3>
                    <div className="flex items-baseline mb-6">
                      <span className="text-3xl font-bold text-black">$</span>
                      <span className="text-5xl font-bold text-black">{tier.price}</span>
                      <span className="text-gray-400 ml-2">/mes</span>
                    </div>
                    <ul className="space-y-4 mb-8">
                      {tier.features?.map((featureObj) => (
                        <li key={featureObj.id} className="flex items-center text-gray-800">
                          <Check className="h-5 w-5 text-green-400 mr-2" />
                          {featureObj.feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button className="w-full py-3 rounded-xl bg-[#007373] hover:bg-[#009c9c] text-white transition-all">
                    Seleccionar Plan
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
      );
};

      export default Page;
