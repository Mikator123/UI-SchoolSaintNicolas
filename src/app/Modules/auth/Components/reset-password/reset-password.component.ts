import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetPwd } from '../../Models/ResetPwd.model';
import { AuthService } from '../../Services/Auth/auth.service';

@Component({
  selector: 'auth-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  form : FormGroup;
  returnUrl:string;
  error = false;
  errorMsg:string;

  constructor(
    private _builder : FormBuilder,
    private _authService: AuthService,
    public dialogRef: MatDialogRef<ResetPasswordComponent>,
  ) { }

 


  ngOnInit() {
    this.initForm();
    }


  

  private initForm(){
    this.form = this._builder.group({
      password:[null, Validators.required],
      confirmPassword: [null, [Validators.required]]
    })
  }

  onSubmit(){
    this.error = false;
    this.errorMsg = null;
    if (this.checkPassword(this.form.get('password').value, this.form.get('confirmPassword').value) && this.SpacesOnly(this.form.get('password').value))
      {
        let RP = new ResetPwd();
        RP.Id = this._authService.userSubject.value.id;
        RP.password = this.form.get('password').value;
        RP.lastResetPwd = new Date();
        this._authService.ResetPwd(RP)
        this.dialogRef.close(true);
      }
    else
      this.error = true;
      if (!this.checkPassword(this.form.get('password').value, this.form.get('confirmPassword').value))
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
}


