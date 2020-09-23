import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/home/home.component';
import {AuthModule} from './Modules/auth/auth.module'
import { CommonModule } from '@angular/common';
import {UserModule} from './Modules/User/user.module';
import {NavComponent} from './Components/nav/nav.component';
import {ProfessorModule} from './Modules/professor/professor.module';
import { DeleteComponent } from './Components/confirmBox/Delete/delete.component';
import { SharedModule } from './Modules/shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    DeleteComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    CommonModule,
    UserModule,
    ProfessorModule,
    SharedModule,
  ],
  providers: [   

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
