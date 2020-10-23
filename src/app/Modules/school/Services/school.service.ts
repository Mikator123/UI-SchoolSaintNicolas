import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {AuthService} from '../../auth/Services/Auth/auth.service'
import { UserDetailed } from '../../User/Models/UserDetailed.model';
import { SchoolEvent } from '../Models/SchoolEvent.model';
import { SchoolRule } from '../Models/SchoolRule.model';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  rulesURL : string = "https://localhost:5001/api/schoolRule/";
  eventsURL: string= "https://localhost:5001/api/schoolEvent/"
  token: string;


  constructor(

    private _authService : AuthService,
    private _client: HttpClient,
  ) {
    this._authService.user$.subscribe(user => {
      if(user != null)
        this.token = user.token
    })  
   }

  getRules(): Observable<SchoolRule[]>{
    return this._client.get<SchoolRule[]>(this.rulesURL, this.HttpOptions(this.token));
  }

  getRuleById(id: number): Observable<SchoolRule>{
    return this._client.get<SchoolRule>(this.rulesURL+id, this.HttpOptions(this.token))
  }

  getEvents(): Observable<SchoolEvent[]>{
    return this._client.get<SchoolEvent[]>(this.eventsURL, this.HttpOptions(this.token))
  }

  getEventById(eventId: number): Observable<SchoolEvent>{
    return this._client.get<SchoolEvent>(this.eventsURL+eventId, this.HttpOptions(this.token))
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
