export class UserContactMail{
    id: number;
    fullName: string;
    gender: string;
    photo: string;
    contacts: ContactMail[];
}

export class ContactMail{
    id: number;
    fullName: string;
    email: string;
}

