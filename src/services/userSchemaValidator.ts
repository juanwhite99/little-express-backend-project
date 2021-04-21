const Joi = require('@hapi/joi');

export const userSchemaValidator = Joi.object({
    id: Joi.string().required(),
    login: Joi.required(),
    password: Joi.string().pattern(new RegExp('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$')),
    age: Joi.number().integer().min(4).max(130).required(),
    isDeleted: Joi.required()
});
