import UserService from "./User.Service";
import { ErrorNotFound } from "../Errors/Response.Error";
import IUser from "../DTOS/users/IUser";

export default class ProfileService {
    constructor(private readonly userService: UserService) {}

    async getUserProfile(userId: number): Promise<Omit<IUser, "password">> {
        const user = await this.userService.findUserByEmail(userId.toString());

        if (!user) {
            throw new ErrorNotFound("User profile not found");
        }

        const { password, ...userWithoutPassword } = user;

        return userWithoutPassword;
    }
}
