import {Category} from '../../../Models/Category.model';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {UpdateDialogData} from '../test-result.component';
import { ResultService } from '../../../Services/result.service';
import { TestResult } from '../../../Models/testResult.model';
import { MatDatepicker } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { ProfessorService } from '../../../Services/professor.service';




@Component({
  selector: 'app-update-result',
  templateUrl: './update-result.component.html',
  styleUrls: ['./update-result.component.scss'],


})
export class UpdateResultComponent implements OnInit {
  @ViewChild(MatDatepicker, {static: true}) calendar: MatDatepicker<any>

  form : FormGroup;
  error= false;
  errorTxt : string;
  categories: Category[] = [];
  selectedCategory : Category = new Category();


  constructor(
    private _builder: FormBuilder,
    private _resultService: ResultService,
    public dialogRef: MatDialogRef<UpdateResultComponent>,
    private _dateAdapter: DateAdapter<any>,
    private _profService: ProfessorService,
    @Inject(MAT_DIALOG_DATA) public data: UpdateDialogData
  ) { }

  ngOnInit(
  ): void {
    this.initForm();
    this._resultService.getCategories().subscribe(data => this.categories = data);
    this.getCurrentCategory(this.data.categoryId);
    this._dateAdapter.setLocale('fr');
    
  }

  initForm() {
    this.form = this._builder.group({
      studentId:[this.data.studentId],
      result:[this.data.result, [Validators.required, Validators.min(0), Validators.max(20)]],
      date:[this.data.date, Validators.required],
      category:[this.data.categoryId, Validators.required],
      description:[this.data.description, Validators.required],
      
    })
  }


  onSubmit(){
    if (this.SpacesOnly(this.form.value['description'])){
      
      let updatedResult= new TestResult();
      updatedResult.id = this.data.id;
      updatedResult.categoryId= this.form.value['category'];
      updatedResult.classId = this.data.classId;
      updatedResult.date = this.checkDates()
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

  getCurrentCategory(Id:number){
    this.categories.forEach(cat => {
      if(cat.id == Id)
        this.selectedCategory = cat
    });
    return null; 
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

  checkDates(): Date{
    let oldDate = new Date(this.data.date);
    let newDate = new Date(this.form.value['date']);
    let returnDate: Date;
    if (oldDate != newDate)
    {
      newDate.setDate(newDate.getDate()+1);
      returnDate = newDate;
    }
    else{
      returnDate = oldDate;
    }
    return returnDate;
  }

  
  SpacesOnly(prop:string): Boolean{
    return prop.match(/^ *$/) !== null ? false : true;
  }
}
