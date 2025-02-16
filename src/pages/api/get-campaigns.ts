import { NextApiRequest, NextApiResponse } from 'next';
import pgPromise from 'pg-promise';
import dotenv from 'dotenv';

dotenv.config();

const pgp = pgPromise();

// Validación de variables de entorno
const requiredEnvVars = ['DB_HOST', 'DB_DATABASE', 'DB_USER', 'DB_PASSWORD'];
for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
        throw new Error(`Missing required environment variable: ${envVar}`);
    }
}

const db = pgp({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432', 10),
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    ssl: { rejectUnauthorized: false },
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const campaigns = await db.any(`
            SELECT 
                c.id AS campaign_id, 
                c.title, 
                c.status, 
                u.username, 
                MIN(t.price) AS min_price, 
                MAX(t.price) AS max_price, 
                cc.name AS category_name,
                m.filename AS banner_filename
            FROM campaigns c
            LEFT JOIN campaigns_rels cr_user ON c.id = cr_user.parent_id AND cr_user.path = 'user'
            LEFT JOIN users u ON cr_user.users_id = u.id
            LEFT JOIN campaigns_rels cr_tiers ON c.id = cr_tiers.parent_id AND cr_tiers.path = 'tiers'
            LEFT JOIN tiers t ON cr_tiers.tiers_id = t.id
            LEFT JOIN campaigns_rels cr_category ON c.id = cr_category.parent_id AND cr_category.path = 'category'
            LEFT JOIN categorycampaign cc ON cr_category.categorycampaign_id = cc.id
            LEFT JOIN campaigns_rels cr_banner ON c.id = cr_banner.parent_id AND cr_banner.path = 'bannerImage'
            LEFT JOIN media m ON cr_banner.media_id = m.id
            GROUP BY c.id, c.title, c.status, u.username, cc.name, m.filename
        `);

        const result = campaigns.map(campaign => ({
            id: campaign.campaign_id,
            title: campaign.title,
            status: campaign.status,
            user: campaign.username,
            category: campaign.category_name,
            banner_filename: `${process.env.NEXT_PUBLIC_SERVER_URL}/media/${campaign.banner_filename}`,
            min_price: campaign.min_price,
            max_price: campaign.max_price
        }));

        return res.status(200).json({ campaigns: result });
    } catch (error: any) {
        console.error('Database error:', error);

        const userMessage = process.env.NODE_ENV === 'production'
            ? 'Error connecting to database'
            : error.message;

        return res.status(500).json({
            error: userMessage,
            details: process.env.NODE_ENV === 'development' ? error : undefined
        });
    } finally {
        // Opcional: cerrar la conexión a la base de datos
        // await db.$pool.end();
    }
}
