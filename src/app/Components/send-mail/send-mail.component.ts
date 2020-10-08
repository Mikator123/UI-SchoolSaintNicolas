import { Type } from '@angular/compiler';
import { stringify } from '@angular/compiler/src/util';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { sendEmailToDialog } from '../nav/nav.component';

@Component({
  selector: 'app-send-mail',
  templateUrl: './send-mail.component.html',
  styleUrls: ['./send-mail.component.scss']
})
export class SendMailComponent implements OnInit {

  form : FormGroup;
  error = false;
  errorTxt: string = "";

  constructor(
    private _builder: FormBuilder,
    public dialogRef: MatDialogRef<SendMailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: sendEmailToDialog,

  ) { }

  ngOnInit(): void {
    this.initForm();
    
  }

  initForm() {
    this.form = this._builder.group({
      emailAdress:[this.data.email, Validators.required],
      emailSubject:['', Validators.required],
      emailContent:['', Validators.required],

    })
  }

  onSubmit(){
    this.error = false;
    this.errorTxt = "";
    if(this.SpacesOnly(this.form.value['emailAdress']) && this.SpacesOnly(this.form.value['emailContent'])){
      //comment faire ?
      let emailAdress : string = this.form.value['emailAdress'];
      let emails = emailAdress.split("; ");
      emails.pop();
      console.log(emails);
      
      this.dialogRef.close(true);
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
