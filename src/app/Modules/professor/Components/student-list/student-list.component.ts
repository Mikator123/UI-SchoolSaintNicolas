import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/Modules/auth/Services/Auth/auth.service';
import { Student } from '../../Models/Student.model';
import {ProfessorService} from '../../Services/professor.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {


  studentList : Student[] = [];

  constructor(
    private _auth: AuthService,
    private _profService : ProfessorService,
    private _route : ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.studentList = this._route.snapshot.data['studentList'];
    this.studentList.forEach(student => {
      if (student.photo == null)
        student.gender === 'M' ? 
        student.photo = "http://www.haneffebasket.be/wp-content/uploads/2017/04/avatar-vide.jpeg":
        student.photo = "http://www.tmf-operating.com/wp-content/uploads/2015/12/avatar-femme-300x176.jpg";

    });
  }
}
