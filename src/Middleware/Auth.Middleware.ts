import { Request, Response, NextFunction } from "express";
import TokenInterface from "../Interfaces/service/TokenInterface";
import {
    ErrorValidateToken,
    ErrorMissingRequiredFields
} from "../Errors/Response.Error";
import handleErrorResponse from "../Errors/HanlderResponse.Error";

export default class AuthMiddleware {
    constructor(readonly tokenService: TokenInterface) { }

    async run(req: Request, res: Response, next: NextFunction) {
        try {
            const token = req.headers.authorization;

            if (!token)
                throw new ErrorMissingRequiredFields("No token provided");
            this.tokenService.validateToken(token.replace("Bearer", " "));

            next();

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
                        name: error.name
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
