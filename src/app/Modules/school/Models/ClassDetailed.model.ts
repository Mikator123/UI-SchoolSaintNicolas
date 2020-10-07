import { UserForEntities } from "./UserForEntities.model";

export class ClassDetailed{
    id: number;
    name: string;
    description: string;
    schoolYear: number;
    schoolYearCategoryId: number;
    users: UserForEntities[];
}