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





@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})

export class ResultsComponent implements OnInit {


  //LineChart
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

      }]
    },
    animationEnable:true,
  
  };
  public LineChartLabels : Date[] = [];
  public LineChartType = 'line';
  public LineChartLegend = true;
  public LineChartData : ChartDataSets[] = [];
  public borderColor: string[] = ['#48C9B0','#EF9A9A','#CE93D8','#9FA8DA','#90CAF9','#FFAB91', '#80CBC4',  '#E6EE9C', '#FFE082', '#FFE082', '#F48FB1','#FFAB91','#BCAAA4', 'B0BEC5', '#FFCC80', '#FFF59D', '#A5D6A7']

  //BarChart
  public BarChart = {
    responsive: true,
    title:{
      display:true,
      text:'Moyenne des résultats en temps réel'
    },
    scales: {
      yAxes: [{
          ticks: {
              beginAtZero: true,
              max: 20
          }
      }]
  },
  };
  public BarChartLabels: string[] = [];
  public BarChartType= 'bar';
  public BarChartLegend = false;
  public BarChartData : ChartDataSets[] = [];



    //Props
    categories: Category[] = [];
    startingCategoryId = 0;
    ActualClassId: number;
    results: TestResult[] = [];
    

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
      // fill bar chart xAxis
      this.categories.forEach(cat => {
        if (cat.name == 'Toutes') return;
        this.BarChartLabels.push(cat.name);
      });
      //--
    });
    this._profService.getStudents(this.ActualClassId);

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
        let index = 0; // line chart
        for (let i = 0; i < this.categories.length; i++)
        {
          let tests = {numbers:[], dates:[]}; //line chart
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
            this.LineChartData[index] = ({data: numbers, label: this.categories[i].name, borderColor:this.borderColor[i], backgroundColor:this.borderColor[i],fill:false, spanGaps:true, 
                                          pointHoverRadius: 10, pointRadius:4, pointBackgroundColor:this.borderColor[i], pointHoverBackgroundColor: this.borderColor[i]})
            index += 1;
          }
        }
        let numbers : number[] = [];
        for (let i = 0; i < this.categories.length; i ++){
          let average = 0;
          let passage = 0;
          this.results.forEach(R => {
            if (R.categoryId == this.categories[i].id){
              average += R.result;
              passage += 1;
            }
          });
          numbers.push(average/passage);
        }
        if (numbers.length != 0){
          this.BarChartData[0] = ({data: numbers, label:'Moyenne', 
            borderColor: this.borderColor
            , backgroundColor: ['#48C9B06A','#EF9A9A6A','#CE93D86A','#9FA8DA6A','#90CAF96A','#FFAB916A', '#80CBC46A',  '#E6EE9C6A', '#FFE0826A', '#FFE0826A', '#F48FB16A','#FFAB916A','#BCAAA46A', 'B0BEC56A', '#FFCC806A', '#FFF59D6A', '#A5D6A76A']
            , hoverBackgroundColor: this.borderColor
            , hoverBorderColor: this.borderColor,
          borderWidth:1})
        }
      }
    })
  }
}