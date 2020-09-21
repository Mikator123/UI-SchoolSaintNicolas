import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentListComponent } from './Components/student-list/student-list.component';
import { DeleteComponent } from './Components/trimestrial-note/delete/delete.component';
import { TrimestrialNoteComponent } from './Components/trimestrial-note/trimestrial-note.component';



const routes: Routes = [

  {path: 'listeEtudiant', component : StudentListComponent},
  {path: 'noteTrimestrielle/:id', component: TrimestrialNoteComponent},
  {path: 'noteTrimestrielle/delete/:id', component: DeleteComponent},
  {path: 'noteTrimestrielle/update/:id', component: DeleteComponent},
  {path: 'noteTrimestrielle/create', component: DeleteComponent},
  
  
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfessorRoutingModule { }
