import express from 'express';
import { addCategoryToGame, deleteCategoryById, deleteGameById, getGameById, newCategory, newGame } from '../controllers/game.controller.js';

const mediaRouter = express.Router();
mediaRouter.post('/game', newGame);
mediaRouter.post('/category', newCategory);
mediaRouter.post('/game/category', addCategoryToGame)
mediaRouter.get('/game', getGameById);
mediaRouter.delete('/game', deleteGameById);
mediaRouter.delete('/category', deleteCategoryById);

export { mediaRouter };