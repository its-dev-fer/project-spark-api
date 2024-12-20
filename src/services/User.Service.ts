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
    async findUserById(id: number): Promise<Partial<IUser>> {
        try {
            const user = await User.findByPk(id, {
                attributes: ['id', 'email', 'name', 'plan_id']
            });
            
            if (user) {
                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    plan_id: user.plan_id
                };
            }
            
            return {};
        } catch (error) {
            throw new ErrorAccessingDatabase("Failed to query user database");
        }
    }
}
