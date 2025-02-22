import { useState, useEffect } from 'react';

interface Favorite {
    id: number;
    type: 'game' | 'campaign';
}

export const useFavorites = (id_user: string) => {
    const [animatingFavorite, setAnimatingFavorite] = useState<number | null>(null);
    const [animationType, setAnimationType] = useState<'add' | 'remove' | null>(null);

    const toggleFavorite = async (id: number, type: 'game' | 'campaign', currentValue: boolean) => {
        // Start animation
        setAnimatingFavorite(id);
        setAnimationType(currentValue ? 'remove' : 'add');

        try {
            const url = new URL("/api/toggle_favorite_game", window.location.origin);
            url.searchParams.append("id_user", id_user);
            url.searchParams.append("id_game", id.toString());

            const response = await fetch(url.toString());
            if (!response.ok) {
                throw new Error("Failed to toggle favorite");
            }

            // Animation cleanup
            setTimeout(() => {
                setAnimatingFavorite(null);
                setAnimationType(null);
            }, 500);

            return true;
        } catch (error) {
            console.error("Error toggling favorite:", error);
            return false;
        }
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
        toggleFavorite,
        getAnimationClass
    };
};