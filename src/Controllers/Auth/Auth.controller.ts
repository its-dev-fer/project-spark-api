import { Request, Response } from "express";
import AuthRequest from "../../DTOS/auth/AuthRequest";
import TokenInterface from "../../Interfaces/service/TokenInterface";
import EncryptInterface from "../../Interfaces/service/EncryptInterface";
import UserInterface from "../../Interfaces/service/UserInterface";
import IUser from "../../DTOS/users/IUser";
import {
    ErrorAccessingDatabase,
    ErrorGenerateToken,
    ErrorNotFound,
    ErrorMissingRequiredFields,
    ErrorCredentials,
    ErrorPasswordComparison
} from "../../Errors/Response.Error";

import handleErrorResponse from "../../Errors/HanlderResponse.Error";
export default class AuthController {
    constructor(
        readonly tokenService: TokenInterface,
        readonly encryptService: EncryptInterface,
        readonly userService: UserInterface
    ) {}

    async access(req: Request, res: Response): Promise<Response> {
        try {
            const { email, password }: AuthRequest = req.body;

            if (!email || !password)
                throw new ErrorMissingRequiredFields(
                    "Required fields not provided"
                );

            const userFound: IUser | undefined = await this.userService.findUserByEmail(email);

            if (!userFound) throw new ErrorNotFound("User not found");

            const isPasswordMatch = await this.encryptService.compare(
                userFound.password,
                password
            );
            if (!isPasswordMatch)
                throw new ErrorCredentials("Credentials Invalid");

            const token = this.tokenService.generateToken(
                userFound.id,
                userFound.plan_id
            );
            const refreshToken = this.tokenService.refreshToken(
                userFound.id,
                userFound.plan_id
            );

            return res.status(200).json({
                message: "Access Successfully",
                data: {
                    token,
                    refreshToken
                }
            });
        } catch (error) {
            switch (true) {
                case error instanceof ErrorMissingRequiredFields:
                    return handleErrorResponse({
                        res,
                        statusCode: error.statusCode,
                        name: error.name
                    });

                case error instanceof ErrorAccessingDatabase:
                    return handleErrorResponse({
                        res,
                        statusCode: error.statusCode,
                        name: error.name
                    });

                case error instanceof ErrorNotFound:
                    return handleErrorResponse({
                        res,
                        statusCode: error.statusCode,
                        name: error.name
                    });

                case error instanceof ErrorGenerateToken:
                    return handleErrorResponse({
                        res,
                        statusCode: error.statusCode,
                        name: error.message
                    });

                case error instanceof ErrorCredentials:
                    return handleErrorResponse({
                        res,
                        statusCode: error.statusCode,
                        name: error.message
                    });

                case error instanceof ErrorPasswordComparison:
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
