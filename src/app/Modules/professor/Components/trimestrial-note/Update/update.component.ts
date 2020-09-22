import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Note } from '../../../Models/Note.model';
import { Student } from '../../../Models/Student.model';
import { NoteService } from '../../../Services/note.service';
import { ProfessorService } from '../../../Services/professor.service';
import { DialogData } from '../trimestrial-note.component';

interface Trimester{
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  validation = true;
  form : FormGroup;
  error= false;
  errorTxt : string;
  trimester: Trimester[] = [
    {value:1, viewValue:"1er"},
    {value:2, viewValue:"2eme"},
    {value:3, viewValue:"3eme"},
  ]
  selectedTrimeste : number;


  constructor(
    private _builder: FormBuilder,
    private _noteService: NoteService,
    private _profService: ProfessorService,
    public dialogRef: MatDialogRef<UpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit(
  ): void {
    this.selectedTrimeste = this.data.trimester;
    this.initForm();
  }

  initForm() {
    this.form = this._builder.group({
      className: [this.data.className, Validators.required],
      studentId:[this.data.userId, Validators.required],
      trimester:[this.data.trimester, Validators.required],
      description:[this.data.description, Validators.required]
    })
  }


  onSubmit(){
    const updatedNote= new Note();
    updatedNote.id = this.data.id;
    updatedNote.className = this.data.className;
    updatedNote.trimester = this.form.value['trimester'];
    updatedNote.userId = this.data.userId;
    updatedNote.description = this.form.value['description'];
      this._noteService.updateNote(updatedNote);
  }

}
