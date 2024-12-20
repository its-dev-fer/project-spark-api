import TokenInterface from "../../Interfaces/service/TokenInterface";
import { Request, Response } from "express";
import handleErrorResponse from "../../Errors/HanlderResponse.Error";
import {
    ErrorMissingRequiredFields,
    ErrorGenerateToken,
    ErrorPayloadDecoding,
    ErrorUnauthorized
} from "../../Errors/Response.Error";

export default class RefreshTokenController {
    constructor(readonly tokenInterface: TokenInterface) {}

    async run(req: Request, res: Response): Promise<Response> {
        try {
            const refreshToken = req.cookies?.refreshToken;

            if (!refreshToken)
                throw new ErrorMissingRequiredFields(
                    "Refresh token not found in cookies"
                );

            const payload =
                this.tokenInterface.validateRefreshToken(refreshToken);

            // Usar el método que maneja las cookies
            this.tokenInterface.generateTokenAndSetCookie(
                payload.user_id,
                payload.plan_id,
                res
            );

            return res.status(200).json({
                message: "Token refreshed successfully",
                data: {
                    user_id: payload.user_id,
                    plan_id: payload.plan_id
                }
            });
        } catch (error) {
            switch (true) {
                case error instanceof ErrorMissingRequiredFields:
                    return handleErrorResponse({
                        res,
                        statusCode: error.statusCode,
                        name: error.message
                    });

                case error instanceof ErrorGenerateToken:
                    return handleErrorResponse({
                        res,
                        statusCode: error.statusCode,
                        name: error.message
                    });

                case error instanceof ErrorPayloadDecoding:
                    return handleErrorResponse({
                        res,
                        statusCode: error.statusCode,
                        name: error.message
                    });

                case error instanceof ErrorUnauthorized:
                    return handleErrorResponse({
                        res,
                        statusCode: error.statusCode,
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
