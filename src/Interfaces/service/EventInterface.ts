import EventRequest from "../../DTOS/events/EventRequest";
import Events from "../../db/Models/Events";

export default interface EventInterface {
    createEvent(eventData: EventRequest): Promise<Events>;
}
