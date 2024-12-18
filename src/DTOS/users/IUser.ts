export default interface IUser {
    id: number;
    email: string;
    password: string;
    name: string;
    plan_id: number;
    created_at: Date;
    updated_at: Date;
}
