import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../Services/Auth/auth.service';
import { FormLogin } from '../../Models/FormLogin.model';
import {MatProgressButtonOptions} from 'mat-progress-buttons';
import { MatDialog } from '@angular/material/dialog';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form : FormGroup;
  error = false;
  errorMsg: string = null;
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
  passwordHide = true;

  constructor(
    private _builder : FormBuilder,
    private _router: Router,
    private _authService: AuthService,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar,
  ) { }

   ngOnInit() {
    this.initForm();
    }

  private initForm(){
  this.form = this._builder.group({
      login:[null, Validators.required],
      password:[null, Validators.required]
    })
  }

  onSubmit(){
  this.spinnerButtonOptions.active = true;
  let formLogin = new FormLogin();
  formLogin.login = this.form.value['login'];
  formLogin.password = this.form.value['password'];

  this._authService.Login(formLogin).subscribe(

    data => {
        this._router.navigate(['home'])},

    error => {this.getError(error)}

  );}

  getError(error: HttpErrorResponse){
    this.error = true;
    this.errorMsg = "";
    if(error.error.detail == "Login doesnt exist")
      this.errorMsg =  "Le login n'est pas connu.";
    else if (error.error.detail == "Password doesnt match with the current login")
      this.errorMsg = "Le mot de passe ne correspond pas au login.";
    else 
      this.errorMsg = "Serveur déconnecté";
      this.spinnerButtonOptions.active = false;
  }

  openForgotPasswordDialog(){
    let loginFromForm = "";
    if (this.form.value['login'] != null)
      loginFromForm = this.form.value['login']
    let ref = this._dialog.open(ForgotPasswordComponent,{
      width: '400px',
      disableClose:true,
      data: loginFromForm
      
    });
    ref.afterClosed().subscribe(result => {
        if (result == true)
          this._snackBar.open("Mot de passe modifié", null, {duration : 3000})
    });
  }
}
