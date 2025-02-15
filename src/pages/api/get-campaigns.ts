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
                t.id AS tier_id, 
                t.title AS tier_name, 
                t.price AS tier_price, 
                t.description AS tier_description, 
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
        `);

        const result = campaigns.reduce((acc, campaign) => {
            if (!acc[campaign.campaign_id]) {
                acc[campaign.campaign_id] = {
                    title: campaign.title,
                    status: campaign.status,
                    user: campaign.username,
                    category: campaign.category_name,
                    banner_filename: campaign.banner_filename,
                    tiers: []
                };
            }
            if (campaign.tier_id) {
                acc[campaign.campaign_id].tiers.push({
                    id: campaign.tier_id,
                    name: campaign.tier_name,
                    price: campaign.tier_price,
                    description: campaign.tier_description
                });
            }
            return acc;
        }, {});

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
        // Opcional: cerrar la conexión si no estás usando un pool
        // await db.$pool.end();
    }
}
