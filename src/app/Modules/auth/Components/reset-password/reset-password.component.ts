import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  passwordInvalid = false;
  formSubmitAttempt = 0;
  returnUrl:string;
  error= false;
  errorMsg:string;

  constructor(
    private _builder : FormBuilder,
    private _authService: AuthService,
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
    if (this.checkPassword(this.form))
      {
        let RP = new ResetPwd();
        RP.Id = this._authService.userSubject.value.id;
        RP.password = this.form.get('password').value;
        RP.lastResetPwd = new Date();
        this._authService.ResetPwd(RP)
      }
    else
      this.passwordInvalid = true;
  }

  checkPassword(group: FormGroup){
    let pwd = group.get('password').value;
    let confirmPwd = group.get('confirmPassword').value;
    return pwd === confirmPwd ? true: false;
  }

  
}


