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
  classURL: string= 'https://localhost:5001/api/class/'
  noteURL: string = 'https://localhost:5001/api/TrimestrialInfo/';
  // studentList$ : Observable<Student[]>;
  notes : Note[] = [];
  students: Student[]= [];
  noteSubject : Subject<Note[]> = new Subject<Note[]>();
  studentSubject: Subject<Student[]> = new Subject<Student[]>();


  constructor(
    private _client : HttpClient,
  ) { }

  sendNotes(){
    this.noteSubject.next(this.notes.slice());
  }

  sendStudents(){
    this.studentSubject.next(this.students.slice());
  }

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
        this.sendStudents();
      },
      error: error => console.log(error)
    });
  }

  getNotes(studentId : number)
  {
    this._client.get<Note[]>(this.noteURL+"GetbyuserId/"+studentId).subscribe({
      next: data => {
        this.notes = data;
        this.sendNotes();
      },
      error : error => console.log(error)      
    });
  }

  getNoteById(noteId: number): Observable<Note>
  {
    return this._client.get<Note>(this.noteURL+noteId);
  }

  deleteNote(noteId: number, studentId: number):void{

    this._client.delete<number>(this.noteURL+noteId).subscribe({
      next:()=>{this.getNotes(studentId);},
      error:error => console.log(error)
    });

  }

  // getClasses(classId: number): Observable<Class[]>{
  //   return this._client.get(this.classURL+classId);
  // }
  

  
  private HttpOptions(token:string){
    let options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    };
    return options;
  }



}
