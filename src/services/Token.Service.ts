import jwt from "jsonwebtoken"
import TokenInterface from "../Interfaces/service/TokenInterface";
import { JWT_SECRET, REFRESH_TOKEN } from "../config/config";

export default class TokenService implements TokenInterface {

    generateToken(user_id: string, plan_id: string): string {
        return jwt.sign({
            user_id,
            plan_id 
           
         },
            JWT_SECRET,
            {
               algorithm: 'HS256',
               expiresIn: '1h'
            }
         );
    }

    validateToken(token: string): boolean {
        try {
            jwt.verify(
               token,
              JWT_SECRET,
               { algorithms: ['HS256'] }
            )
   
            return true
   
         } catch (error) {
            console.log(error)
            return false
         }
    }


    refreshToken(user_id: string, plan_id: string): string {
      return jwt.sign({
         user_id,
         plan_id 
        
      },
         REFRESH_TOKEN,
         {
            algorithm: 'HS256',
            expiresIn: '30d'
         }
      );
    }
}