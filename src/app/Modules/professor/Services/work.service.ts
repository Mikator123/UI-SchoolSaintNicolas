import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Work } from '../Models/Work.model';


@Injectable({
  providedIn: 'root'
})
export class WorkService {


  workUrl : string = 'https://localhost:5001/api/WorkingProfileQuestion/';
  workSubject: BehaviorSubject<Work[]> = new BehaviorSubject(null)

  constructor(
    private _client: HttpClient,
  ) { }

  get works$(){
    return this.workSubject.asObservable();
  }

  GetWorks(){
    this._client.get<Work[]>(this.workUrl).subscribe({
      next: data => {
        this.workSubject.next(data);
      },
      error: error => console.log(error)
    })
  }

  GetWorkbyId(){

  }

  UpdateWork(work: Work){
    this._client.put<Work>(this.workUrl, work).subscribe({
      next: () => {this.GetWorks()},
      error: error => console.log(error)
    });
  }

  CreateWork(work: Work){
    this._client.post<Work>(this.workUrl, work).subscribe({
      next:()=> {this.GetWorks()},
      error: error => console.log(error)
    })
  }

  DeleteWork(workId: number){
    this._client.delete<Work>(this.workUrl+workId).subscribe({
      next: () => {this.GetWorks()},
      error: error => console.log(error)
    })
  }
}




