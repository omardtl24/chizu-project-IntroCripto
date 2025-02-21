import { NextApiRequest, NextApiResponse } from 'next';
import pgPromise, { IDatabase } from 'pg-promise';
import dotenv from 'dotenv';
import { title } from 'process';

dotenv.config();

const pgp = pgPromise();

const requiredEnvVars = ['DB_HOST', 'DB_DATABASE', 'DB_USER', 'DB_PASSWORD'];
for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
        throw new Error(`Missing required environment variable: ${envVar}`);
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
    const userId = req.query.id_user;

    if (!userId) {
        return res.status(401).json({ error: 'User ID is required' });
    }

    try {
        const db = getDatabaseInstance();

        // Consulta optimizada utilizando JOINs para reducir el número de consultas y devolver productos únicos
        const result = await db.any(`
            SELECT DISTINCT 
                p.id AS product_id, p.name,
                u.id AS creator_id, u.username AS creator_username,
                m.filename AS media_filename
            FROM orders_rels or1
            JOIN orders o ON or1.parent_id = o.id
            JOIN orders_rels or2 ON o.id = or2.parent_id
            JOIN products p ON or2.products_id = p.id
            JOIN products_rels pr ON p.id = pr.parent_id
            JOIN users u ON pr.users_id = u.id
            LEFT JOIN products_rels pr_logo ON pr_logo.parent_id = p.id AND pr_logo.path = 'image_logo'
            LEFT JOIN media m ON pr_logo.media_id = m.id
            WHERE or1.path = 'user' AND or1.users_id = $1 AND o._ispaid = true AND or2.path = 'products' AND pr.path = 'user'
        `, [userId]);

        if (result.length === 0) {
            return res.status(404).json({ error: 'No results found for this user' });
        }

        // Mapear los resultados para estructurar la respuesta
        const productsWithCreator = result.map(row => ({
            id: row.product_id,
            title: row.name,
            image: `${process.env.NEXT_PUBLIC_SERVER_URL}/media/${row.media_filename}`,
            creator: row.creator_username,
            status: "game",
        }));

        // Devuelve los productos únicos con los detalles de los creadores y el filename
        return res.status(200).json({ products: productsWithCreator });

    } catch (error: any) {
        console.error('Database error:', error);

        const userMessage = process.env.NODE_ENV === 'production'
            ? 'Error connecting to database'
            : error.message;
        return res.status(500).json({
            error: userMessage,
            details: process.env.NODE_ENV === 'development' ? error : undefined
        });
    }
}
