import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { AuthGuardService } from './Modules/auth/Services/Auth/Auth-guard.service';


const routes: Routes = [
  
  {path: '', redirectTo:'/home', pathMatch:'full'},
  {path: 'home', canActivate : [AuthGuardService], component : HomeComponent},
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
