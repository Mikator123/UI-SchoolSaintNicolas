import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { mdiTruckDelivery } from '@mdi/js';
import { catchError, map } from 'rxjs/operators';
import { Category } from '../../../Models/Category.model';
import { TestResult } from '../../../Models/testResult.model';
import { ProfessorService } from '../../../Services/professor.service';
import { ResultService } from '../../../Services/result.service';
import {CreateDialogData} from '../test-result.component';
import {UploadFileService } from '../../../Services/upload-file.service';
import { of } from 'rxjs';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { MatProgressBar } from '@angular/material/progress-bar';

@Component({
  selector: 'app-create-result',
  templateUrl: './create-result.component.html',
  styleUrls: ['./create-result.component.scss']
})
export class CreateResultComponent implements OnInit {
  @ViewChild('fileUpload', {static: false}) fileUpload: ElementRef;
  files = []; // au cas où il faut uploader plusieurs fichiers.
  FileLink : string;

  @ViewChild('progressBar', {static:false}) progressBar: MatProgressBar;

  form : FormGroup;
  error= false;
  errorTxt : string;
  categories: Category[] = [];
  selectedCategory : Category = new Category();
  today = new Date();
  progressColor= "accent";
  progressUploaded = true;
  LoadButton = "file_upload";
  FileDataName = "";


  //spinner button
  spinnerButtonOptions: MatProgressButtonOptions = {
    active: false,
    text: "Charger",
    spinnerSize: 19,
    raised: true,
    stroked: false,
    buttonColor: 'primary',
    spinnerColor: 'primary',
    fullWidth: false,
    disabled: false,
    mode: 'indeterminate'}


  constructor(
    private _builder: FormBuilder,
    private _resultService: ResultService,
    public dialogRef: MatDialogRef<CreateResultComponent>,
    private _dateAdapter: DateAdapter<any>,
    private _profService: ProfessorService,
    private _uploadFile: UploadFileService,
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
      date:['', Validators.required],
      category:['', Validators.required],
      description:['', Validators.required],
      document:['', Validators.required],
      
    })
  }


  onSubmit(){
    if (this.SpacesOnly(this.form.value['description'])){
      let createdResult= new TestResult();
      createdResult.categoryId= this.form.value['category'];
      createdResult.classId = this.data.classId;
      let formDate = new Date(this.form.value['date']);
      formDate.setDate(formDate.getDate()+1);
      createdResult.date = formDate;
      createdResult.description = this.form.value['description'];
      createdResult.result = this.form.value['result'];
      createdResult.studentId = parseInt(this.data.studentId.toString());
      createdResult.document = this.FileLink;
      this._resultService.create(createdResult);
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
                this.LoadButton = "done_outline";
                this.FileDataName = file.data.name;
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
