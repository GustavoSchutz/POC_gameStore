import * as gameRepo from '../repositories/game.repositories.js';
import { newGameSchema } from '../schemas/schemas.js';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { ValidationResult } from 'joi';
import { type } from 'os';


async function newGame(req: Request, res: Response) {

    type NewGameData = { name: string; description: string; release_date: string };

    const newGameData: NewGameData = req.body;

    const { name, description, release_date } = newGameData;

    const validation: ValidationResult = newGameSchema.validate(newGameData);
    if (validation.error) {
        return res.status(httpStatus.BAD_REQUEST).send('Os campos não estão preenchidos corretamente!');
    }

    try {
        const insertGame = await gameRepo.insertGame({
            name,
            description,
            release_date
        });

        console.log(insertGame);
        return res.status(httpStatus.CREATED).send("Novo título adicionado com sucesso!");

    } catch (error) {
        console.log(error);

        if (error.code === '23505') {
            return res.status(httpStatus.CONFLICT).send('Esse título já foi adicionado!');
        }

        return res.status(httpStatus.IM_A_TEAPOT).send('Tem que vê isso aí');
    }

}

async function newCategory(req: Request, res: Response) {


    type NewCategoryData = { name: string; description: string }

    const newCategoryData: NewCategoryData = req.body;

    const { name, description } = newCategoryData;

    try {


        const insertCategory = await gameRepo.insertCategory({
            name,
            description
        });

        return res.status(httpStatus.CREATED).send("Novo título adicionado com sucesso!");


    } catch (error) {
        console.log(error);

        if (error.code === '23505') {
            return res.status(httpStatus.CONFLICT).send('Não era pra dar esse erro n');
        }

        return res.status(httpStatus.IM_A_TEAPOT).send('Tem que vê isso aí');
    }
}

async function addCategoryToGame(req: Request, res: Response) {
    type NewGameToCategoryRealtion = { gameId: number, categoryId: number }

    const newGameToCategoryRealtion: NewGameToCategoryRealtion = req.body;

    const { gameId, categoryId } = newGameToCategoryRealtion;

    try {

        const relateGametoCategory = await gameRepo.relateGametoCategory(gameId, categoryId);

        return res.status(httpStatus.CREATED).send("Nova relação adicionada com sucesso!");


    } catch (error) {
        console.log(error);

        if (error.code === '23505') {
            return res.status(httpStatus.CONFLICT).send('Não era pra dar esse erro n');
        }

        return res.status(httpStatus.IM_A_TEAPOT).send('Tem que vê isso aí');
    }
}

async function getGameById(req: Request, res: Response) {

    const gameId: number = req.body.gameId;

    try {

        const getGameById = await gameRepo.selectGame(gameId);
        return res.status(httpStatus.OK).send(getGameById.rows);

    } catch (error) {
        console.log(error);

        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send('Erro interno');
    }

}

async function deleteGameById(req: Request, res: Response) {

    const gameId: number = req.body.gameId;

    try {

        const deleteGameById = await gameRepo.deleteGame(gameId);
        return res.status(httpStatus.OK);

    } catch (error) {
        console.log(error);

        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send('Erro interno');
    }

}

async function deleteCategoryById(req: Request, res: Response) {

    const categoryId: number = req.body.categoryId;

    try {

        const deleteCategoryById = await gameRepo.deleteCategory(categoryId);
        return res.status(httpStatus.OK);

    } catch (error) {
        console.log(error);

        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send('Erro interno');
    }

}

export { newGame, newCategory,addCategoryToGame, getGameById, deleteGameById, deleteCategoryById }