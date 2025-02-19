import React from 'react';
import { Heart, HeartOff } from 'lucide-react';
import { Campaign } from '../types';

interface CampaignCardProps {
    campaign: Campaign;
    isFavorite: boolean;
    onToggleFavorite: () => void;
    animationClass: string;
}

export const CampaignCard: React.FC<CampaignCardProps> = ({ campaign, isFavorite, onToggleFavorite, animationClass }) => (
    <div className="group relative bg-white/5 rounded-lg overflow-hidden">
        <div className="aspect-[16/9] overflow-hidden">
            <img
                src={campaign.image}
                alt={campaign.title}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
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
        <div className="p-4">
            <h3 className="text-xl font-medium">{campaign.title}</h3>
            <p className="text-gray-400 text-sm mt-2">{campaign.description}</p>
            <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-gray-400">Hasta: {campaign.endDate}</span>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Ver más
                </button>
            </div>
        </div>
    </div>
);