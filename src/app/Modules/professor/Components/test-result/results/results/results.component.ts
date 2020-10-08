import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Identifiers } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/Modules/auth/Services/Auth/auth.service';
import { Category } from 'src/app/Modules/professor/Models/Category.model';
import { Student } from 'src/app/Modules/professor/Models/Student.model';
import { TestResult } from 'src/app/Modules/professor/Models/testResult.model';
import { ProfessorService } from 'src/app/Modules/professor/Services/professor.service';
import { ResultService } from 'src/app/Modules/professor/Services/result.service';
import {DatePipe, formatDate} from '@angular/common';



// type Theme = 'light-theme' | 'dark-theme';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})

export class ResultsComponent implements OnInit {


  //ChartTheming:
  

  // private _selectedTheme: Theme = 'light-theme';
  // public get selectedTheme() {
  // return this._selectedTheme;
  // }
  // public set selectedTheme(value) {
  //   this._selectedTheme = value;
  //   let overrides: ChartOptions;
  //   if (this.selectedTheme === 'dark-theme') {
  //   overrides = {
  //     legend: {
  //       labels: { fontColor: 'white' }
  //     },
  //     scales: {
  //       xAxes: [{
  //         ticks: { fontColor: 'white' },
  //         gridLines: { color: 'rgba(255,255,255,0.1)' }
  //       }],
  //       yAxes: [{
  //         ticks: { fontColor: 'white' },
  //         gridLines: { color: 'rgba(255,255,255,0.1)' }
  //       }]
  //     }
  //   };
  // } else {
  //   overrides = {};
  //   }
  // this.themeService.setColorschemesOptions(overrides);
  // }

  //Chart
  public LineChart = {
    scaleShowVerticalLines: false,
    responsive: true,
    title:{
      display:true,
      text:'Evolution des résultats en temps réel',
    },
    scales: {
      yAxes: [{
          ticks: {
              beginAtZero: true,
              max: 20
          }
      }],
      xAxes:[{
        // type:'time',
        // time:{displayFormats:{week:'ll'}}
        // valueFormatString:"MMM"
      }]
    },
    animationEnable:true,
  
  };
  public LineChartLabels : Date[] = [];
  public LineChartType = 'line';
  public LineChartLegend = true;
  public LineChartData : ChartDataSets[] = [];
  borderColor: string[] = ['#EF9A9A','#CE93D8','#9FA8DA','#90CAF9','#80DEEA', '#80CBC4',  '#E6EE9C', '#FFE082', '#FFE082', '#F48FB1','#FFAB91','#BCAAA4', 'B0BEC5', '#FFCC80', '#FFF59D', '#A5D6A7']

    //Props
    categories: Category[] = [];
    startingCategoryId = 0;
    // students: Student[] = [];
    // startingStudentId = 0;
    ActualClassId: number;
    results: TestResult[] = [];
    

  constructor(
    private _resultService : ResultService,
    private _profService: ProfessorService,
    private _authService: AuthService,
    // private themeService: ThemeService
  ) { }

  // setCurrentTheme(theme: Theme) {
  //   this.selectedTheme = theme;
  // }

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
    // this._profService.studentSubject.subscribe(student => {
    //   if (student == null) return;
    //   this.students = student.filter(x => x.statusCode != 2);
    //   this.students.push({id:0, firstName: 'Tous', lastName:'', birthdate:new Date(), gender:'', photo:'', statusCode:1});
    // });
    this._resultService.getResultByClassId(this.ActualClassId)
    this._resultService.allResultSubject.subscribe(results => {
      if (results == null) return;
      this.results = results;
      results.forEach(R => {
        if (!this.LineChartLabels.includes(R.date))
          this.LineChartLabels.push(R.date)
          this.LineChartLabels.sort();
      });
      if (this.results != null && this.categories.length != 0){
        let index = 0;
        for (let i = 0; i < this.categories.length; i++)
        {
          let tests = {numbers:[], dates:[]};
          for (let k = 0; k < this.LineChartLabels.length; k++){
            let average = 0;
            let passage = 0;
            let date; 

            this.results.forEach(R => {
              if (R.date == this.LineChartLabels[k] && R.categoryId == this.categories[i].id){
                average += R.result;
                passage += 1;
                date = R.date;
              }
            })
            if (average > 0 && passage > 0){
              tests.numbers.push(average/passage)
              tests.dates.push(date)
            }
          }
          if (tests.numbers.length != 0 && tests.dates.length != 0){
            let numbers : number[] = [];
            numbers.length = this.LineChartLabels.length;
            for (let x = 0; x < numbers.length; x++){
              if (this.LineChartLabels.includes(tests.dates[x])){
                let index = this.LineChartLabels.findIndex(date => date == tests.dates[x]);
                numbers[index] = tests.numbers[x];
              }
            }
            this.LineChartData[index] = ({data: numbers, label: this.categories[i].name, borderColor:this.borderColor[i], backgroundColor:this.borderColor[i],fill:false, spanGaps:true, pointHoverRadius: 10})
            index += 1;
          }
        }
      }
    })
  }
}