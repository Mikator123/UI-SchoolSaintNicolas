import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchoolRoutingModule } from './school-routing.module';
import { SharedModule } from '../shared/shared.module';
import { SchoolRulesComponent } from './Components/school-rules/school-rules.component';
import { LunchComponent } from './Components/lunch/lunch.component';
import { SchoolEventsComponent } from './Components/school-events/school-events.component';
import { LunchWithPersonsComponent } from './Components/lunch/lunch-with-persons/lunch-with-persons.component';
import { LunchIngredientsComponent } from './Components/lunch/lunch-ingredients/lunch-ingredients.component';


@NgModule({
  declarations: [
  SchoolRulesComponent,
  LunchComponent,
  SchoolEventsComponent,
  LunchWithPersonsComponent,
  LunchIngredientsComponent,

],
  imports: [
    CommonModule,
    SchoolRoutingModule,
    SharedModule,

  ],
  exports: [
    SchoolRulesComponent,
    LunchComponent,
    SchoolEventsComponent,

  ]
})
export class SchoolModule { }
