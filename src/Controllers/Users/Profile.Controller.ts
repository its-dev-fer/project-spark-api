import { Request, Response } from "express";
import UserService from "../../Services/User.Service";
import ProfileService from "../../Services/Profile.Service";
import { ErrorNotFound } from "../../Errors/Response.Error";
import handleErrorResponse from "../../Errors/HanlderResponse.Error";

export default class ProfileController {
    constructor(
        private readonly userService: UserService,
        private readonly profileService: ProfileService
    ) {}

    async getUserProfile(req: any, res: Response) {
        try {
            const userId = req.user?.user_id;
            console.log(userId)
            if (!userId) {
                throw new ErrorNotFound("User not found");
            }

            const userProfile = await this.userService.findUserById(userId);

            if (!userProfile) {
                throw new ErrorNotFound("User profile not found");
            }

            
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
