import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { DetailsComponent } from './Components/details/details.component';
import { SharedModule } from '../shared/shared.module';









@NgModule({
  declarations: [
    DetailsComponent,
  ],

  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,

  ],
  exports: [DetailsComponent]
})
export class UserModule { }
