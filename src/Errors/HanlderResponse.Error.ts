import { Response } from "express";

interface ErrorResponse {
    res: Response;
    statusCode: number;
    name: string;
}

const handleErrorResponse = ({ res, statusCode, name }: ErrorResponse) => {
    return res.status(statusCode).json({
        message: name,
        data: null
    });
};

export default handleErrorResponse;
