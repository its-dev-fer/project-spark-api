import { Router } from "express";
import CreateEventController from "../Controllers/Events/createEvent.controller";
import EventService from "../services/Event.Service";

const router = Router();

const eventService = new EventService();
const createEventController = new CreateEventController(eventService);

router.post("/events", (req, res) => createEventController.run(req, res));

export { router as EventsRouter };
