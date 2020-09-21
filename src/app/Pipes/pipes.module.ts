import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BirthdatePipe} from '../Pipes/birthdate.pipe';



@NgModule({
  declarations: [
    BirthdatePipe
  ],
  imports: [
    CommonModule
  ],
  exports:[
    BirthdatePipe
  ]
})
export class PipesModule { }
