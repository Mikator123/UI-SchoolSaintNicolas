export class Class{
    id: number;
    name: string;
    description: string;
    schoolYear: number;
    schoolYearCategoryId: number;
    users: User;
}

export class User{
    id: number;
    lastName: string;
    firstName: string;
}