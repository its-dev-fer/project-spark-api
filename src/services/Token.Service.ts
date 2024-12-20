import { Response } from 'express-serve-static-core';
import jwt from "jsonwebtoken";
import TokenInterface from "../Interfaces/service/TokenInterface";
import { JWT_SECRET, REFRESH_TOKEN } from "../Config/config";
import IPayload from "../Interfaces/service/payloadInterface";
import {
    ErrorGenerateToken,
    ErrorUnauthorized,
    ErrorValidateToken,
    ErrorPayloadDecoding
} from "../Errors/Response.Error";

export default class TokenService implements TokenInterface {
    generateToken(user_id: number, plan_id: number): string {
        try {
            return jwt.sign({ user_id, plan_id }, JWT_SECRET, {
                algorithm: "HS256",
                expiresIn: "3h"
            });
        } catch (error) {
            throw new ErrorGenerateToken("Failed to generate the token");
        }
    }

    generateTokenAndSetCookie(user_id: number, plan_id: number, res: Response<any, Record<string, any>, number>): void {
        try {
            const token = this.generateToken(user_id, plan_id);
            const refreshToken = this.refreshToken(user_id, plan_id);

            res.cookie('token', token, {
                maxAge: 3 * 60 * 60 * 1000 
            });

            res.cookie('refreshToken', refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000 
            });
        } catch (error) {
            throw new ErrorGenerateToken("Failed to generate and set token cookies");
        }
    }

    validateToken(token: string): boolean {
        try {
            jwt.verify(token, JWT_SECRET, { algorithms: ["HS256"] });
            return true;
        } catch (error) {
            throw new ErrorValidateToken("Invalid or expired token");
        }
    }

    refreshToken(user_id: number, plan_id: number): string {
        try {
            return jwt.sign({ user_id, plan_id }, REFRESH_TOKEN, {
                algorithm: "HS256",
                expiresIn: "30d"
            });
        } catch (error) {
            throw new ErrorGenerateToken("Failed to generate refresh token");
        }
    }

    validateRefreshToken(refreshToken: string): IPayload {
        try {
            const decoded = jwt.verify(refreshToken, REFRESH_TOKEN, {
                algorithms: ["HS256"]
            }) as IPayload;

            if (!decoded?.user_id || !decoded?.plan_id) {
                throw new ErrorPayloadDecoding(
                    "The payload of the refresh token is missing or malformed."
                );
            }

            return {
                user_id: decoded.user_id,
                plan_id: decoded.plan_id
            };
        } catch (error) {
            throw new ErrorUnauthorized("Invalid or expired refresh token");
        }
    }

    validateAndDecodeToken(token: string): IPayload {
        try {
            const decoded = jwt.verify(token, JWT_SECRET, {
                algorithms: ["HS256"]
            }) as IPayload;

            if (!decoded?.user_id || !decoded?.plan_id) {
                throw new ErrorPayloadDecoding(
                    "The payload of the token is missing or malformed."
                );
            }

            return {
                user_id: decoded.user_id,
                plan_id: decoded.plan_id
            };
        } catch (error) {
            throw new ErrorValidateToken("Invalid or expired token");
        }
    }
}