import {Category} from '../../../Models/Category.model';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {UpdateDialogData} from '../test-result.component';
import { ResultService } from '../../../Services/result.service';
import { TestResult } from '../../../Models/testResult.model';
import { MatDatepicker } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { ProfessorService } from '../../../Services/professor.service';
import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { UploadFileService } from '../../../Services/upload-file.service';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';




@Component({
  selector: 'app-update-result',
  templateUrl: './update-result.component.html',
  styleUrls: ['./update-result.component.scss'],


})
export class UpdateResultComponent implements OnInit {
  @ViewChild('fileUpload', {static: false}) fileUpload: ElementRef;
  files = []; // au cas où il faut uploader plusieurs fichiers.
  FileLink : string;


  form : FormGroup;
  error= false;
  errorTxt : string;
  categories: Category[] = [];
  selectedCategory : Category = new Category();
  progressColor= "accent";
  progressUploaded = true;
  LoadButton = "file_upload";


  constructor(
    private _builder: FormBuilder,
    private _resultService: ResultService,
    public dialogRef: MatDialogRef<UpdateResultComponent>,
    private _dateAdapter: DateAdapter<any>,
    private _profService: ProfessorService,
    private _uploadFile: UploadFileService,

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
      document:['']
      
      
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
      // updatedResult.document =  
      this._resultService.update(updatedResult);
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

  uploadFile(file: any): void {
    const formData = new FormData();
    formData.append('file', file.data);
    file.inProgress = true;
    // if (formData == null) return;
    this._uploadFile
      .upload(formData)
      .pipe(
        map((event) => {
          switch (event.type) {
            case HttpEventType.UploadProgress:
              file.progress = Math.round((event.loaded * 100) / event.total);
              if (event.loaded == event.total)
                this.progressColor = "primary";
                this.progressUploaded = false;
                this.LoadButton = "done_outline"
              break;
            case HttpEventType.Response:
              return event;
          }
        }),
        catchError((error: HttpErrorResponse) => {
          file.inProgress = false;
          this.error = true;
          this.errorTxt = `${file.data.name} n'a pas pu être enregistré.`
          return of(`${file.data.name} n'a pas pu être enregistré.`);
        })
      )
      .subscribe((event: any) => {
        if (typeof event === 'object') {
          this.FileLink = event.body.link;
        }
      });
  }
  private uploadFiles(): void {
    this.fileUpload.nativeElement.value = '';
    this.files.forEach((file) => {
      this.uploadFile(file);
    });
  }
  onUploadClick(): void {
    const fileUpload = this.fileUpload.nativeElement;
    fileUpload.onchange = () => {
      for (let index = 0; index < fileUpload.files.length; index++) {
        const file = fileUpload.files[index];
        this.files.push({ data: file, inProgress: false, progress: 0 });
      }
      this.uploadFiles();
    };
    fileUpload.click();
  }
}
