import { Injectable } from '@angular/core';
import { UserSimplified }from '../../Models/User/UserSimplified.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import{FormLogin} from '../../Models/User/FormLogin.model';
import { Observable } from 'rxjs';
import {ResetPwd} from '../../Models/User/ResetPwd.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuth :boolean = false;
  mainURL: string = 'https://localhost:5001/api/auth';
  user: UserSimplified = new UserSimplified();
  error:string;

  constructor(
    private _client: HttpClient,
    private _router: Router,
  ) { }

  Login(form : FormLogin) {
    
    this._client.post<UserSimplified>(this.mainURL, form).subscribe({
      next:(data: UserSimplified) => {
        this.user = data;
        this.isAuth = true; },
      error: error => this.error = error,
    })
  }

  ResetPwd(RP: ResetPwd){
    this._client.put(this.mainURL,RP).subscribe({
      next:() => {
        
        this._router.navigate(['home']);
      },
      error: error => this.error = error,

    })
  }
}