import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../auth/Services/Auth/Auth-guard.service';
import { DetailsComponent } from './Components/details/details.component';
import {UserResolverService} from './Services/Resolvers/user-resolver.service';

const routes: Routes = [
  {path: 'userDetails', resolve : {userDetailed : UserResolverService }, canActivate : [AuthGuardService], component : DetailsComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
