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
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { SchoolModule } from './Modules/school/school.module';
import { FourOFourComponent } from './Components/four-ofour/four-ofour.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SendMailComponent } from './Components/send-mail/send-mail.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    DeleteComponent,
    FourOFourComponent,
    SendMailComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    CommonModule,
    UserModule,
    ProfessorModule,
    SchoolModule,
    SharedModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    BrowserAnimationsModule,
  ],
  providers: [ 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
