import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { FormLogin } from 'src/app/Models/User/FormLogin.model';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { mdiMoonFirstQuarter } from '@mdi/js';
import { first } from 'rxjs/internal/operators/first';
import { HttpErrorResponse } from '@angular/common/http';


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
  errorMsg: string;
  
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
  let formLogin = new FormLogin();
  formLogin.login = this.form.value['login'];
  formLogin.password = this.form.value['password'];
  this._authService.Login(formLogin).subscribe(
    data => {this._authService.user = data;
      if(this._authService.isAuth && this._authService.user.lastResetPwd != null)
        this.router.navigate(['reset-password'])
      else
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
  }
}
