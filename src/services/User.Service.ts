import IUser from "../DTOS/users/IUser";
import UserInterface from "../Interfaces/service/UserInterface";
import User from "../db/Models/User";
import { ErrorAccessingDatabase } from "../Errors/Response.Error";

export default class UserService implements UserInterface {
    async findUserByEmail(email: string): Promise<IUser | undefined> {
        try {
            const existingUser = await User.findOne({ where: { email } });
            return existingUser || undefined;
        } catch (error) {
            throw new ErrorAccessingDatabase("Failed to query user database");
        }
    }
    async findUserById(id: number): Promise<IUser | undefined> {
        try {
            const user = await User.findByPk(id);
            return user || undefined;
        } catch (error) {
            throw new ErrorAccessingDatabase("Failed to query user database");
        }
    }
}
