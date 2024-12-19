import { Request, Response } from "express";
import EventInterface from "../../Interfaces/service/EventInterface";
import EventRequest from "../../DTOS/events/EventRequest";
import {
    ErrorMissingRequiredFields,
    ErrorAccessingDatabase
} from "../../Errors/Response.Error";
import handleErrorResponse from "../../Errors/HanlderResponse.Error";

export default class CreateEventController {
    constructor(readonly eventService: EventInterface) {}

    async run(req: Request, res: Response): Promise<Response> {
        try {
            const {
                name,
                event_date,
                location,
                event_id,
                template_id,
                user_id
            }: EventRequest = req.body;

            console.log("Request body:", req.body);

            if (!name || !event_date || !location || !event_id) {
                throw new ErrorMissingRequiredFields(
                    "Required fields not provided"
                );
            }

            const event = await this.eventService.createEvent({
                name,
                event_date,
                location,
                event_id,
                template_id,
                user_id
            });

            return res.status(201).json({
                message: "Event created successfully",
                data: event
            });
        } catch (error) {
            console.error("Controller error:", error);

            switch (true) {
                case error instanceof ErrorMissingRequiredFields:
                    return handleErrorResponse({
                        res,
                        statusCode: error.statusCode,
                        name: error.message
                    });

                case error instanceof ErrorAccessingDatabase:
                    return handleErrorResponse({
                        res,
                        statusCode: error.statusCode,
                        name: error.message
                    });

                default:
                    return handleErrorResponse({
                        res,
                        statusCode: 500,
                        name:
                            error instanceof Error
                                ? error.message
                                : "An unexpected error occurred"
                    });
            }
        }
    }
}
