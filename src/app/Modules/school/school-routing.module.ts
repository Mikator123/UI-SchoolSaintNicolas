import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LunchComponent } from './Components/lunch/lunch.component';
import { SchoolEventsComponent } from './Components/school-events/school-events.component';
import { SchoolRulesComponent } from './Components/school-rules/school-rules.component';


const routes: Routes = [
  {path:'regles', component: SchoolRulesComponent },
  {path:'repas', component: LunchComponent},
  {path:'evenements', component: SchoolEventsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchoolRoutingModule { }
