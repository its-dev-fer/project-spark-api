
export default interface TokenInterface {
    generateToken(user_id: string,  plan_id: string) : string;
    validateToken(token: string): boolean;
    refreshToken(user_id: string,  plan_id: string) : string
}