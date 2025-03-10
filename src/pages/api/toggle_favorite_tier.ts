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
    const tier_id = req.query.tier_id;

    if (!userId || !tier_id) {
        return res.status(400).json({ error: 'User ID and Tier ID are required' });
    }

    try {
        const db = getDatabaseInstance();

        // Primero verificamos si ya existe el favorito
        const existingFavorite = await db.oneOrNone(`
            SELECT id 
            FROM users_rels 
            WHERE parent_id = $1 
            AND tiers_id = $2 
            AND path = 'favorite_tier'
        `, [userId, tier_id]);

        let isFavorite: boolean;

        if (existingFavorite) {
            // Si existe, lo eliminamos
            await db.none(`
                DELETE FROM users_rels 
                WHERE parent_id = $1 
                AND tiers_id = $2 
                AND path = 'favorite_tier'
            `, [userId, tier_id]);
            isFavorite = false;
        } else {
            // Si no existe, lo creamos
            await db.none(`
                INSERT INTO users_rels (parent_id, tiers_id, path)
                VALUES ($1, $2, 'favorite_tier')
            `, [userId, tier_id]);
            isFavorite = true;
        }
        // Devolvemos el nuevo estado
        return res.status(200).json({ 
            success: true, 
            isFavorite: isFavorite,
            message: isFavorite ? 'Tier added to favorites' : 'Tier removed from favorites'
        });

    } catch (error: any) {
        console.error('Database error:', error);

        const userMessage = process.env.NODE_ENV === 'production'
            ? 'Error updating favorites'
            : error.message;
            
        return res.status(500).json({
            error: userMessage,
            details: process.env.NODE_ENV === 'development' ? error : undefined
        });
    }
}