import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StudentDetailedComponent } from 'src/app/Modules/professor/Components/student-list/student-detailed/student-detailed.component';
import { Class } from 'src/app/Modules/professor/Models/Class.model';
import { ProfessorService } from 'src/app/Modules/professor/Services/professor.service';
import { Lunch } from '../../../Models/Lunch.model';
import { UserForEntities } from '../../../Models/UserForEntities.model';
import { LunchUserListDialog } from '../lunch.component';

@Component({
  selector: 'app-lunch-with-persons',
  templateUrl: './lunch-with-persons.component.html',
  styleUrls: ['./lunch-with-persons.component.scss']
})
export class LunchWithPersonsComponent implements OnInit {



  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Lunch,
    private _profService: ProfessorService,
    private _dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  openDetailDialog(id: number){
    let ref = this._dialog.open(StudentDetailedComponent, {
      data:{
        studentId: id,
        },
    })

  }

}
