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
    this.mySubscription = this._profService.studentSubject.subscribe((list: Student[]) => {this.studentList = list});
    // this.studentList.forEach(student => {
      // if (student.photo == null)
      //   student.gender === 'M' ? 
      //   student.photo = "http://www.haneffebasket.be/wp-content/uploads/2017/04/avatar-vide.jpeg":
      //   student.photo = "http://www.tmf-operating.com/wp-content/uploads/2015/12/avatar-femme-300x176.jpg";
      // EN DB DIRECT ?
    // });
  }
}
