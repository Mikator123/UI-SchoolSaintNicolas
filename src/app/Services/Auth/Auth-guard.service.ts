import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {


  constructor(
    private _auth: AuthService,
    private route:Router,
  ) { }

  canActivate():Boolean{
    if(this._auth.isAuth)
      return true;
    else
      this.route.navigate(['/auth'])
  }
}
