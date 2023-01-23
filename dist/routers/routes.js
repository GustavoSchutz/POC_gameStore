import express from 'express';
import { mediaRouter } from './media.routes.js';
var router = express.Router();
router.use(mediaRouter);
export default router;
