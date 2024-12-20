import { Request, Response } from "express";
import UserService from "../../Services/User.Service";
import ProfileService from "../../Services/Profile.Service";
import { ErrorNotFound } from "../../Errors/Response.Error";
import handleErrorResponse from "../../Errors/HanlderResponse.Error";
import { AuthenticatedRequest } from "../../Interfaces/auth/AuthenticatedRequest";

export default class ProfileController {
    constructor(
        private readonly userService: UserService,
        private readonly profileService: ProfileService
    ) {}

    async getUserProfile(req: AuthenticatedRequest, res: Response) {
        try {
            const userId = req.user?.user_id;

            if (!userId) {
                throw new ErrorNotFound("User not found");
            }

            const userProfile =
                await this.profileService.getUserProfile(userId);

            res.status(200).json(userProfile);
        } catch (error) {
            if (error instanceof ErrorNotFound) {
                return handleErrorResponse({
                    res,
                    statusCode: 404,
                    name: error.message
                });
            }

            return handleErrorResponse({
                res,
                statusCode: 500,
                name: "An unexpected error occurred"
            });
        }
    }
}
