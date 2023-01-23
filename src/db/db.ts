import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();
type connectionType = {
    connectionString: string;
    ssl: {
        rejectUnauthorized: boolean;
    }
}

const { Pool } = pg;
const connection: connectionType = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
}

const db = new Pool(connection);
export { db }