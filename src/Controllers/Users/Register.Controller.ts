import { Request, Response } from "express";
import UserRequest from "../../DTOS/users/UserRequest";
import User from "../../db/Models/User";
import TokenInterface from "../../Interfaces/service/TokenInterface";
import EncryptInterface from "../../Interfaces/service/EncryptInterface";
import UserInterface from "../../Interfaces/service/UserInterface";
import {
    ErrorResourceExists,
    ErrorAccessingDatabase,
    ErrorGenerateToken
} from "../../Errors/Response.Error";
import handleErrorResponse from "../../Errors/HanlderResponse.Error";
import UserResponse from "../../DTOS/users/UserResponse";

export default class RegisterUserController {
    constructor(
        readonly tokenService: TokenInterface,
        readonly encryptService: EncryptInterface,
        readonly userService: UserInterface
    ) {}

    async run(req: Request, res: Response) {
        try {
            const { email, password, name }: UserRequest = req.body;
            const existingUser = await this.userService.findUserByEmail(email);

            if (existingUser)
                throw new ErrorResourceExists(
                    "The email address you entered is already registered."
                );

            const newUser = await User.create({
                email,
                password: await this.encryptService.hash(password),
                name,
                plan_id: 1
            }).catch(() => {
                throw new ErrorAccessingDatabase(
                    "Failed to query user database al crear"
                );
            });

            const token = this.tokenService.generateToken(
                newUser.id,
                newUser.plan_id
            );

            const user: UserResponse = {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                plan_id: newUser.plan_id
            };

            return res.status(201).json({
                message: "Resource successfully created",
                data: {
                    user,
                    token
                }
            });
        } catch (error) {
        
            switch (true) {
                case error instanceof ErrorAccessingDatabase:
                    return handleErrorResponse({
                        res,
                        statusCode: error.statusCode,
                        name: error.message
                    });

                case error instanceof ErrorResourceExists:
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
