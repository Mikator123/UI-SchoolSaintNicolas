import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/Modules/auth/Services/Auth/auth.service';
import { Student } from '../../Models/Student.model';
import {ProfessorService} from '../../Services/professor.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {

  actualClassId : number;
  studentList : Student[] = [];
  mySubscription : Subscription;

  constructor(
    private _auth: AuthService,
    private _profService : ProfessorService,
  ) { }

  ngOnInit(): void {
    this._auth.user$.subscribe(data => this.actualClassId = data.classId)
    this._profService.getStudents(this.actualClassId);
    this._profService.getClasses();
    this.mySubscription = this._profService.studentSubject.subscribe((list: Student[]) => {this.studentList = list});
  }
}
