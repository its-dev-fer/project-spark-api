import { Request } from "express";

export interface AuthenticatedRequest extends Request {
    user?: {
        user_id: number;
        plan_id: number;
    };
}
