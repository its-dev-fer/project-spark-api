import { Request, Response } from "express";
import AuthRequest from "../../DTOS/auth/AuthRequest";
import TokenInterface from "../../Interfaces/service/TokenInterface";
import User from "../../db/Models/User";
import IUser from "../../DTOS/users/IUser";

export default class AuthController {
    constructor(readonly tokenInterface: TokenInterface) {}

    async access(req: Request, res: Response): Promise<Response> {
        try {
            const { email, password }: AuthRequest = req.body;
            

            const userFound: IUser | null = await User.findOne({
                where: {
                    password,
                    email
                }
            });

            if (!userFound) {
                return res.status(404).json({
                    data: null,
                    message: "User Not found"
                });
            }

            const token = this.tokenInterface.generateToken(
                userFound.id,
                userFound.plan_id
            );
            const refreshToken = this.tokenInterface.refreshToken(
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
            console.log(error);
            return res.status(500).json({
                message: "Hubo un error en el servidor",
                data: null
            });
        }
    }
}
