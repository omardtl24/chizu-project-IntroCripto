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
    id: number;
    order_id: number;
    title: string;
    status: string;
    user: string;
    category: string;
    banner_filename: string;
    isFavorite: boolean;
    rewards: string[];
    reward_labels: string[];
    type: 'campaign';
}
export interface FileItem {
    id?: string;
    name: string;
    url: string;
}
export type ViewMode = 'grid' | 'list';
export type ActiveTab = 'todos' | 'favoritos' | 'campanas';
export type FavoritesFilter = 'all' | 'games' | 'campaigns';
