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

        const productsQuery = `
            SELECT DISTINCT ON (p.id) 
                p.id AS product_id, p.name,
                u.id AS creator_id, u.username AS creator_username,
                m.filename AS media_filename,
                o.id AS order_id,
                CASE 
                    WHEN ur.path = 'favorites' AND ur.products_id = p.id THEN true 
                    ELSE false 
                END AS is_favorite
            FROM orders_rels or1
            JOIN orders o ON or1.parent_id = o.id
            JOIN orders_rels or2 ON o.id = or2.parent_id
            JOIN products p ON or2.products_id = p.id
            JOIN products_rels pr ON p.id = pr.parent_id
            JOIN users u ON pr.users_id = u.id
            LEFT JOIN products_rels pr_logo ON pr_logo.parent_id = p.id AND pr_logo.path = 'image_logo'
            LEFT JOIN media m ON pr_logo.media_id = m.id
            LEFT JOIN users_rels ur ON ur.parent_id = $1 AND ur.path = 'favorites' AND ur.products_id = p.id
            WHERE or1.path = 'user' AND or1.users_id = $1 AND o._ispaid = true AND or2.path = 'products' AND pr.path = 'user'
        `;
        
        const tiersQuery = `
            SELECT 
                t.id,
                o.id as order_id,
                t.title,
                c.status AS campaign_status,
                u.username AS campaign_username,
                m.filename AS campaign_bannerImage,
                array_agg(re.filename) as reward_filenames
            FROM orders_rels or1
            JOIN orders o ON or1.parent_id = o.id AND o._isPaid = true
            JOIN orders_rels or2 ON o.id = or2.parent_id
            JOIN tiers t ON or2.tiers_id = t.id
            JOIN tiers_rels tr ON t.id = tr.parent_id
            JOIN campaigns c ON tr.campaigns_id = c.id AND tr.path = 'campaign'
            LEFT JOIN campaigns_rels cr_user ON c.id = cr_user.parent_id AND cr_user.path = 'user'
            LEFT JOIN users u ON cr_user.users_id = u.id
            LEFT JOIN campaigns_rels cr_banner ON c.id = cr_banner.parent_id AND cr_banner.path = 'bannerImage'
            LEFT JOIN media m ON cr_banner.media_id = m.id
            JOIN tiers_rels tr2 ON t.id = tr2.parent_id AND tr2.path LIKE 'rewards.%'
            JOIN rewards re ON re.id = tr2.rewards_id
            WHERE or1.path = 'user' AND or1.users_id = $1 AND or2.path = 'tiers' AND or2.tiers_id IS NOT NULL
            AND tr2.parent_id = t.id
            GROUP BY t.id, o.id, t.title, c.status, u.username, m.filename;
        `;

        const [productsResult, tiersResult] = await Promise.all([
            db.any(productsQuery, [userId]),
            db.any(tiersQuery, [userId])
        ]);

        if (productsResult.length === 0 && tiersResult.length === 0) {
            return res.status(404).json({ error: 'No results found for this user' });
        }

        const productsWithCreator = productsResult.map(row => ({
            id: row.product_id,
            title: row.name,
            image: `${process.env.NEXT_PUBLIC_SERVER_URL}/media/${row.media_filename}`,
            creator: row.creator_username,
            type: "game",
            order_id: row.order_id,
            isFavorite: row.is_favorite
        }));

        const tiersWithRewards = tiersResult.map(row => ({
            id: row.id,
            title: row.title,
            status: row.campaign_status,
            user: row.campaign_username,
            category: "category",
            banner_filename: `${process.env.NEXT_PUBLIC_SERVER_URL}/media/${row.campaign_bannerImage}`,
            rewards: row.reward_filenames,
            type: "campaign"
        }));

        return res.status(200).json({ 
            games: productsWithCreator,
            tiers: tiersWithRewards
        });

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
