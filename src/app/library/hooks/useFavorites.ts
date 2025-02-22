import { useState, useEffect } from 'react';

interface Favorite {
    id: number;
    type: 'game' | 'campaign';
}

export const useFavorites = () => {
    const [favorites, setFavorites] = useState<Favorite[]>([]);
    const [animatingFavorite, setAnimatingFavorite] = useState<number | null>(null);
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

    const toggleFavorite = (id: number, type: 'game' | 'campaign') => {
        setAnimatingFavorite(id);
        setAnimationType(favorites.some(fav => fav.id === id && fav.type === type) ? 'remove' : 'add');

        setTimeout(() => {
            setAnimatingFavorite(null);
            setAnimationType(null);
        }, 500);

        setFavorites(prev => {
            const isAlreadyFavorite = prev.some(fav => fav.id === id && fav.type === type);
            if (isAlreadyFavorite) {
                return prev.filter(fav => !(fav.id === id && fav.type === type));
            }
            return [...prev, { id, type }];
        });
    };

    const getAnimationClass = (id: number) => {
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
