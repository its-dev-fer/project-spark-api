import IPayload from "./payloadInterface";
import { Response } from "express-serve-static-core";
export default interface TokenInterface {
    generateToken(user_id: number, plan_id: number): string;
    generateTokenAndSetCookie(
        user_id: number,
        plan_id: number,
        res: Response<any, Record<string, any>, number>
    ): void;
    validateToken(token: string): boolean;
    refreshToken(user_id: number, plan_id: number): string;
    validateRefreshToken(refreshToken: string): IPayload;
    validateAndDecodeToken(token: string): IPayload;
}
