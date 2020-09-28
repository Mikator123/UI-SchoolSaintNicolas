import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { DashComponent } from './dash/dash.component';
import { AuthGuardService } from './Modules/auth/Services/Auth/Auth-guard.service';


const routes: Routes = [
  
  {path: '', redirectTo:'/home', pathMatch:'full'},
  {path: 'home', canActivate : [AuthGuardService], component : HomeComponent},
  {path: 'dash', component: DashComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
