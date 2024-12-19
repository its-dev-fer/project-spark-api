import EventInterface from "../Interfaces/service/EventInterface";
import EventRequest from "../DTOS/events/EventRequest";
import Events from "../db/Models/Events";
import { ErrorAccessingDatabase } from "../Errors/Response.Error";

export default class EventService implements EventInterface {
    async createEvent(eventData: EventRequest): Promise<Events> {
        try {
            const parsedEventDate = new Date(eventData.event_date);

            const event = await Events.create({
                name: eventData.name,
                event_date: parsedEventDate,
                location: eventData.location,
                event_id: eventData.event_id,
                template_id: eventData.template_id || null,
                user_id: eventData.user_id
            });

            return event;
        } catch (error) {
            console.error("Error creating event:", error);
            throw new ErrorAccessingDatabase("Failed to create event");
        }
    }
}
