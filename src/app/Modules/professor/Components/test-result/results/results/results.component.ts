import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Identifiers } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/Modules/auth/Services/Auth/auth.service';
import { Category } from 'src/app/Modules/professor/Models/Category.model';
import { Student } from 'src/app/Modules/professor/Models/Student.model';
import { TestResult } from 'src/app/Modules/professor/Models/testResult.model';
import { ProfessorService } from 'src/app/Modules/professor/Services/professor.service';
import { ResultService } from 'src/app/Modules/professor/Services/result.service';
import { CategoryResult } from 'src/app/Modules/professor/Models/CategoryResult.model';
import { Subscription } from 'rxjs';
import { ChartDataSets } from 'chart.js';
import { Color } from 'ng2-charts';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  categories: Category[] = [];
  startingCategoryId = 0;
  students: Student[] = [];
  startingStudentId = 0;
  ActualClassId: number;
  results: TestResult[] = [];
  


  //pq une subscription ?
  
  public LineChart = {
    scaleShowVerticalLines: false,
    responsive: true
    
    
  };
  public LineChartLabels : Date[] = [];
  public LineChartType = 'line';
  public LineChartLegend = true;
  public LineChartData : ChartDataSets[] = [];
  borderColor: string[] = ['#EF9A9A','#CE93D8','#9FA8DA','#90CAF9','#80DEEA', '#80CBC4',  '#E6EE9C', '#FFE082', '#FFE082', '#F48FB1','#FFAB91','#BCAAA4', 'B0BEC5', '#FFCC80', '#FFF59D', '#A5D6A7']

  

  constructor(
    private _resultService : ResultService,
    private _profService: ProfessorService,
    private _authService: AuthService,
  ) { }

  ngOnInit(): void {
    this._authService.user$.subscribe(user => {
      if (user == null) return;
      this.ActualClassId = user.classId;
    });
    this._resultService.getCategories()
    .subscribe(data => {
      if (data == null) return;
      this.categories = data;
      this.categories.push({id:0 , name : 'Toutes'})
    });
    this._profService.getStudents(this.ActualClassId);
    this._profService.studentSubject.subscribe(student => {
      if (student == null) return;
      this.students = student.filter(x => x.statusCode != 2);
      this.students.push({id:0, firstName: 'Tous', lastName:'', birthdate:new Date(), gender:'', photo:'', statusCode:1});
    });
    this._resultService.getResultByClassId(this.ActualClassId)
    this._resultService.allResultSubject.subscribe(results => {
      if (results == null) return;
      this.results = results;
      results.forEach(R => {
        if (!this.LineChartLabels.includes(R.date))
          this.LineChartLabels.push(R.date)
      });
      if (this.results != null && this.categories.length != 0){
        let index = 0;
        for (let i = 0; i < this.categories.length; i++)
        {
          let numbers : number[] = [];
          console.log(numbers,this.categories[i].name)
          for (let k = 0; k < this.LineChartLabels.length; k++){
            let average = 0;
            let passage = 0;
            this.results.forEach(R => {
              if (R.date == this.LineChartLabels[k] && R.categoryId == this.categories[i].id){
                average += R.result;
                passage += 1;
              }
            })
            if (average > 0 && passage > 0)
              numbers.push(average/passage)
          }
          if (numbers.length > 0){
            this.LineChartData[index] = ({data: numbers, label: this.categories[i].name, borderColor:this.borderColor[i], backgroundColor:"#FFFFFF00"})
            index += 1;
          }
            // this.LineChartData.push({data: numbers, label: this.categories[i].name, borderColor:this.borderColor[i]})
          
        }

      }
    })
  }
}