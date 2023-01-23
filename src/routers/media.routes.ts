import express from 'express';
import { addCategoryToGame, getGameById, newCategory, newGame } from '../controllers/game.controller.js';

const mediaRouter = express.Router();
mediaRouter.post('/game', newGame);
mediaRouter.post('/category', newCategory);
mediaRouter.post('/game/category', addCategoryToGame)
mediaRouter.get('/media', getGameById);

export { mediaRouter };