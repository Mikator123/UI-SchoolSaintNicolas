import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {AuthService} from '../../auth/Services/Auth/auth.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Lunch } from '../Models/Lunch.model';


@Injectable({
  providedIn: 'root'
})
export class LunchService {

  lunchURL: string = "https://localhost:5001/api/lunch/";
  token: string;
  lunchSubject: BehaviorSubject<Lunch[]> = new BehaviorSubject(null)


  constructor(
    private _client: HttpClient,
    private _authService : AuthService,
  ) {
    this._authService.user$.subscribe(user => {
      if(user != null)
        this.token = user.token
    })  
   }

   get lunches$(){
     return this.lunchSubject.asObservable();
   }

   getLunches(){
    return this._client.get<Lunch[]>(this.lunchURL, this.HttpOptions(this.token)).subscribe({
      next : data => {
        this.lunchSubject.next(data)},
      error: error => {console.log(error)}
    });
   }

   getLunchById(lunchId: number): Observable<Lunch>{
    return this._client.get<Lunch>(this.lunchURL+lunchId, this.HttpOptions(this.token));
   }

   SubscribeToLunch(entityId: number, userId: number){
    this._client.post(this.lunchURL+'linkToUser',{entityId, userId}, this.HttpOptions(this.token)).subscribe({
      next: () => {this.getLunches()},
      error: error => console.log(error)
    })
   }

   UnSubscribeFromLunch(lunchId: number, userId: number){
    this._client.request('DELETE', this.lunchURL+'unlinkFromUser', this.HttpDeleteWithBodyOptions(this.token,lunchId, userId)).subscribe({
      next: () => {this.getLunches()},
      error: error => console.log(error)
    })
   }

   private HttpDeleteWithBodyOptions(token:string, entityId: number, userId: number){
    let options = {
      body: {entityId, userId},
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    };
    return options;
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
