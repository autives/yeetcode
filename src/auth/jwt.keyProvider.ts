import { passportJwtSecret } from "jwks-rsa";
import { ConfigService } from "../config/config.service";

export const createJwksKeyProvider = (configService: ConfigService) => 
    passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${configService.auth0Config.issuer_url}.well-known/jwks.json`,
    });
