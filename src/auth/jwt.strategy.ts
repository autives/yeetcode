import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { configDotenv } from "dotenv";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "../config/config.service";
import { passportJwtSecret } from "jwks-rsa";

configDotenv();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(configService: ConfigService) {
	super({
	    secretOrKeyProvider: passportJwtSecret({
		cache: true,
		rateLimit: true,
		jwksRequestsPerMinute: 5,
		jwksUri: `${configService.auth0Config.issuer_url}.well-known/jwks.json`,
	    }),

	    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	    audience: configService.auth0Config.audience,
	    issuer: `${configService.auth0Config.issuer_url}`,
	    algorithms: ['RS256'],
	});
    }

    async validate(payload: any) {
	return payload;
    }
}
