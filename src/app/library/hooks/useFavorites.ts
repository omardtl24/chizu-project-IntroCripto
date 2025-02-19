// hooks/useFavorites.ts
import { useState, useEffect } from 'react';

export const useFavorites = () => {
    const [favorites, setFavorites] = useState<string[]>([]);
    const [animatingFavorite, setAnimatingFavorite] = useState<string | null>(null);
    const [animationType, setAnimationType] = useState<'add' | 'remove' | null>(null);

    useEffect(() => {
        const savedFavorites = localStorage.getItem('gameFavorites');
        if (savedFavorites) {
            setFavorites(JSON.parse(savedFavorites));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('gameFavorites', JSON.stringify(favorites));
    }, [favorites]);

    const toggleFavorite = (id: string) => {
        setAnimatingFavorite(id);
        setAnimationType(favorites.includes(id) ? 'remove' : 'add');

        setTimeout(() => {
            setAnimatingFavorite(null);
            setAnimationType(null);
        }, 500);

        setFavorites(prev => {
            if (prev.includes(id)) {
                return prev.filter(itemId => itemId !== id);
            }
            return [...prev, id];
        });
    };

    const getAnimationClass = (id: string) => {
        if (id === animatingFavorite) {
            return animationType === 'add'
                ? 'animate-bounce-once scale-125'
                : 'animate-shake scale-90';
        }
        return '';
    };

    return {
        favorites,
        toggleFavorite,
        getAnimationClass
    };
};