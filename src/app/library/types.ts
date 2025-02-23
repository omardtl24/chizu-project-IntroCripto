// types.ts
export interface Game {
    id: number;
    title: string;
    image: string;
    creator: string;
    order_id: number;
    isFavorite: boolean;
    type: 'game';
}
export interface Campaign {
    id: number
    banner_filename: string;
    status: string;
    title: string;
    user: string;
    category: string;
    isFavorite: boolean;
    type: 'campaign';
}

export type ViewMode = 'grid' | 'list';
export type ActiveTab = 'todos' | 'favoritos' | 'campanas';
export type FavoritesFilter = 'all' | 'games' | 'campaigns';
