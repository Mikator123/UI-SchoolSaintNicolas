import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/Services/Auth/auth.service';
import { UserDetailed } from '../../User/Models/UserDetailed.model';
import { ClassDetailed } from '../Models/ClassDetailed.model';

@Injectable({
  providedIn: 'root'
})
export class ClassService {

classURL: string = 'https://localhost:5001/api/class/';
currentUser: UserDetailed = new UserDetailed();
token: string;


  constructor(
    private _client: HttpClient,
    private _authService: AuthService,
  ) {
    this._authService.user$.subscribe(user => {
      if(user != null)
        this.token = user.token
    })  
   }

  getClassById(id:number): Observable<ClassDetailed>{
    return this._client.get<ClassDetailed>(this.classURL+id, this.HttpOptions(this.token))
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
