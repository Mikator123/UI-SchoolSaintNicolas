import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfessorRoutingModule } from './professor-routing.module';
import { StudentListComponent } from './Components/student-list/student-list.component';
import { TrimestrialNoteComponent } from './Components/trimestrial-note/trimestrial-note.component';
import { TestResultComponent } from './Components/test-result/test-result.component';
import { UserModule } from '../User/user.module';
import { SharedModule } from '../shared/shared.module';
import { UpdateNoteComponent } from './Components/trimestrial-note/Update-note/update.component';
import { CreateNoteComponent } from './Components/trimestrial-note/Create-note/create.component';
import {UpdateResultComponent} from './Components/test-result/update-result/update-result.component';
import {CreateResultComponent} from './Components/test-result/create-result/create-result.component';
import { StudentDetailedComponent } from './Components/student-list/student-detailed/student-detailed.component';
import { ResultsComponent } from './Components/test-result/results/results/results.component';
import { ViewFileComponent } from './Components/test-result/view-file/view-file.component';
import { WorkListComponent } from './Components/works/work-list/work-list.component';
import { CreateWorkComponent } from './Components/works/create-work/create-work.component';
import {UpdateWorkComponent} from './Components/works/update-work/update-work.component';







@NgModule({
  declarations: [
    StudentListComponent,
    TrimestrialNoteComponent,
    CreateNoteComponent,
    UpdateNoteComponent,
    TestResultComponent,
    UpdateResultComponent,
    CreateResultComponent,
    StudentDetailedComponent,
    ResultsComponent,
    ViewFileComponent,
    WorkListComponent,
    CreateWorkComponent,
    UpdateWorkComponent,
  ],

  imports: [
    CommonModule,
    ProfessorRoutingModule,
    UserModule,
    SharedModule,
    
  ],

  exports:[
    StudentListComponent,
    TrimestrialNoteComponent,
    CreateNoteComponent,
    TestResultComponent,
    UpdateNoteComponent,
    UpdateResultComponent,
    CreateResultComponent,
    StudentDetailedComponent,
    ResultsComponent,
    ViewFileComponent,
    WorkListComponent,
    CreateWorkComponent,
    UpdateWorkComponent
  ]
})
export class ProfessorModule { }
