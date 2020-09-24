import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import {  Subscription } from 'rxjs';
import {Note} from '../../Models/Note.model';
import { ProfessorService } from '../../Services/professor.service';
import { DeleteComponent } from '../../../../Components/confirmBox/Delete/delete.component';

import {NoteService} from '../../Services/note.service';
import { CreateNoteComponent } from './Create-note/create.component';
import { AuthService } from 'src/app/Modules/auth/Services/Auth/auth.service';
import { Class } from '../../Models/Class.model';
import { UpdateNoteComponent } from './Update-note/update.component';

export interface UpdateDialogData {
  id: number,
  className : string,
  userId: number,
  trimester: number,
  description: string
}

export interface CreateDialogData {
  className : string,
  userId: number
}

@Component({
  selector: 'app-trimestrial-note',
  templateUrl: './trimestrial-note.component.html',
  styleUrls: ['./trimestrial-note.component.scss']
})



export class TrimestrialNoteComponent implements OnInit {

  panelState: false;
  classId: number;
  studentId: number;
  notes : Note[];
  myNoteSubscritption: Subscription;
  class : Class;

  constructor(
    private _authService: AuthService,
    private _profService : ProfessorService,
    private _noteService: NoteService,
    private _routing: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.studentId = this._routing.snapshot.params['studentId'];
    this._authService.user$.subscribe(data => this.classId = data.classId)
    this._noteService.getNotes(this.studentId);
    this.myNoteSubscritption = this._noteService.noteSubject.subscribe((list : Note[]) => {this.notes = list});
    this._profService.getClassById(this.classId);
    this._profService.classSubject.subscribe((data: Class) => { this.class = data})
    
  }

  openDeleteDialog(noteId: number){
    let actualeNoteId = noteId;
    let ref = this.dialog.open(DeleteComponent, {
      width: '500px',
      disableClose: true,
    });

    ref.afterClosed().subscribe(result => {
      let validation = result
      if (validation == true)
      {
        this._noteService.deleteNote(actualeNoteId, this.studentId);
      }
    })
    
  }

  openUpdateDialog(note: Note){
    let ref= this.dialog.open(UpdateNoteComponent, {
      width: '80vw',
      height: '80vh',
      data:{
        id: note.id,
        className : note.className,
        userId: note.userId,
        trimester: note.trimester,
        description: note.description,
      },
      disableClose:true,
    });
  }

  openCreateDialog(studentId: number){
  this.dialog.open(CreateNoteComponent, {
    width: '80vw',
    height: '80vh',
    data:{
      userId: studentId,
      className: this.class.name
      },
    disableClose:true,
    });
  }

  



}
