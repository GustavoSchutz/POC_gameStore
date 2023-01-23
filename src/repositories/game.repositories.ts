import { db } from "../db/db.js";

async function insertGame({ name, description, release_date }: { name: string, description: string, release_date: string }) {
    return db.query(
        `INSERT INTO games (name, description, release_date)
        VALUES ('Game Name', 'Game Description', '2022-01-01');`,
        [name, description, release_date]
    );
}

async function insertCategory({ name, description }: { name: string, description: string}) {
    return db.query(
        `INSERT INTO categories (name, description) VALUES ( $1, $2);`,
        [name, description]
    );
}

async function relateGametoCategory(gameId: number, categoryId: number) {
    return db.query(
        `INSERT INTO game_categories (game_id, category_id)
        VALUES ($1, $2);`, [gameId, categoryId]
    )
}

async function selectGame(gameId: number) {
    return db.query(
        `SELECT games.*, 
        json_build_object('categories', json_agg(categories.name)) as categories
        FROM games
        JOIN game_categories ON games.id = game_categories.game_id
        JOIN categories ON game_categories.category_id = categories.id
        WHERE games.id = $1
        GROUP BY games.id;`,
        [gameId]
    )
}

export { insertGame, insertCategory, relateGametoCategory, selectGame }