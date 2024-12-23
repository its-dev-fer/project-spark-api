import { Request, Response } from "express";
import EncryptInterface from "../../Interfaces/service/EncryptInterface";
import User from "../../db/Models/User";
import IUpdateUser from "../../DTOS/users/UpdateUser";
import {
    ErrorMissingRequiredFields,
    ErrorNotFound,
    ErrorPasswordHashing
} from "../../Errors/Response.Error";
import handleErrorResponse from "../../Errors/HanlderResponse.Error";
import UserResponse from "../../DTOS/users/UserResponse";

export default class UpdateUserController {
    constructor(readonly encryptService: EncryptInterface) {}

    async run(req: Request, res: Response) {
        try {
            const { email, name, password }: IUpdateUser = req.body;
            if (!email)
                throw new ErrorMissingRequiredFields("Email is required");
            if (!name && !password)
                throw new ErrorMissingRequiredFields(
                    "Either Name or Password is required"
                );

            const user = await User.findOne({ where: { email } });
            if (!user) throw new ErrorNotFound("User not found");

            let updated = false;

            if (name) {
                user.name = name;
                updated = true;
            }

            if (password) {
                user.password = await this.encryptService.hash(password);
                updated = true;
            }

            const userResponse: UserResponse = {
                id: user.id,
                name: user.name,
                email: user.email,
                plan_id: user.plan_id
            }

            if (updated) {
                await user.save();
                return res.status(200).json({
                    message: "User updated successfully",
                    data: userResponse
                });
            } else {
                return res.status(400).json({
                    message: "No changes were made",
                    data: null
                });
            }
        } catch (error) {
            switch (true) {
                case error instanceof ErrorMissingRequiredFields:
                    return handleErrorResponse({
                        res,
                        statusCode: error.statusCode,
                        name: error.message
                    });

                case error instanceof ErrorNotFound:
                    return handleErrorResponse({
                        res,
                        statusCode: error.statusCode,
                        name: error.message
                    });

                case error instanceof ErrorPasswordHashing:
                    return handleErrorResponse({
                        res,
                        statusCode: error.statusCode,
                        name: error.message
                    });

                default:
                    return handleErrorResponse({
                        res,
                        statusCode: 500,
                        name: "Internal Server Error"
                    });
            }
        }
    }
}
