import { Injectable } from '@angular/core';
import {UserContactMail} from '../../Models/User/UserContactMail.model';
import { AuthService } from '../Auth/auth.service';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

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

    getMails(){/*bien rajouter la vrais class id en fonction du context*/
      this._client.get<UserContactMail[]>(this.mainURL+'getMails/'+5).subscribe({
        next: data => {
          this.UserMails = data;
          this.sendUserMails();
        },
        error: error =>  console.log(error)
      })
    }

}
