import joi from 'joi';
var newGameSchema = joi.object({
    name: joi.string().min(3).max(255).required(),
    description: joi.string().min(3).max(255).required(),
    release_date: joi.date().required()
});
export { newGameSchema };
