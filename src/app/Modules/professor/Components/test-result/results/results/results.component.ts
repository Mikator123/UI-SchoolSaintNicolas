import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/Modules/auth/Services/Auth/auth.service';
import { Category } from 'src/app/Modules/professor/Models/Category.model';
import { Student } from 'src/app/Modules/professor/Models/Student.model';
import { ProfessorService } from 'src/app/Modules/professor/Services/professor.service';
import { ResultService } from 'src/app/Modules/professor/Services/result.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  categories: Category[];
  startingCategoryId : number;
  students: Student[];
  startingStudentId: number;
  ActualClassId: number;
  
  

  constructor(
    private _resultService : ResultService,
    private _profService: ProfessorService,
    private _authService: AuthService,
  ) { }

  ngOnInit(): void {
    this._authService.user$.subscribe(user => {
      if (user == null) return;
      this.ActualClassId = user.classId;
    })
    this._resultService.getCategories().subscribe(data => {
      if (data == null) return;
      this.categories = data;
      this.categories.push({id:0 , name : 'Toutes categories'})
      this.startingCategoryId = 0;
    });
    this._profService.getStudents(this.ActualClassId);
    this._profService.studentSubject.subscribe(student => {
      if (student == null) return;
      this.students = student.filter(x => x.statusCode != 2);
      this.students.push({id:0, firstName: 'Tous', lastName:'', birthdate:new Date(), gender:'', photo:'', statusCode:1})
      this.startingStudentId = 0;
    })
  }

}
