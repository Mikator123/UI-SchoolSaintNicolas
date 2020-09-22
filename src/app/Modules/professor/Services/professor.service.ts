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
  classSubject: Subject<Class> = new Subject<Class>();


  constructor(
    private _client : HttpClient,
  ) { }





  getStudents(classId: number)
  {
    this._client.get<Student[]>(this.userURL+"getByClassId/"+classId).subscribe({
      next: data =>{
        this.students = data;
            this.students.forEach(student => {
      if (student.photo == null)
        student.gender === 'M' ? 
        student.photo = "http://www.haneffebasket.be/wp-content/uploads/2017/04/avatar-vide.jpeg":
        student.photo = "http://www.tmf-operating.com/wp-content/uploads/2015/12/avatar-femme-300x176.jpg";
    });
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

 
  

  
  private HttpOptions(token:string){
    let options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    };
    return options;
  }



}
