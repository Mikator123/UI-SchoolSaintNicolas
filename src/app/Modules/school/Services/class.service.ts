import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClassDetailed } from '../Models/ClassDetailed.model';

@Injectable({
  providedIn: 'root'
})
export class ClassService {

classURL: string = 'https://localhost:5001/api/class/';

  constructor(
    private _client: HttpClient
  ) { }

  getClassById(id:number): Observable<ClassDetailed>{
    return this._client.get<ClassDetailed>(this.classURL+id)
  }
}
