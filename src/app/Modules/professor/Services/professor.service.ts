import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Student } from '../Models/Student.model';
import { Note } from '../Models/Note.model';
import { Class } from '../Models/Class.model';

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {


  userURL: string = 'https://localhost:5001/api/user/';
  classURL: string= 'https://localhost:5001/api/class/';
  students: Student[]= [];
  studentSubject: Subject<Student[]> = new Subject<Student[]>();
  class = new Class();
  classes : Class []= [];
  classSubject: Subject<Class> = new Subject<Class>();


  constructor(
    private _client : HttpClient,
  ) { }

  get Student$() {return this.students};
  get classes$() {return this.classes};
  
    

  getStudents(classId: number)
  {
    this._client.get<Student[]>(this.userURL+"getByClassId/"+classId).subscribe({
      next: data =>{
        this.students = data;
      this.studentSubject.next(this.students.slice());
      },
      error: error => console.log(error)
    });
  }

  

  getClassById(classId:number)
  {
    this._client.get<Class>(this.classURL+classId).subscribe({
      next: data => {
        this.class = data;
        this.classSubject.next(this.class);
      },
      error: error => console.log(error)
    });
  }

  getClasses()
  {
    this._client.get<Class[]>(this.classURL).subscribe({
      next: data => {
        this.classes = data;
      }
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
