import React from 'react';
import { Heart, HeartOff } from 'lucide-react';
import { Game } from '../types';

interface GameCardProps {
    game: Game;
    isFavorite: boolean;
    onToggleFavorite: () => void;
    animationClass: string;
}

export const GameCard: React.FC<GameCardProps> = ({ game, isFavorite, onToggleFavorite, animationClass }) => (
    <div className="group relative">
        <div className="aspect-[3/4] overflow-hidden rounded-lg relative">
            <img
                src={game.image}
                alt={game.title}
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
        <div className="mt-4">
            <h3 className="text-lg font-medium">{game.title}</h3>
            <p className="text-gray-400 text-sm mt-1">{game.achievements}</p>
            <button className="mt-2 text-sm text-blue-400 hover:text-blue-300 transition-colors">
                {game.status}
            </button>
        </div>
    </div>
);