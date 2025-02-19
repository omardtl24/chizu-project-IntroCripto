import React from 'react';
import { Heart, HeartOff, Tag } from 'lucide-react';
import { Campaign } from '../types';

interface CampaignCardProps {
    product: Campaign;
    isFavorite: boolean;
    onToggleFavorite: () => void;
    animationClass: string;
}

export const CampaignCard: React.FC<CampaignCardProps> = ({ product, isFavorite, onToggleFavorite, animationClass }) => {
    const cardStyle = 'bg-gradient-to-br from-[#007373] via-[#007373] to-[#007373] p-6 rounded-lg text-white shadow-[0_0_10px_rgba(0,115,115,0.3)] stars-bg hover:shadow-[0_0_16px_rgba(0,115,115,0.5)] hover:scale-[1.03] transition-shadow transition-transform transition-all duration-300 ease-in-out transform hover:-translate-y-1';

    const imageStyle = 'rounded-lg h-48 w-full object-cover mb-4 opacity-80';
    const titleStyle = 'text-lg font-bold mb-2 text-[#007373]';

    return (
        <div className={`group relative ${cardStyle}`}>
            <div className="aspect-[3/4] overflow-hidden rounded-lg relative">
                <img
                    src={product.banner_filename}
                    alt={product.title}
                    className="w-full h-full object-cover transform transition-transform duration-300"
                />
                <button
                    onClick={onToggleFavorite}
                    className={`absolute top-2 right-2 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-all ${animationClass}`}
                >
                    {isFavorite ? (
                        <Heart className="w-5 h-5 text-red-500 fill-current" />
                    ) : (
                        <HeartOff className="w-5 h-5 text-white" />
                    )}
                </button>
            </div>
            <h3 className={titleStyle}>{product.title}</h3>
            <div className="flex items-center gap-2 mb-2">
                <Tag size={16} className="text-[hsl(180,100%,22.5%)]" />
                <span className="text-sm text-gray-900">{product.category}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-700">Por {product.user}</span>
                <span className={`text-xs px-2 py-1 rounded ${product.status === 'activa' ? 'bg-blue-100 text-blue-800' : product.status === 'suspendida' ? 'bg-red-100 text-red-800': 'bg-green-100 text-green-800'}`}>
                    {product.status}
                </span>
            </div>
        </div>
    );
};
