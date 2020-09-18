export class Student{
    id: number;
    nationalNumber: string;
    lastName: string;
    firstName: string;
    birthdate: Date;
    adCity: string;
    adPostalCode: number;
    adStreet: string;
    adNumber: number;
    adBox: string;
    MobilePhone: string;
    gender: string;
    photo: string;
    personalNote: string;
    token? : string;
    email: string;
    statusCode: number;
    contacts: userContact[];
    lunches: userLunch[];
}

export class userContact{
    id:number;
    nationalNumber:string;
    lastName:string;
    firstName:string;
    birthDate: Date;
    MobilePhone: string;
    gender: string;
    email: string;
    personalNote: string;
}

export class userLunch{
    id: number;
    name: string;
    description: string;
    date: Date;
}