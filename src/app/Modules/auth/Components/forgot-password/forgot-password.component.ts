import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { LoginComponent } from '../login/login.component';
import {UserVerification} from '../../Models/UserVerification.model';
import { verifyHostBindings } from '@angular/compiler';
import { AuthService } from '../../Services/Auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ResetPwd } from '../../Models/ResetPwd.model';

export interface loginDialog{
  login:string;
}

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})



export class ForgotPasswordComponent implements OnInit {

  firstForm : FormGroup;
  secondForm: FormGroup;
  userId : number = null;
  error = false;
  errorMsg:string;
  firstFormValidation = false;

  spinnerButtonOptions: MatProgressButtonOptions = {
    active: false,
    text: "Valider",
    spinnerSize: 19,
    raised: true,
    stroked: false,
    buttonColor: 'primary',
    spinnerColor: 'primary',
    fullWidth: false,
    disabled: false,
    mode: 'indeterminate'}

  constructor(
    private _builder : FormBuilder,
    private _authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: string,
    public dialogRef: MatDialogRef<LoginComponent>,
  ) { }

  ngOnInit(): void {
    this.initFirstForm();
    this.initSecondForm();
  }

  initFirstForm(){
    this.firstForm = this._builder.group({
      login:[null, Validators.required],
      userNationalNumber:[null, Validators.required],
      contactNationalNumber:[null, Validators.required],
    })
  }

  initSecondForm(){
    this.secondForm = this._builder.group({
      password:[null, Validators.required],
      confirmPassword: [null, [Validators.required]]
    })
  }

  onFirstSubmit(){
    this.error = false;
    this.errorMsg = null;
    this.spinnerButtonOptions.active = true;
    let verification = new UserVerification();
    verification.login = this.firstForm.value['login'];
    verification.userNationalNumber = this.firstForm.value['userNationalNumber'];
    verification.contactNationalNumber = this.firstForm.value['contactNationalNumber'];
    this._authService.VerifyUser(verification).subscribe(
      data => {this.userId = data, this.firstFormValidation = true},
  
      error => {this.getError(error)}
  
    );}

  onSecondSubmit(){
    this.error = false;
    this.errorMsg = null;
    if (this.checkPassword(this.secondForm.get('password').value, this.secondForm.get('confirmPassword').value) && this.SpacesOnly(this.secondForm.get('password').value))
      {
        let RP = new ResetPwd();
        RP.Id = this.userId;
        RP.password = this.secondForm.get('password').value;
        RP.lastResetPwd = new Date();
        this._authService.ResetPwd(RP)
        this.dialogRef.close(true);
      }
    else
      this.error = true;
      if (!this.checkPassword(this.secondForm.get('password').value, this.secondForm.get('confirmPassword').value))
        this.errorMsg = "Le mot de passe doit correspondre à la confirmation";
      else 
        this.errorMsg = "Le mot de passe ne peut pas être rempli d'espaces.";
        
        
  }

  checkPassword(value1:string, value2:string){
    return value1 === value2 ? true: false;
  }

  SpacesOnly(prop:string): Boolean{
    return prop.match(/^ *$/) !== null ? false : true;
  }

  getError(error: HttpErrorResponse){
      this.error = true;
      this.errorMsg = "";
      if(error.error.detail == "LoginNotFound")
        this.errorMsg =  "Le login n'est pas connu.";
      else if (error.error.detail == "userNN does not match")
        this.errorMsg = "Votre numéro nationnal n'est pas connu.";
      else if (error.error.detail == "contactNN does not match")
        this.errorMsg = "Le numéro nationnal d'un de vos contacts n'est pas connu.";
      else 
        this.errorMsg = "Serveur déconnecté";
        this.spinnerButtonOptions.active = false;
  }
}


