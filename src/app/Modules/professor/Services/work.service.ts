import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Work } from '../Models/Work.model';
import { UserDetailed } from '../../User/Models/UserDetailed.model';
import { AuthService } from '../../auth/Services/Auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class WorkService {


  workUrl : string = 'https://localhost:5001/api/WorkingProfileQuestion/';
  workSubject: BehaviorSubject<Work[]> = new BehaviorSubject(null)
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

  get works$(){
    return this.workSubject.asObservable();
  }

  GetWorks(){
    this._client.get<Work[]>(this.workUrl, this.HttpOptions(this.token)).subscribe({
      next: data => {
        this.workSubject.next(data);
      },
      error: error => console.log(error)
    })
  }

  GetWorkbyId(){

  }

  UpdateWork(work: Work){
    this._client.put<Work>(this.workUrl, work, this.HttpOptions( this.token)).subscribe({
      next: () => {this.GetWorks()},
      error: error => console.log(error)
    });
  }

  CreateWork(work: Work){
    this._client.post<Work>(this.workUrl, work, this.HttpOptions( this.token)).subscribe({
      next:()=> {this.GetWorks()},
      error: error => console.log(error)
    })
  }

  DeleteWork(workId: number){
    this._client.delete<Work>(this.workUrl+workId, this.HttpOptions( this.token)).subscribe({
      next: () => {this.GetWorks()},
      error: error => console.log(error)
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




