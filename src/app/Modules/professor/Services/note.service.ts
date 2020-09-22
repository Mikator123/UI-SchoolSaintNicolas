import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Note } from '../Models/Note.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class NoteService {


  noteURL: string = 'https://localhost:5001/api/TrimestrialInfo/';
  notes : Note[] = [];
  noteSubject : Subject<Note[]> = new Subject<Note[]>();


  constructor(
    private _client : HttpClient,

  ) {}

  sendNotes(){
    this.noteSubject.next(this.notes.slice());
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

  updateNote(note:Note): void{
    this._client.put<Note>(this.noteURL, note).subscribe({
      next:()=> {this.getNotes(note.userId);},
      error: error => console.log(error)
    })
  }

  createNote(note:Note): void{
    this._client.post<Note>(this.noteURL, note).subscribe({
      next: () => {this.getNotes(note.userId);},
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
