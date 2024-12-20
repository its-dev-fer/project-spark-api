import IPayload from "./payloadInterface";
export default interface TokenInterface {
    generateToken(user_id: number, plan_id: number): string;
    validateToken(token: string): { user_id: number; plan_id: number };
    refreshToken(user_id: number, plan_id: number): string;
    validateRefreshToken(refreshToken: string): IPayload;
}
