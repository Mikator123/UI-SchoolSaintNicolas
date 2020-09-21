import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import {Note} from '../../Models/Note.model';
import { ProfessorService } from '../../Services/professor.service';
import { DeleteComponent } from './delete/delete.component';

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
    private _routing: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.studentId = this._routing.snapshot.params['id'];
    this._profService.getNotes(this.studentId);
    this.myNoteSubscritption = this._profService.noteSubject.subscribe((list : Note[]) => {{this.notes = list}});
    
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
        this._profService.deleteNote(actualeNoteId, this.studentId);
      }
    })
    
  }



}
