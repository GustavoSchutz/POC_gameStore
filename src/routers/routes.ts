import express from 'express';
import { mediaRouter } from './media.routes.js';

const router = express.Router();
router.use(mediaRouter);

export default router;