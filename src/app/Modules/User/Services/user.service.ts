import { Injectable } from '@angular/core';
import {UserContactMail} from '../Models/UserContactMail.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { AuthService } from '../../auth/Services/Auth/auth.service';
import {UserDetailed} from '../Models/UserDetailed.model';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  mainURL: string = 'https://localhost:5001/api/user/';
  UserMails : UserContactMail[] = [];
  mailSubject : Subject<UserContactMail[]>= new Subject<UserContactMail[]>();
  token : string = '';

  constructor(
    private _client: HttpClient,
    private _authService: AuthService,
  ) { 
    this._authService.user$.subscribe(user => {
      if(user != null)
        this.token = user.token
    })      
  }

  get mails$(): Observable<UserContactMail[]>{
    return this.mailSubject.asObservable()}
  


  getMails(classId:number){
      this._client.get<UserContactMail[]>(this.mainURL+'getMails/'+classId, this.HttpOptions(this.token)).subscribe({
        next: data => {
          this.UserMails = data;
          this.mailSubject.next(this.UserMails.slice());
        },
        error: error =>  console.log(error)
      })
    }

  getById(Id : number): Observable<UserDetailed>{
      return this._client.get<UserDetailed>(this.mainURL+Id, this.HttpOptions(this.token));
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
