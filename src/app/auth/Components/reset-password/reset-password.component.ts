import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormLogin } from 'src/app/Models/User/FormLogin.model';
import { ResetPwd } from 'src/app/Models/User/ResetPwd.model';
import { AuthService } from 'src/app/Services/Auth/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  form : FormGroup;
  passwordInvalid = false;
  formSubmitAttempt = 0;
  returnUrl:string;
  error:string;

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
      password:[null, Validators.required],
      confirmPassword: [null, [Validators.required]]
    })
  }

  async onSubmit(){
    if (this.checkPassword(this.form))
      {
        let RP = new ResetPwd();
        RP.Id = this._authService.user.id;
        RP.password = this.form.get('password').value;
        RP.lastResetPwd = new Date();
        await this._authService.ResetPwd(RP);
      }
    else
      this.passwordInvalid = true;
      this.error = "Le mot de passe n'a pas été correctement confirmé"; 



  }

  checkPassword(group: FormGroup){
    let pwd = group.get('password').value;
    let confirmPwd = group.get('confirmPassword').value;

    return pwd === confirmPwd ? true: false;
  }



}


