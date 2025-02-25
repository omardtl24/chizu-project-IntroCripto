import { useState, useEffect } from 'react';

export const useFavorites = () => {
    const [animatingFavorite, setAnimatingFavorite] = useState<number | null>(null);
    const [animationType, setAnimationType] = useState<'add' | 'remove' | null>(null);

    const startAnimation = (id: number, isAdding: boolean) => {
        setAnimatingFavorite(id);
        setAnimationType(isAdding ? 'add' : 'remove');

        setTimeout(() => {
            setAnimatingFavorite(null);
            setAnimationType(null);
        }, 500);
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
        startAnimation,
        getAnimationClass
    };
};