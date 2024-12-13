import jwt from "jsonwebtoken";
import TokenInterface from "../Interfaces/service/TokenInterface";
import { JWT_SECRET, REFRESH_TOKEN } from "../config/config";
import IPayload from "../Interfaces/service/payloadInterface";
export default class TokenService implements TokenInterface {

    generateToken(user_id: number, plan_id: number): string {
        return jwt.sign(
            {
                user_id,
                plan_id
            },
            JWT_SECRET,
            {
                algorithm: "HS256",
                expiresIn: "1h"
            }
        );
    }

    validateToken(token: string): boolean {
        try {
            jwt.verify(token, JWT_SECRET, { algorithms: ["HS256"] });

            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    refreshToken(user_id: number, plan_id: number): string {
        return jwt.sign(
            {
                user_id,
                plan_id
            },
            REFRESH_TOKEN,
            {
                algorithm: "HS256",
                expiresIn: "30d"
            }
        );
    }

    validateRefreshToken(refreshToken: string): IPayload | null {
        try {
            const decoded = jwt.verify(refreshToken, REFRESH_TOKEN, {  algorithms: ["HS256"]}) as IPayload;
            
            if (!decoded?.user_id || !decoded?.plan_id) {
                console.warn('Token inválido: faltan datos requeridos');
                return null;
            }

            return {
                user_id: decoded.user_id,
                plan_id: decoded.plan_id
            };

        } catch (error) {
            console.log(error)
            return null
        }
    }
}
