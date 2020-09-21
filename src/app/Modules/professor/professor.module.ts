import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfessorRoutingModule } from './professor-routing.module';
import { StudentListComponent } from './Components/student-list/student-list.component';
import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import { TrimestrialNoteComponent } from './Components/trimestrial-note/trimestrial-note.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { DeleteComponent } from './Components/trimestrial-note/delete/delete.component';
import { StudentDetailedComponent } from './Components/student-list/student-detailed/student-detailed.component';



@NgModule({
  declarations: [
    StudentListComponent,
    TrimestrialNoteComponent,
    DeleteComponent,
    StudentDetailedComponent,
  ],

  imports: [
    CommonModule,
    ProfessorRoutingModule,
    MatCardModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MatButtonModule,
    MatListModule,
    MatDividerModule,
    MatExpansionModule,

  ],

  exports:[
    StudentListComponent
  ]
})
export class ProfessorModule { }
