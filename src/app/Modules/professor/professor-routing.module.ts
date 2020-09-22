import { createComponent } from '@angular/compiler/src/core';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../auth/Services/Auth/Auth-guard.service';

import { StudentListComponent } from './Components/student-list/student-list.component';
import { TestResultComponent } from './Components/test-result/test-result.component';
import { TrimestrialNoteComponent } from './Components/trimestrial-note/trimestrial-note.component';



const routes: Routes = [

  {path: 'listeEtudiant',canActivate : [AuthGuardService], component : StudentListComponent},
  {path: 'notesTrimestrielle/:studentId', canActivate : [AuthGuardService], component: TrimestrialNoteComponent},
  {path: 'testResult/:studentId', canActivate : [AuthGuardService], component: TestResultComponent}
  // {path: 'testResult/:testId',canActivate : [AuthGuardService], component:}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfessorRoutingModule { }