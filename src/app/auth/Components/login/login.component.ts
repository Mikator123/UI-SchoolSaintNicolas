import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { FormLogin } from 'src/app/Models/User/FormLogin.model';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form : FormGroup;
  loginInvalid = false;
  passwordInvalid = false;
  formSubmitAttempt = 0;
  returnUrl:string;
  error:string;
  passwordHide = true;

  constructor(
    private _builder : FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private _authService: AuthService,
  ) { }

 


  async ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/home';
    this.initForm();
    }


  

  private initForm(){
    this.form = this._builder.group({
      login:[null, Validators.required],
      password:[null, Validators.required]
    })
  }

  async onSubmit(){

    if (this.form.valid)
    {
      try{
        let formLogin = new FormLogin();
        formLogin.login = this.form.value['login'],
        formLogin.password = this.form.value['password'],
        await this._authService.Login(formLogin);
        if(this._authService.isAuth && this._authService.user.lastResetPwd != null)
          await this.router.navigate(['reset-password'])
        else
          await this.router.navigate(['home'])


      }
      catch{
        if (this._authService.error.search('login'))
          this.loginInvalid = true;
          
        if (this._authService.error.search('password'))
          this.passwordInvalid = true;
      }
    }
    else
      this.formSubmitAttempt = this.formSubmitAttempt + 1;

  }



}
