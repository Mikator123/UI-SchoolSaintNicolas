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
import { CreateComponent } from './Components/trimestrial-note/create/create.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { TestResultComponent } from './Components/test-result/test-result.component';
import { MatMenuModule } from '@angular/material/menu';
import { UserModule } from '../User/user.module';
import { SharedModule } from '../shared/shared.module';
import { UpdateComponent } from './Components/trimestrial-note/update/update.component';






@NgModule({
  declarations: [
    StudentListComponent,
    TrimestrialNoteComponent,
    CreateComponent,
    TestResultComponent,
    UpdateComponent
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
    UpdateComponent,
  ]
})
export class ProfessorModule { }
