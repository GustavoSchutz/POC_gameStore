import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();
var Pool = pg.Pool;
var connection = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
};
var db = new Pool(connection);
export { db };
