import { createComponent } from '@angular/compiler/src/core';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../auth/Services/Auth/Auth-guard.service';

import { StudentListComponent } from './Components/student-list/student-list.component';
import { CreateComponent } from './Components/trimestrial-note/create/create.component';
import { DeleteComponent } from './Components/trimestrial-note/delete/delete.component';
import { TrimestrialNoteComponent } from './Components/trimestrial-note/trimestrial-note.component';
import { UpdateComponent } from './Components/trimestrial-note/update/update.component';



const routes: Routes = [

  {path: 'listeEtudiant',canActivate : [AuthGuardService], component : StudentListComponent},
  {path: 'noteTrimestrielle/:id', canActivate : [AuthGuardService], component: TrimestrialNoteComponent},
  {path: 'noteTrimestrielle/delete/:id', canActivate : [AuthGuardService], component: DeleteComponent},
  {path: 'noteTrimestrielle/update/:id', canActivate : [AuthGuardService], component: UpdateComponent},
  {path: 'noteTrimestrielle/create', canActivate : [AuthGuardService], component: CreateComponent},
  
  
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfessorRoutingModule { }
