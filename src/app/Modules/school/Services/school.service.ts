import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {AuthService} from '../../auth/Services/Auth/auth.service'
import { SchoolRule } from '../Models/SchoolRule.model';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  rulesURL : string = "https://localhost:5001/api/schoolRule/"

  constructor(

    private _authService : AuthService,
    private _client: HttpClient,
  ) { }

  getRules(): Observable<SchoolRule[]>{
    return this._client.get<SchoolRule[]>(this.rulesURL);
  }

  getRulesByIt(id: number): Observable<SchoolRule>{
    return this._client.get<SchoolRule>(this.rulesURL+id)
  }
}
