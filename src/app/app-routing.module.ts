import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FourOFourComponent } from './Components/four-ofour/four-ofour.component';
import { HomeComponent } from './Components/home/home.component';
import { AuthGuardService } from './Modules/auth/Services/Auth/Auth-guard.service';


const routes: Routes = [
  
  {path: '', redirectTo:'/home', pathMatch:'full'},
  {path: 'home', canActivate : [AuthGuardService], component : HomeComponent},
  { path: 'school', loadChildren: () => import('./Modules/school/school.module').then(m => m.SchoolModule), canActivate : [AuthGuardService] },
  { path: 'professor', loadChildren:()=> import ('./Modules/professor/professor.module').then(m => m.ProfessorModule), canActivate : [AuthGuardService]},
  { path: 'user', loadChildren:() => import ('./Modules/User/user.module').then(m => m.UserModule), canActivate : [AuthGuardService]},
  {path:'auth', loadChildren:() => import ('./Modules/auth/auth.module').then(m => m.AuthModule), canActivate : [AuthGuardService]},
  // {path:'notFound',canActivate : [AuthGuardService], component : FourOFourComponent},
  // {path:'**', redirectTo:'/notFound'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
