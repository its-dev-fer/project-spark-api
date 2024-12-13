import TokenInterface from "../../Interfaces/service/TokenInterface";
import { Request, Response } from "express";

export default class RefreshToken {
    constructor( readonly tokenInterface: TokenInterface){}

    async run (req: Request, res:Response): Promise<Response>{
        try {
            
            const {refreshToken}:{refreshToken: string} = req.body;

            if (!refreshToken){
                return res.status(400).json({
                    data: null,
                    message: "Refresh token not provided"
                })
            }

        const payload = this.tokenInterface.validateRefreshToken(refreshToken);
        
        if (!payload){
            return res.status(401).json({
                data: null,
                message: 'Invalid refresh token'
            })
        }  

        const newToken = this.tokenInterface.generateToken(payload.user_id, payload.plan_id)

        return res.status(200).json({
            message: "Token generated successfully",
            data:{
                token: newToken
            }
        })

        } catch (error) {
            console.error(error)
            return res.status(500).json({
                message: 'Internal Server Error',
                data: null
            })
        }
    }

}