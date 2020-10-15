import { createComponent } from '@angular/compiler/src/core';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../auth/Services/Auth/Auth-guard.service';
import { AuthService } from '../auth/Services/Auth/auth.service';
import { DetailsComponent } from '../User/Components/details/details.component';
import { UserResolverService } from '../User/Services/Resolvers/user-resolver.service';

import { StudentListComponent } from './Components/student-list/student-list.component';
import { ResultsComponent } from './Components/test-result/results/results/results.component';
import { TestResultComponent } from './Components/test-result/test-result.component';
import { TrimestrialNoteComponent } from './Components/trimestrial-note/trimestrial-note.component';
import { WorkListComponent } from './Components/works/work-list/work-list.component';
import { ResultService } from './Services/result.service';



const routes: Routes = [

  {path: 'Etudiants',canActivate : [AuthGuardService], component : StudentListComponent, children:[
    {path:':id', resolve : {userDetailed : UserResolverService }, component : DetailsComponent },
  ]},
  {path: 'notesTrimestrielle/:studentId', canActivate : [AuthGuardService], component: TrimestrialNoteComponent},
  {path: 'Resultats', canActivate : [AuthGuardService], component: ResultsComponent},
  {path: 'Resultats/:studentId', canActivate : [AuthGuardService], component: TestResultComponent},
  {path: 'Travaux', canActivate : [AuthGuardService], component: WorkListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfessorRoutingModule { }
