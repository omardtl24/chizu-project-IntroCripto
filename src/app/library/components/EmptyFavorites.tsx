import React from 'react';
import { Heart } from 'lucide-react';
import { ActiveTab } from '../types';

interface EmptyFavoritesProps {
    setActiveTab: (tab: ActiveTab) => void;
}

export const EmptyFavorites: React.FC<EmptyFavoritesProps> = ({ setActiveTab }) => (
    <div className="flex flex-col items-center justify-center py-20 text-center">
        <Heart className="w-16 h-16 text-gray-400 mb-4" />
        <h3 className="text-xl font-medium text-gray-300 mb-2">¡No tienes favoritos aún!</h3>
        <p className="text-gray-400 max-w-md mb-6">
            Marca tus juegos y campañas favoritos para acceder a ellos rápidamente.
            Haz clic en el corazón de cualquier elemento para agregarlo a tus favoritos.
        </p>
        <button
            onClick={() => setActiveTab('todos')}
            className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
        >
            Explorar contenido
        </button>
    </div>
);