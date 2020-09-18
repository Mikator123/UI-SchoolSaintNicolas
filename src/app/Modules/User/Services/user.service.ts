import { Injectable } from '@angular/core';
import {UserContactMail} from '../Models/UserContactMail.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { AuthService } from '../../auth/Services/Auth/auth.service';
import {UserDetailed} from '../Models/UserDetailed.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  mainURL: string = 'https://localhost:5001/api/user/';
  UserMails : UserContactMail[] = [];
  userSubject : Subject<UserContactMail[]> = new Subject<UserContactMail[]>();
  Error:string;
  optionRequete = {
    headers: new HttpHeaders({ 
      'Access-Control-Allow-Origin':'*'})};
  

  constructor(
    private _auth: AuthService,
    private _client: HttpClient,
  ) { }

    sendUserMails(){
      this.userSubject.next(this.UserMails.slice());
    }  

    getMails(classId:number){/*bien rajouter la vrais class id en fonction du context*/
      this._client.get<UserContactMail[]>(this.mainURL+'getMails/'+classId).subscribe({
        next: data => {
          this.UserMails = data;
          this.sendUserMails();
        },
        error: error =>  console.log(error)
      })
    }

    geById(Id : number): Observable<UserDetailed>{
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
