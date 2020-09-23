import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Note } from '../../../Models/Note.model';
import { NoteService } from '../../../Services/note.service';
import { ProfessorService } from '../../../Services/professor.service';
import { CreateDialogData } from '../trimestrial-note.component';

interface Trimester{
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

 
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
    public dialogRef: MatDialogRef<CreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CreateDialogData
  ) { }

  ngOnInit(
    ): void {
      this.initForm();
    }
  
    initForm() {
      this.form = this._builder.group({
        trimester:['', Validators.required],
        description:['', Validators.required]
      })
    }

    onSubmit(){
      if (this.SpacesOnly(this.form.value['description'])){
        let newNote= new Note();
        newNote.className = this.data.className;
        newNote.trimester = this.form.value['trimester'];
        newNote.userId = parseInt(this.data.userId.toString());
        newNote.description = this.form.value['description'];
        this._noteService.createNote(newNote);
        this._noteService.getNotes(this.data.userId);
        this.dialogRef.close();
      }
      else{
        this.error = true;
        this.errorTxt = "Les champs ne peuvent pas être rempli d'espaces."
      }
      
    }
  
    SpacesOnly(prop:string): Boolean{
      return prop.match(/^ *$/) !== null ? false : true;
    }

}
