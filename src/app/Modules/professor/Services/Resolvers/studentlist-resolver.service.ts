import { Injectable } from '@angular/core';
import { Student } from '../../Models/Student.model';
import {ProfessorService} from '../../Services/professor.service';
import {AuthService}from '../../../auth/Services/Auth/auth.service';
import { Observable } from 'rxjs';
import { Resolve } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class StudentlistResolverService implements Resolve<Student[]> {

  constructor(
    private _auth: AuthService,
    private _prof: ProfessorService
  ) { }

  resolve(): Observable<Student[]>
  {
    let Id : number;
    this._auth.user$.subscribe(data => Id =  data.classId)
    return this._prof.getStudents(Id)
  }
}
