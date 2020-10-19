import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/Modules/auth/Services/Auth/auth.service';
import { Student } from '../../Models/Student.model';
import {ProfessorService} from '../../Services/professor.service';
import { StudentDetailedComponent } from './student-detailed/student-detailed.component';

export interface CreateDialogData {
  studentId: number
}

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {

  actualClassId : number = 0;
  studentList : Student[] = [];
  mySubscription : Subscription;

  constructor(
    private _auth: AuthService,
    private _profService : ProfessorService,
    private _dialog: MatDialog,
  ) { }


  ngOnInit(): void {
    this._auth.user$.subscribe(data => this.actualClassId = data && data.classId || 0) //if data & data.classid exist -> give data.classId; else 0
    this._profService.getStudents(this.actualClassId);
    this._profService.getClasses();
    this.mySubscription = this._profService.studentSubject.subscribe((list: Student[]) => {this.studentList = list});

  }

 

  openDetailDialog(id: number){
    let ref = this._dialog.open(StudentDetailedComponent, {
      

      data:{
        studentId: id,
        },
    })

  }

  get className():string{
    let className = "";
    this._profService.classes$.forEach(c => {
      if(c.id == this.actualClassId)
        className = c.name;
    })
    return className;
  }
}
