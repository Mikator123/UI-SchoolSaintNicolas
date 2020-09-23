import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { ResetPasswordComponent } from './Components/reset-password/reset-password.component';
import { LoginComponent } from './Components/login/login.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    ResetPasswordComponent, 
    LoginComponent
  
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule
    
  ],
  providers: [  


  ],
  exports : [
    ResetPasswordComponent, 
    LoginComponent
  ]
})
export class AuthModule { }
