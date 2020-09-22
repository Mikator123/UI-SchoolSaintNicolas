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
import { UpdateComponent } from './Components/trimestrial-note/update/update.component';
import { CreateComponent } from './Components/trimestrial-note/create/create.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';





@NgModule({
  declarations: [
    StudentListComponent,
    TrimestrialNoteComponent,
    DeleteComponent,
    StudentDetailedComponent,
    UpdateComponent,
    CreateComponent,
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
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,

  ],

  exports:[
    StudentListComponent,
    TrimestrialNoteComponent,
    DeleteComponent,
    StudentDetailedComponent,
    UpdateComponent,
    CreateComponent,
  ]
})
export class ProfessorModule { }
