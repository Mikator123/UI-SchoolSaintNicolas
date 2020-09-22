import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import {Note} from '../../Models/Note.model';
import { ProfessorService } from '../../Services/professor.service';
import { DeleteComponent } from './delete/delete.component';
import { UpdateComponent } from './update/update.component';
import {NoteService} from '../../Services/note.service';

export interface DialogData {
  id: number,
  className : string,
  userId: number,
  trimester: number,
  description: string
}

@Component({
  selector: 'app-trimestrial-note',
  templateUrl: './trimestrial-note.component.html',
  styleUrls: ['./trimestrial-note.component.scss']
})



export class TrimestrialNoteComponent implements OnInit {

  panelState: false;
  studentId: number;
  notes : Note[];
  myNoteSubscritption: Subscription

  constructor(
    private _profService: ProfessorService,
    private _noteService: NoteService,
    private _routing: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.studentId = this._routing.snapshot.params['id'];
    this._noteService.getNotes(this.studentId);
    this.myNoteSubscritption = this._noteService.noteSubject.subscribe((list : Note[]) => {{this.notes = list}});
    
  }

  openDeleteDialog(noteId: number){
    let actualeNoteId = noteId;
    let ref = this.dialog.open(DeleteComponent, {
      width: '500px',
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
    let ref= this.dialog.open(UpdateComponent, {
      width: '80vw',
      height: '80vh',
      data:{
        id: note.id,
        className : note.className,
        userId: note.userId,
        trimester: note.trimester,
        description: note.description,
      }
    });
    ref.afterClosed().subscribe(result => {
      let validation = result
      if (validation == true)
      {
        //update methode
      }
    })
  }

  



}
