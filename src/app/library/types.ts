// types.ts
export interface Game {
    id: number;
    title: string;
    image: string;
    achievements: string;
    status: string;
    type: 'game';
}
export interface Campaign {
    id: number
    banner_filename: string;
    status: string;
    title: string;
    user: string;
    category: string;
    type: 'campaign';
}

export type ViewMode = 'grid' | 'list';
export type ActiveTab = 'todos' | 'favoritos' | 'campanas';
export type FavoritesFilter = 'all' | 'games' | 'campaigns';
