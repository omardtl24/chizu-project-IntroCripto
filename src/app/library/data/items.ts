// data/items.ts
import { Game, Campaign } from '../types';

export const games: Game[] = [
    {
        id: 1,
        title: "Marvel's Spider-Man 2",
        image: "https://images.unsplash.com/photo-1608889175123-8ee362201f81?auto=format&fit=crop&q=80&w=400",
        Creator: "Juan P",
        status: "Iniciar",
        type: 'game'
    },
    {
        id: 2,
        title: "Marvel's Spider-Man: Miles Morales",
        image: "https://images.unsplash.com/photo-1608889175250-c3b0c1667d3a?auto=format&fit=crop&q=80&w=400",
        Creator: "NoobMaster69",
        status: "Instalar",
        type: 'game'
    },
    {
        id: 3,
        title: "Hell Let Loose",
        image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&q=80&w=400",
        Creator: "Thor",
        status: "Instalar",
        type: 'game'
    }
];

export const campaigns: Campaign[] = [
    {
        id: 4,
        title: "Campaña de Verano",
        banner_filename: "https://images.unsplash.com/photo-1611996575749-79a3a250f948?auto=format&fit=crop&q=80&w=400",
        status: "activa",
        user: "Juan P",
        category: "Juegos",
        type: 'campaign'
    },
    {
        id: 5,
        title: "Juegos Indie",
        banner_filename: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=400",
        status: "activa",
        user: "Juan 12",
        category: "Individual",
        type: 'campaign'
    }
];