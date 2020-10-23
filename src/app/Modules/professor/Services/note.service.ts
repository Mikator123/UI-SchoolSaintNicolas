import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Note } from '../Models/Note.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../auth/Services/Auth/auth.service';
import { UserSimplified } from '../../auth/Models/UserSimplified.model';



@Injectable({
  providedIn: 'root'
})
export class NoteService {


  noteURL: string = 'https://localhost:5001/api/TrimestrialInfo/';
  notes : Note[] = [];
  noteSubject : Subject<Note[]> = new Subject<Note[]>();
  token: string;


  constructor(
    private _client : HttpClient,
    private _authService: AuthService,

  ) {
    this._authService.user$.subscribe(user => {
      if(user != null)
        this.token = user.token
    })  
  }

  sendNotes(){
    this.noteSubject.next(this.notes);
  }

  getNotes(studentId : number)
  {
    this._client.get<Note[]>(this.noteURL+"GetbyuserId/"+studentId, this.HttpOptions(this.token)).subscribe({
      next: data => {
        this.notes = data;
        this.sendNotes();
      },
      error : error => console.log(error)      
    });
  }

  getNoteById(noteId: number): Observable<Note>
  {
    return this._client.get<Note>(this.noteURL+noteId, this.HttpOptions(this.token));
  }

  deleteNote(noteId: number, studentId: number):void{

    this._client.delete<number>(this.noteURL+noteId, this.HttpOptions(this.token)).subscribe({
      next:()=>{this.getNotes(studentId);},
      error:error => console.log(error)
    });
  }

  updateNote(note:Note): void{
    
    this._client.put<Note>(this.noteURL, note, this.HttpOptions(this.token)).subscribe({
      next:()=> {this.getNotes(note.userId);},
      error: error => console.log(error)
    })
  }

  createNote(note:Note): void{
    this._client.post<Note>(this.noteURL,note, this.HttpOptions(this.token)).subscribe({
      next:()=> {this.getNotes(note.userId);},
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
