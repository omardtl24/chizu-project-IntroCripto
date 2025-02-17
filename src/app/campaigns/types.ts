export interface Product {
    id: number
    banner_filename: string;
    category: string;
    max_price: number | null;
    min_price: number | null;
    status: string;
    title: string;
    user: string;
}

export type CardStyle = 'cosmic-origami-blue';