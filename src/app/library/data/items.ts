// data/items.ts
import { Game, Campaign } from '../types';

export const games: Game[] = [
    {
        id: 1,
        title: "Marvel's Spider-Man 2",
        image: "https://images.unsplash.com/photo-1608889175123-8ee362201f81?auto=format&fit=crop&q=80&w=400",
        creator: "Juan P",
        isFavorite: true,
        type: 'game',
        order_id: 51
    },
    {
        id: 2,
        title: "Marvel's Spider-Man: Miles Morales",
        image: "https://images.unsplash.com/photo-1608889175250-c3b0c1667d3a?auto=format&fit=crop&q=80&w=400",
        creator: "NoobMaster69",
        isFavorite: true,
        type: 'game',
        order_id: 51
    },
    {
        id: 3,
        title: "Hell Let Loose",
        image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&q=80&w=400",
        creator: "Thor",
        isFavorite: true,
        type: 'game',
        order_id: 51
    }
];

export const campaigns: Campaign[] = [

];