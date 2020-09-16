import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserSimplified } from '../../Models/UserSimplified.model';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

user$ : Observable<UserSimplified>;

  constructor(
    private _auth: AuthService,
    private route:Router,
  ) { }

  canActivate():Boolean{
    if(this._auth.userSubject.getValue() == null)
      this.route.navigate(['/login'])  
    else
      return true;
  }
}