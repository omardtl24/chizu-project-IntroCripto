// types.ts
export interface Game {
    id: string;
    title: string;
    image: string;
    achievements: string;
    status: string;
    type: 'game';
}

export interface Campaign {
    id: string;
    title: string;
    image: string;
    description: string;
    endDate: string;
    type: 'campaign';
}

export type ViewMode = 'grid' | 'list';
export type ActiveTab = 'todos' | 'favoritos' | 'campanas';
export type FavoritesFilter = 'all' | 'games' | 'campaigns';
