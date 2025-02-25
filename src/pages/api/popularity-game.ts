import { NextApiRequest, NextApiResponse } from 'next';
import pgPromise, { IDatabase } from 'pg-promise';
import dotenv from 'dotenv';

dotenv.config();

const pgp = pgPromise();

const requiredEnvVars = ['DB_HOST', 'DB_DATABASE', 'DB_USER', 'DB_PASSWORD'];
for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
        throw new Error('Missing required environment variable: ${envVar}');
    }
}

let dbInstance: IDatabase<any> | null = null;

function getDatabaseInstance(): IDatabase<any> {
    if (!dbInstance) {
        dbInstance = pgp({
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT || '5432', 10),
            database: process.env.DB_DATABASE,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            ssl: { rejectUnauthorized: false },
        });
    }
    return dbInstance!;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const gameId = req.query.id_game;

    if ( !gameId) {
        return res.status(400).json({ error: 'User ID and Game ID are required' });
    }

    try {
        const db = getDatabaseInstance();

        // Consulta para obtener el top de productos
        const topProducts = await db.any(`
            SELECT p.id, p.name, COUNT(o.products_id) AS cantidad
            FROM public.orders_rels o
            JOIN products p ON o.products_id = p.id
            GROUP BY p.name, p.id
            ORDER BY cantidad DESC
        `);

        // Encontrar el índice del producto en la lista top
        const productIndex = topProducts.findIndex((product: { id: string; }) => product.id.toString() == gameId);

        if (productIndex === -1) {
            return res.status(404).json({ error: 'Product not found in top list' });
        }

        // Devolver el índice + 1 para tener un número 1-based (top 1, 2, 3, etc.)
        return res.status(200).json({ 
            success: true,
            productPosition: productIndex + 1,
            message: 'Product is ranked at position ${productIndex + 1}'
        });

    } catch (error: any) {
        console.error('Database error:', error);

        const userMessage = process.env.NODE_ENV === 'production'
            ? 'Error retrieving product position'
            : error.message;

        return res.status(500).json({
            error: userMessage,
            details: process.env.NODE_ENV === 'development' ? error : undefined
        });
    }
}