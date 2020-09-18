import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentListComponent } from './Components/student-list/student-list.component';
import {StudentlistResolverService} from './Services/Resolvers/studentlist-resolver.service';

const routes: Routes = [
  {path: 'students', resolve : {studentList : StudentlistResolverService} ,component : StudentListComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfessorRoutingModule { }
