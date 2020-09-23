import {Category} from '../../../Models/Category.model';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Note } from '../../../Models/Note.model';
import { Student } from '../../../Models/Student.model';
import { NoteService } from '../../../Services/note.service';
import { ProfessorService } from '../../../Services/professor.service';
import {UpdateDialogData} from '../test-result.component';
import { ResultService } from '../../../Services/result.service';
import { TestResult } from '../../../Models/testResult.model';



@Component({
  selector: 'app-update-result',
  templateUrl: './update-result.component.html',
  styleUrls: ['./update-result.component.scss']
})
export class UpdateResultComponent implements OnInit {

  form : FormGroup;
  error= false;
  errorTxt : string;
  categories: Category[] = []
  selectedCategory : Category;


  constructor(
    private _builder: FormBuilder,
    private _resultService: ResultService,
    private _profService: ProfessorService,
    public dialogRef: MatDialogRef<UpdateResultComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UpdateDialogData
  ) { }

  ngOnInit(
  ): void {
    this.selectedCategory;
    this.initForm();
  }

  initForm() {
    this.form = this._builder.group({
      result:[this.data.result, [Validators.required, Validators.min(0), Validators.max(20)]],
      date:[this.data.date, Validators.required],
      category:[this.data.categoryId, Validators.required],
      description:[this.data.description, Validators.required]
    })
  }


  onSubmit(){
    if (this.SpacesOnly(this.form.value['description'])){
      
      const updatedResult= new TestResult();
      updatedResult.id = this.data.id;
      updatedResult.categoryId= this.form.value['category'];
      updatedResult.classId = this.data.classId;
      updatedResult.date = this.form.value['date'];
      updatedResult.description = this.form.value['description'];
      updatedResult.result = this.form.value['result'];
      updatedResult.studentId = this.data.studentId;
      this._resultService.update(updatedResult);
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
