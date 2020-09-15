import { Injectable } from '@angular/core';
import { UserSimplified }from '../../Models/User/UserSimplified.model';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import{FormLogin} from '../../Models/User/FormLogin.model';
import { Observable, Subject } from 'rxjs';
import {ResetPwd} from '../../Models/User/ResetPwd.model';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuth :boolean = false;
  mainURL: string = 'https://localhost:5001/api/auth';
  user: UserSimplified;
  error : HttpErrorResponse;
  private userSubject : Subject<UserSimplified>;

  constructor(
    private _client: HttpClient,
    private _router: Router,

  ) {
    
   }

  Login(form : FormLogin) {
    
    return this._client.post<UserSimplified>(this.mainURL, form)
    .pipe(map(user => {
      localStorage.setItem('user', JSON.stringify(user));
      this.userSubject.next(user);
      return user}))
  }

  ResetPwd(RP: ResetPwd){
    this._client.put(this.mainURL,RP, this.HttpOptions(this.user.token)).subscribe({
      next:() => {
        this._router.navigate(['home']);
      },
      error: error => this.error = error,
    })
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