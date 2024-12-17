import IUser from "../../DTOS/users/IUser";

export default interface UserInterface {
    findUserByEmail(email: string): Promise<IUser |  undefined>
}