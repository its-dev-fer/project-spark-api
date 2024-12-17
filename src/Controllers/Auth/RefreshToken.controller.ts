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
            const { refreshToken }: { refreshToken: string } = req.body;

            if (!refreshToken)
                throw new ErrorMissingRequiredFields(
                    "Is required refreshToken"
                );

            const payload =
                this.tokenInterface.validateRefreshToken(refreshToken);

            const newToken = this.tokenInterface.generateToken(
                payload.user_id,
                payload.plan_id
            );

            return res.status(200).json({
                message: "Token generated successfully",
                data: {
                    token: newToken
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
