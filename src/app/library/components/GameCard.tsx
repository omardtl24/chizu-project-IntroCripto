import React from 'react';
import { Heart, HeartOff } from 'lucide-react';
import { Game } from '../types';
import { useRouter } from 'next/navigation'

interface GameCardProps {
    game: Game;
    isFavorite: boolean;
    onToggleFavorite: () => void;
    animationClass: string;
}

export const GameCard: React.FC<GameCardProps> = ({ game, isFavorite, onToggleFavorite, animationClass }) => {
    const router = useRouter();

    const handleDownloadClick = () => {
        router.push(`/thank-you?orderId=${game.order_id}`);
    };

    return (
        <div className="group relative p-4 bg-gradient-to-br rounded-lg shadow-xl transition-transform transition-all duration-300 ease-in-out transform hover:-translate-y-5">
            <div className="w-full h-64  overflow-hidden rounded-lg relative">
                <img
                    src={game.image}
                    alt={game.title}
                    className="w-full h-full object-contain transform transition-transform duration-300"
                />
                <button
                    onClick={onToggleFavorite}
                    className={`absolute top-2 right-2 p-2 rounded-full bg-gray-300 hover:bg-gray-400 transition-all ${animationClass}`}
                >
                    {isFavorite ? (
                        <Heart className="w-5 h-5 text-red-500 fill-current" />
                    ) : (
                        <HeartOff className="w-5 h-5 text-black" />
                    )}
                </button>
            </div>
            <div className="mt-4">
                <h3 className="text-lg font-medium">{game.title}</h3>
                <p className="text-gray-800 text-sm mt-1">Por {game.creator}</p>
                <button onClick={handleDownloadClick} className="mt-2 text-sm text-blue-600 hover:text-blue-500 transition-colors">
                    Descargar
                </button>
            </div>
        </div>
    );
};
