import { Request, Response, NextFunction } from "express";
import TokenInterface from "../Interfaces/service/TokenInterface";
import {
    ErrorValidateToken,
    ErrorMissingRequiredFields
} from "../Errors/Response.Error";
import handleErrorResponse from "../Errors/HanlderResponse.Error";

export interface AuthenticatedRequest extends Request {
    user?: {
        user_id: number;
        plan_id: number;
    };
}

export default class AuthMiddleware {
    constructor(readonly tokenService: TokenInterface) {}

    async run(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            const token = req.headers.authorization;

            if (!token)
                throw new ErrorMissingRequiredFields("No token provided");

            try {
                const decoded = this.tokenService.validateToken(
                    token.replace("Bearer ", "")
                ) as {
                    user_id: number;
                    plan_id: number;
                };

                req.user = {
                    user_id: decoded.user_id,
                    plan_id: decoded.plan_id
                };

                next();
            } catch (error) {
                throw new ErrorValidateToken("Invalid or expired token");
            }
        } catch (error) {
            switch (true) {
                case error instanceof ErrorMissingRequiredFields:
                    return handleErrorResponse({
                        res,
                        statusCode: 401,
                        name: error.message
                    });

                case error instanceof ErrorValidateToken:
                    return handleErrorResponse({
                        res,
                        statusCode: 401,
                        name: error.message
                    });

                default:
                    return handleErrorResponse({
                        res,
                        statusCode: 500,
                        name: "An unexpected error occurred"
                    });
            }
        }
    }
}
