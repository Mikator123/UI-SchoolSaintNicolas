import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Category } from '../../../Models/Category.model';
import { Work } from '../../../Models/Work.model';
import { ResultService } from '../../../Services/result.service';
import { UploadFileService } from '../../../Services/upload-file.service';
import { WorkService } from '../../../Services/work.service';

@Component({
  selector: 'app-create-work',
  templateUrl: './create-work.component.html',
  styleUrls: ['./create-work.component.scss']
})
export class CreateWorkComponent implements OnInit {
  @ViewChild('fileUpload', {static: false}) fileUpload: ElementRef;
  files = []; // au cas où il faut uploader plusieurs fichiers.
  FileLink : string;

  @ViewChild('progressBar', {static:false}) progressBar: MatProgressBar;

  form : FormGroup;
  error= false;
  errorTxt : string;
  categories: Category[] = [];
  trimesters: number[]= [ 1,2,3 ];
  schoolYears: number[]= [ 1,2,3,4,5,6 ];
  slideColor: ThemePalette = 'primary';
  slideCheck = false;
  slideCheckDocument = false;

  progressColor= "accent";
  progressUploaded = true;
  LoadButton = "file_upload";
  FileDataName = "";

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
    private _workService: WorkService,
    private _builder: FormBuilder,
    private _resultService: ResultService,
    public dialogRef: MatDialogRef<CreateWorkComponent>,
    private _uploadFile: UploadFileService,

  ) { }

  ngOnInit(): void {
    this.initForm();
    this._resultService.getCategories().subscribe(data => {
      this.categories = data
    })

  }

  initForm() {
    this.form = this._builder.group({

      subject:['', [Validators.required, Validators.maxLength(30)]],
      question:['', Validators.required],
      correction:['', Validators.required],
      explanation:['', Validators.required],
      firstHint:['', Validators.required],
      secondHint:[''],
      categoryId:['', Validators.required],
      schoolYear:['', Validators.required],
      trimester:['', Validators.required],
      schoolYearCategoryId:[3, Validators.required],
    })
  }

  onSubmit(){
    if (this.SpacesOnly(this.form.value['subject']) 
      || this.SpacesOnly(this.form.value['question']) 
      || this.SpacesOnly(this.form.value['correction'])
      || this.SpacesOnly(this.form.value['explanation'])
      || this.SpacesOnly(this.form.value['firstHint'])
      || this.SpacesOnly(this.form.value['secondHint']) ){
      const work = new Work();
      work.subject = this.form.value['subject'];
      work.question = this.form.value['question'];
      work.correction = this.form.value['correction'];
      work.explanation = this.form.value['explanation'];
      work.firstHint = this.form.value['firstHint'];
      work.secondHint = this.slideCheck == true ? this.form.value['secondHint'] : null;
      work.categoryId = this.form.value['categoryId'];
      work.schoolYear = this.form.value['schoolYear'];
      work.trimester = this.form.value['trimester'];
      work.schoolYearCategoryId = this.form.value['schoolYearCategoryId'];
      this._workService.CreateWork(work);
      this.dialogRef.close(true)
    }
    else{
      this.error = true;
      this.errorTxt = "Les champs ne peuvent pas être rempli d'espaces."
    }
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
