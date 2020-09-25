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

    // constructor(obj: any) {

    //     this.firstName = obj && obj.firstName || '';
    //     this.lastName = obj && obj.lastName || '';
    // }

    // get FullName(): string {
    //     return this.lastName+ ' '+ this.firstName;
    // }
}

export class userContact{
    id:number;
    nationalNumber:string;
    lastName:string;
    firstName:string;
    birthDate: Date;
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