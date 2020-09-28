import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../Services/Auth/auth.service';
import { FormLogin } from '../../Models/FormLogin.model';
import {MatProgressButtonOptions} from 'mat-progress-buttons';


@Component({
  selector: 'auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form : FormGroup;
  formSubmitAttempt = 0;
  returnUrl:string;
  error = false;
  errorMsg: string = null;
  spinnerButtonOptions: MatProgressButtonOptions = {
    active: false,
    text: "Valider",
    spinnerSize: 19,
    raised: true,
    stroked: false,
    buttonColor: 'primary',
    spinnerColor: 'accent',
    fullWidth: false,
    disabled: false,
    mode: 'indeterminate'}
  passwordHide = true;

  constructor(
    private _builder : FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private _authService: AuthService,
  ) { }

   ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/home';
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
        this.router.navigate(['home'])},

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
}
