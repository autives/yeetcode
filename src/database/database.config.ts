import { configDotenv } from 'dotenv';
import * as Joi from 'joi';

configDotenv();

const envSchema = Joi.object({
  DB_TYPE: Joi.string().valid('mysql', 'postgres', 'sqlite').required(),
  DB_PORT: Joi.number().default(5432),
  DB_HOST: Joi.string().default('localhost'),
  DB_USERNAME: Joi.string().default('root'),
  DB_PASSWORD: Joi.string(),
  DB_DATABASE: Joi.string().default('test'),
});

const envVars = envSchema.validate(process.env, { allowUnknown: true });
if (envVars.error) {
  throw new Error(`Environment variable validation error: ${envVars.error.message}`);
}

export const databaseConfig = {
  type: envVars.value.DB_TYPE as 'mysql' | 'postgres' | 'sqlite',
  host: envVars.value.DB_HOST,
  port: envVars.value.DB_PORT,
  username: envVars.value.DB_USERNAME,
  password: envVars.value.DB_PASSWORD,
  database: envVars.value.DB_DATABASE,
};
