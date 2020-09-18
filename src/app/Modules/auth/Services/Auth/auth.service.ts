import { Injectable } from '@angular/core';
import { UserSimplified }from '../../Models/UserSimplified.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { FormLogin } from '../../Models/FormLogin.model';
import { ResetPwd } from '../../Models/ResetPwd.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuth : boolean = false;
  mainURL: string = 'https://localhost:5001/api/auth';
  user: UserSimplified;
  userSubject : BehaviorSubject<UserSimplified>= new BehaviorSubject(null);

  constructor(
    private _client: HttpClient,
    private _router: Router,

  ) {
    
   }

   get user$(): Observable<UserSimplified> {
     return this.userSubject.asObservable();
     
   }

  Login(form : FormLogin) {
    
    return this._client.post<UserSimplified>(this.mainURL, form)
    .pipe(map(user => {
      localStorage.setItem('user', JSON.stringify(user));
      this.userSubject.next(user);
      return user}));
      
  }

  Logout(){
    this.userSubject.next(null);
    this.user = null;
    localStorage.clear();
  }

  ResetPwd(RP: ResetPwd){
    this._client.put(this.mainURL,RP, this.HttpOptions(this.userSubject.value.token)).subscribe({
      next:() => {
        this._router.navigate(['userDetails']);
      }
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