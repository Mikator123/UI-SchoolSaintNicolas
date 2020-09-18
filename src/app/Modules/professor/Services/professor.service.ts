import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../Models/Student.model';

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {


  mainURL: string = 'https://localhost:5001/api/user/';
  Student: Student[] = []
  
  constructor(
    private _client : HttpClient,
  ) { }

  getStudents(classId: number): Observable<Student[]>
  {
    return this._client.get<Student[]>(this.mainURL+"getByClassId/"+classId);
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
