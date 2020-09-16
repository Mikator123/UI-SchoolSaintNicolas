export class UserSimplified{
    id: number;
    lastName:string;
    firstName:string;
    birthdate:Date;
    login:string;
    gender:string;
    token?: string;
    lastResetPwd:Date;
    statusCode: number;
    classId?: number;
}