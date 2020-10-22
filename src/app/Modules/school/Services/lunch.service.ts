import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {AuthService} from '../../auth/Services/Auth/auth.service';
import { Observable } from 'rxjs';
import { Lunch } from '../Models/Lunch.model';


@Injectable({
  providedIn: 'root'
})
export class LunchService {

  lunchURL: string = "https://localhost:5001/api/lunch/";
  token: string;

  constructor(
    private _client: HttpClient,
    private _authService : AuthService,

  ) {
    this._authService.user$.subscribe(user => {
      if(user != null)
        this.token = user.token
    })  
   }

   getLunches(): Observable<Lunch[]>{
    return this._client.get<Lunch[]>(this.lunchURL, this.HttpOptions(this.token));
   }

   getLunchById(lunchId: number): Observable<Lunch>{
    return this._client.get<Lunch>(this.lunchURL+lunchId, this.HttpOptions(this.token));
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
