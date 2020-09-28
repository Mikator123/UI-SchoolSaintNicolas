import { Injectable } from '@angular/core';
import {UserContactMail} from '../Models/UserContactMail.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { AuthService } from '../../auth/Services/Auth/auth.service';
import {UserDetailed} from '../Models/UserDetailed.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  mainURL: string = 'https://localhost:5001/api/user/';
  UserMails : UserContactMail[] = [];
  mailSubject : Subject<UserContactMail[]>= new Subject<UserContactMail[]>();

  constructor(
    private _client: HttpClient,
  ) { }

  get mails$(): Observable<UserContactMail[]>{
    return this.mailSubject.asObservable()}
  


  getMails(classId:number){
      this._client.get<UserContactMail[]>(this.mainURL+'getMails/'+classId).subscribe({
        next: data => {
          this.UserMails = data;
          this.mailSubject.next(this.UserMails.slice());
        },
        error: error =>  console.log(error)
      })
    }

  getById(Id : number): Observable<UserDetailed>{
      return this._client.get<UserDetailed>(this.mainURL+Id);
    }


    private HttpOptions(token:string){
      let options = {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token
        })
      };
      return options;
    }
}
