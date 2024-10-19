import * as Joi from 'joi';

export default Joi.object({
  PORT: Joi.number().default(3000),
  JWT_SECRET: Joi.string().required(),
  DB_URL: Joi.string().required(),
});
