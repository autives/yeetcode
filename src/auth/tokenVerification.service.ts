import * as jwksClient from 'jwks-rsa';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '../config/config.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TokenVerificationService {
    private client: jwksClient.JwksClient;
    
    constructor(configService: ConfigService) {
	this.client = jwksClient({
	    cache: true,
	    cacheMaxEntries: 5,
	    cacheMaxAge: 600000,
	    jwksUri: `${configService.auth0Config.issuer_url}.well-known/jwks.json`,
	});
    }
    
    public async verifyToken(token: string): Promise<any> {
	try {
	    const decodedHeader = jwt.decode(token, { complete: true })?.header;

	    if (!decodedHeader || !decodedHeader.kid) {
		throw new Error('Invalid token header: "kid" not found.');
	    }
	    
	    const signingKey = await this.getSigningKey(decodedHeader.kid);
	    const verifiedToken = jwt.verify(token, signingKey);

	    return verifiedToken;
	} catch (error) {
	    console.error('Token verification failed:', (error as Error).message);
	    throw error;
	}
    }
    
    private async getSigningKey(kid: string): Promise<string> {
	try {
	    const key = await this.client.getSigningKey(kid);	    
	    return key.getPublicKey();
	} catch (error) {
	    console.error('Failed to retrieve signing key:', (error as Error).message);
	throw error;
	}
    }
}
