export default interface EventRequest {
    name: string;
    event_date: Date;
    location: string;
    event_id: number;
    template_id?: number;
    user_id: number;
}
