import { Request, Response } from "express";
import AuthRequest from "../DTOS/auth/AuthRequest";
import TokenInterface from "../Interfaces/service/TokenInterface";


export default class AuthController {

    constructor(readonly tokenInterface: TokenInterface){}

    async access (req: Request, res: Response): Promise<Response>{
        try {
            const { email, password }:AuthRequest = req.body;
            
            //validacion del usuarioy

            const token = this.tokenInterface.generateToken('user_id', 'plan_id');
            const refreshToken = this.tokenInterface.refreshToken('user_id', 'plan_id');
        
            return res.status(200).json({
                message: 'Access Successfully',
                data: {
                    token,
                    refreshToken
                }
            })

        } catch (error) {
            console.log(error)
            return res.status(500).json({
                message: 'Hubo un error en el servidor',
                data: null
            })
        }
    }




}