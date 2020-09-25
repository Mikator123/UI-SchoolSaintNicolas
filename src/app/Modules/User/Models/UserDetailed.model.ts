export class UserDetailed{
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
    mobilePhone: string;
    login: string;
    password? : string;
    gender: string;
    photo: string;
    personalNote: string;
    token? : string;
    startDate: Date;
    lastResetPwd? : Date;
    email: string;
    classId? : number;
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
    adCity: string;
    adPostalCode: number;
    adStreet: string;
    adNumber: number;
    adBox: string; 
    mobilePhone: string;
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