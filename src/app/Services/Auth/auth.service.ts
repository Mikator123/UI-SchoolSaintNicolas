import { Injectable } from '@angular/core';
import { UserSimplified }from '../../Models/User/UserSimplified.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import{FormLogin} from '../../Models/User/FormLogin.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuth :boolean= false;
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
}