var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import * as gameRepo from '../repositories/game.repositories.js';
import { newGameSchema } from '../schemas/schemas.js';
import httpStatus from 'http-status';
function newGame(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var newGameData, name, description, release_date, validation, insertGame, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    newGameData = req.body;
                    name = newGameData.name, description = newGameData.description, release_date = newGameData.release_date;
                    validation = newGameSchema.validate(newGameData);
                    if (validation.error) {
                        return [2 /*return*/, res.status(httpStatus.BAD_REQUEST).send('Os campos não estão preenchidos corretamente!')];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, gameRepo.insertGame({
                            name: name,
                            description: description,
                            release_date: release_date
                        })];
                case 2:
                    insertGame = _a.sent();
                    console.log(insertGame);
                    return [2 /*return*/, res.status(httpStatus.CREATED).send("Novo título adicionado com sucesso!")];
                case 3:
                    error_1 = _a.sent();
                    console.log(error_1);
                    if (error_1.code === '23505') {
                        return [2 /*return*/, res.status(httpStatus.CONFLICT).send('Esse título já foi adicionado!')];
                    }
                    return [2 /*return*/, res.status(httpStatus.IM_A_TEAPOT).send('Tem que vê isso aí')];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function newCategory(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var newCategoryData, name, description, insertCategory, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    newCategoryData = req.body;
                    name = newCategoryData.name, description = newCategoryData.description;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, gameRepo.insertCategory({
                            name: name,
                            description: description
                        })];
                case 2:
                    insertCategory = _a.sent();
                    return [2 /*return*/, res.status(httpStatus.CREATED).send("Novo título adicionado com sucesso!")];
                case 3:
                    error_2 = _a.sent();
                    console.log(error_2);
                    if (error_2.code === '23505') {
                        return [2 /*return*/, res.status(httpStatus.CONFLICT).send('Não era pra dar esse erro n')];
                    }
                    return [2 /*return*/, res.status(httpStatus.IM_A_TEAPOT).send('Tem que vê isso aí')];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function addCategoryToGame(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var newGameToCategoryRealtion, gameId, categoryId, relateGametoCategory, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    newGameToCategoryRealtion = req.body;
                    gameId = newGameToCategoryRealtion.gameId, categoryId = newGameToCategoryRealtion.categoryId;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, gameRepo.relateGametoCategory(gameId, categoryId)];
                case 2:
                    relateGametoCategory = _a.sent();
                    return [2 /*return*/, res.status(httpStatus.CREATED).send("Nova relação adicionada com sucesso!")];
                case 3:
                    error_3 = _a.sent();
                    console.log(error_3);
                    if (error_3.code === '23505') {
                        return [2 /*return*/, res.status(httpStatus.CONFLICT).send('Não era pra dar esse erro n')];
                    }
                    return [2 /*return*/, res.status(httpStatus.IM_A_TEAPOT).send('Tem que vê isso aí')];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function getGameById(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var gameId, getGameById_1, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    gameId = req.body.gameId;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, gameRepo.selectGame(gameId)];
                case 2:
                    getGameById_1 = _a.sent();
                    console.log(getGameById_1.rows);
                    return [2 /*return*/, res.status(httpStatus.OK).send(getGameById_1.rows)];
                case 3:
                    error_4 = _a.sent();
                    console.log(error_4);
                    return [2 /*return*/, res.status(httpStatus.INTERNAL_SERVER_ERROR).send('Erro interno')];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function deleteGameById(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var gameId, deleteGameById_1, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    gameId = req.body.gameId;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, gameRepo.deleteGame(gameId)];
                case 2:
                    deleteGameById_1 = _a.sent();
                    return [2 /*return*/, res.status(httpStatus.OK)];
                case 3:
                    error_5 = _a.sent();
                    console.log(error_5);
                    return [2 /*return*/, res.status(httpStatus.INTERNAL_SERVER_ERROR).send('Erro interno')];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function deleteCategoryById(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var categoryId, deleteCategoryById_1, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    categoryId = req.body.categoryId;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, gameRepo.deleteCategory(categoryId)];
                case 2:
                    deleteCategoryById_1 = _a.sent();
                    return [2 /*return*/, res.status(httpStatus.OK)];
                case 3:
                    error_6 = _a.sent();
                    console.log(error_6);
                    return [2 /*return*/, res.status(httpStatus.INTERNAL_SERVER_ERROR).send('Erro interno')];
                case 4: return [2 /*return*/];
            }
        });
    });
}
export { newGame, newCategory, addCategoryToGame, getGameById, deleteGameById, deleteCategoryById };
