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
    MobilePhone: string;
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

    get Avatar(): string {
        const defaultPhoto: string = this.gender === 'M' ? "http://www.haneffebasket.be/wp-content/uploads/2017/04/avatar-vide.jpeg": "http://www.tmf-operating.com/wp-content/uploads/2015/12/avatar-femme-300x176.jpg";
        return this.photo || defaultPhoto; 
    }

    // constructor(obj?: UserDetailed) {
    //     this.id = obj && obj.id || 0;
    //     this.photo = obj && obj.photo || null;

    // }
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