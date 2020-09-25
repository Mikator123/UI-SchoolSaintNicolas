import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { mdiTruckDelivery } from '@mdi/js';
import { Category } from '../../../Models/Category.model';
import { TestResult } from '../../../Models/testResult.model';
import { ProfessorService } from '../../../Services/professor.service';
import { ResultService } from '../../../Services/result.service';
import {CreateDialogData} from '../test-result.component';

@Component({
  selector: 'app-create-result',
  templateUrl: './create-result.component.html',
  styleUrls: ['./create-result.component.scss']
})
export class CreateResultComponent implements OnInit {

  form : FormGroup;
  error= false;
  errorTxt : string;
  categories: Category[] = [];
  selectedCategory : Category = new Category();
  today = new Date();


  constructor(
    private _builder: FormBuilder,
    private _resultService: ResultService,
    public dialogRef: MatDialogRef<CreateResultComponent>,
    private _dateAdapter: DateAdapter<any>,
    private _profService: ProfessorService,
    @Inject(MAT_DIALOG_DATA) public data: CreateDialogData
  ) { }

  ngOnInit(
  ): void {
    this.initForm();
    this._resultService.getCategories().subscribe(data => this.categories = data);
    this._dateAdapter.setLocale('fr');
    
  }

  initForm() {
    this.form = this._builder.group({
      
      result:['', [Validators.required, Validators.min(0), Validators.max(20)]],
      date:[this.today, Validators.required],
      category:['', Validators.required],
      description:['', Validators.required],
      
    })
  }


  onSubmit(){
    if (this.SpacesOnly(this.form.value['description'])){
      let updatedResult= new TestResult();
      updatedResult.categoryId= this.form.value['category'];
      updatedResult.classId = this.data.classId;
      updatedResult.date = this.form.value['date'];
      updatedResult.description = this.form.value['description'];
      updatedResult.result = this.form.value['result'];
      updatedResult.studentId = parseInt(this.data.studentId.toString());
      this._resultService.create(updatedResult);
      this.dialogRef.close(true);
    }
    else{
      this.error = true;
      this.errorTxt = "Les champs ne peuvent pas être rempli d'espaces."
    }
  }

  get forms() { return this.form.controls; }

  getResultValidatorError(): string {
    // this.form.controls[''].hasError('')
    if (this.forms.result.hasError('min'))
      return "Le résultat ne peut pas être inférieur à 0."
    if (this.forms.result.hasError('max'))
      return "Le résultat ne peut pas être supérieur à 20."
    if (this.forms.result.hasError('required'))
      return "Le résultat est obligatoire."
  }

  getStudentName(Id:number):string{
    let studentName = "";
    this._profService.Student$.forEach(student => {
      if(student.id == Id)
        studentName = student.lastName + " " + student.firstName;
    })
    return studentName;
  }

  getClassName(Id:number):string{
    let className = "";
    this._profService.classes$.forEach(c => {
      if(c.id == Id)
        className = c.name;
    })
    return className;
  }

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    return day !== 0 && day !== 6;
  }
  
  SpacesOnly(prop:string): Boolean{
    return prop.match(/^ *$/) !== null ? false : true;
  }

}
