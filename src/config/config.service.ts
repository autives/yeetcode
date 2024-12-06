import { configDotenv } from 'dotenv';
import * as Joi from 'joi';
import { DatabaseConfig } from './config.database';
import { Auth0Config } from './config.auth0';
import { JwtConfig } from './config.jwt';

configDotenv();

const envSchema = Joi.object({
    DB_TYPE: Joi.string().valid('mysql', 'postgres', 'sqlite').required(),
    DB_PORT: Joi.number().default(5432),
    DB_HOST: Joi.string().default('localhost'),
    DB_USERNAME: Joi.string().default('root'),
    DB_PASSWORD: Joi.string(),
    DB_DATABASE: Joi.string().default('test'),
    
    AUTH0_ISSUER_URL: Joi.string(),
    AUTH0_AUDIENCE: Joi.string(),

    JWT_SECRET: Joi.string(),
});

export class ConfigService {
    private _databaseConfig : DatabaseConfig;
    private _auth0Config: Auth0Config;
    private _jwtConfig: JwtConfig;
    
    constructor() {
	const envVars = envSchema.validate(process.env, { allowUnknown: true });
	if (envVars.error) {
	    throw new Error(`Environment variable validation error: ${envVars.error.message}`);
	}

	this._databaseConfig = new DatabaseConfig();
	this._databaseConfig.type = envVars.value.DB_TYPE as 'mysql' | 'postgres' | 'sqlite';
	this._databaseConfig.host = envVars.value.DB_HOST;
	this._databaseConfig.port = envVars.value.DB_PORT;
	this._databaseConfig.username = envVars.value.DB_USERNAME;
	this._databaseConfig.password = envVars.value.DB_PASSWORD;
	this._databaseConfig.database = envVars.value.DB_DATABASE;

	this._auth0Config = new Auth0Config();
	this._auth0Config.issuer_url = envVars.value.AUTH0_ISSUER_URL;
	this._auth0Config.audience = envVars.value.AUTH0_AUDIENCE;

	this._jwtConfig = new JwtConfig();
	this._jwtConfig.jwtSecret = envVars.value.JWT_SECRET;
    }

    get databaseConfig(): DatabaseConfig {
	return this._databaseConfig;
    }

    get auth0Config(): Auth0Config {
	return this._auth0Config;
    }

    get jwtConfig(): JwtConfig {
	return this._jwtConfig;
    }     
}
