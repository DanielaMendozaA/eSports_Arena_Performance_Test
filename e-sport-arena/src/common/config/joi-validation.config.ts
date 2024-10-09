import * as Joi from 'joi'

export const JoiValidation = Joi.object({
    PORT: Joi.number().required(),
    DB_PORT: Joi.number().required(),
    DB_HOST: Joi.string().required(),
    DB_USERNAME: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
    DB_NAME: Joi.string().required(),
    EXECUTE_SEEDS: Joi.boolean().required(),
    JWT_SECRET: Joi.string().required(),
    API_KEY: Joi.string().required()
});