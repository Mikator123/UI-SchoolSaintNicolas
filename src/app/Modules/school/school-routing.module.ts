import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../auth/Services/Auth/Auth-guard.service';
import { LunchComponent } from './Components/lunch/lunch.component';
import { SchoolEventsComponent } from './Components/school-events/school-events.component';
import { SchoolRulesComponent } from './Components/school-rules/school-rules.component';


const routes: Routes = [
  {path:'regles', component: SchoolRulesComponent, canActivate : [AuthGuardService] },
  {path:'repas', component: LunchComponent, canActivate : [AuthGuardService]},
  {path:'evenements', component: SchoolEventsComponent, canActivate : [AuthGuardService]},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchoolRoutingModule { }
