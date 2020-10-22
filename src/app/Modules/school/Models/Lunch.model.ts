import { UserForEntities } from "./UserForEntities.model";


export class Lunch{
    id: number;
    name: string;
    description: string;
    date: Date;
    users: UserForEntities[];
}