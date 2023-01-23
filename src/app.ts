import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Request, Response } from 'express';
import { db } from './db/db.js';
import router from './routers/routes.js';

const server = express();
server.use(cors()).use(express.json())
server.use(router)

server.get('/status', async (req: Request, res: Response) => {
    const result = await db.query('SELECT 1=1');
    console.log(result);
    res.sendStatus(200);
});


server.listen(process.env.PORT, () => {
    console.log(`Magic happens on ${process.env.PORT}`);
});