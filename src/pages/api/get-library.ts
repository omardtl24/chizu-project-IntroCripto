import { NextApiRequest, NextApiResponse } from 'next';
import pgPromise, { IDatabase } from 'pg-promise';
import dotenv from 'dotenv';

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

        // Consulta a orders_rels para obtener el parent_id
        const ordersRels = await db.any(`
            SELECT parent_id 
            FROM orders_rels 
            WHERE path = 'user' AND users_id = $1
        `, [userId]);

        if (ordersRels.length === 0) {
            return res.status(404).json({ error: 'No orders found for this user' });
        }

        const parentIds = ordersRels.map(rel => rel.parent_id);

        // Consulta a orders para verificar _ispaid == true
        const paidOrders = await db.any(`
            SELECT id, total, _ispaid, updated_at, created_at, payment_id, preference_id
            FROM orders
            WHERE _ispaid = true AND id IN ($1:csv)
        `, [parentIds]);

        if (paidOrders.length === 0) {
            return res.status(404).json({ error: 'No paid orders found for this user' });
        }

        // En este punto, puedes realizar cualquier otra lógica adicional o construir la respuesta final
        return res.status(200).json({ paidOrders });

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
