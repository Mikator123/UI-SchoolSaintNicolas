import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ChartDataSets } from 'chart.js';
import { Subscription } from 'rxjs';
import { DeleteComponent } from 'src/app/Components/confirmBox/Delete/delete.component';
import { AuthService } from 'src/app/Modules/auth/Services/Auth/auth.service';
import { Category } from '../../Models/Category.model';
import { Student } from '../../Models/Student.model';
import { TestResult } from '../../Models/testResult.model';
import { ProfessorService } from '../../Services/professor.service';
import {ResultService} from '../../Services/result.service';
import { CreateResultComponent } from './create-result/create-result.component';
import { UpdateResultComponent } from './update-result/update-result.component';
import { ViewFileComponent } from './view-file/view-file.component';

export interface UpdateDialogData {
  id: number,
  result : number,
  date: Date,
  description: string;
  categoryId: number;
  classId: number;
  studentId: number;
  
}

// export interface data{
//   Id:number;
//   data: ChartDataSets[];
// }

// export interface label{
//   Id:number;
//   label: Date[];
// }

export interface CreateDialogData {
  classId: number;
  studentId: number;
}

@Component({
  selector: 'app-test-result',
  templateUrl: './test-result.component.html',
  styleUrls: ['./test-result.component.scss']
})
export class TestResultComponent implements OnInit {

  statusCode: number;
  catPanelState = false;
  resultPanelState = false;
  studentId: number;
  results: TestResult[] = [];
  resultSubscription: Subscription;
  categories: Category[] = [];
  classId : number;
  userId: number;
  passage = 0;
  student: Student;


  //chart
  borderColor: string[] = ['#EF9A9A','#CE93D8','#9FA8DA','#90CAF9','#FFAB91', '#80CBC4',  '#E6EE9C', '#FFE082', '#FFE082', '#F48FB1','#FFAB91','#BCAAA4', 'B0BEC5', '#FFCC80', '#FFF59D', '#A5D6A7']
  //LineChart
  public LineChart = {
    scaleShowVerticalLines: false,
    responsive: true,
    title:{
      display:true,
      text:'Evolution des résultats en temps réel'
    },
    scales: {
      yAxes: [{
          ticks: {
              beginAtZero: true,
              max: 20
          }
      }]}
    };
  public LineChartLabels : [];
  public LineChartType = 'line';
  public LineChartLegend = false;
  public LineChartData : [];
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




  constructor(
    private _resultService: ResultService,
    private _routing: ActivatedRoute,
    public dialog: MatDialog, 
    private _authService: AuthService,
    private _profService: ProfessorService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this._authService.user$.subscribe(data => {
      if (data == null) return;
      this.statusCode = data.statusCode, this.classId = data.classId, this.userId = data.id})
    this.studentId = parseInt(this._routing.snapshot.params['studentId']);
    this._resultService.getCategories().subscribe(data => {
      this.categories = data
      this.categories.forEach(cat => {
        this.BarChartLabels.push(cat.name);
        });
    });
    this.student = this._profService.Student$.find(s => s.id == this.studentId)
    this._resultService.getByStudentId(this.studentId);
    this.resultSubscription = this._resultService.testSubject.subscribe((list:TestResult[]) => {
    this.results = list;

    if (this.results.length != 0 && this.categories.length != 0){
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
        this.BarChartData[0] = ({data: numbers, label:'Categories', backgroundColor: ['#48C9B06A','#EF9A9A6A','#CE93D86A','#9FA8DA6A','#90CAF96A','#FFAB916A', '#80CBC46A',  '#E6EE9C6A', '#FFE0826A', '#FFE0826A', '#F48FB16A','#FFAB916A','#BCAAA46A', 'B0BEC56A', '#FFCC806A', '#FFF59D6A', '#A5D6A76A']})
      }
    }
  });

    // list.forEach(R => {
    //   if (!this.LineChartLabels.includes(R.date))
    //     this.LineChartLabels.push(R.date)
    // });


    // full lineChart
    // if (this.results.length != 0 && this.categories.length != 0){
    //   let index = 0;
    //   for (let i = 0; i < this.categories.length; i++)
    //   {
    //     let tests = {numbers:[], dates:[]};
    //     // let numbers : number[] = [];
    //     for (let k = 0; k < this.LineChartLabels.length; k++){
    //       this.results.forEach(R => {
    //         if (R.date == this.LineChartLabels[k] && R.categoryId == this.categories[i].id){
    //           tests.numbers.push(R.result)
    //           tests.dates.push(R.date)
    //         }
    //       })
    //     }
    //     if (tests.numbers.length != 0 && tests.dates.length != 0){
    //       let numbers : number[] = [];
    //       numbers.length = this.LineChartLabels.length;
    //       for (let x = 0; x < numbers.length; x++){
    //         if (this.LineChartLabels.includes(tests.dates[x])){
    //           let index = this.LineChartLabels.findIndex(date => date == tests.dates[x]);
    //           numbers[index] = tests.numbers[x];
    //         }
    //       }
    //       this.LineChartData[index] = ({data: numbers, label: this.categories[i].name, borderColor:this.borderColor[i], backgroundColor:"#FFFFFF00", spanGaps:true})
    //       index += 1;

    //     }
    //   }
    // }
  // });
  }

  getLabelsByCategory(categoryId: number): Date[] {
    if (this.results.length == 0) return [];
    let label = [];
    if (this.results != null && this.results.length != 0){
      this.results.forEach(result => {
        if (categoryId == result.categoryId)
        label.push(result.date);
      });
    }
    return label;
  }

  getDataByCategory(categoryId: number): ChartDataSets[] {
    if(this.results == null) return [];
    let labelSets : Date[] = [];
    let chartData: ChartDataSets[] = [];
    labelSets = this.getLabelsByCategory(categoryId);
    let currentCategory = this.categories.find( x => x.id == categoryId);
    if (this.results.length != 0 && this.categories.length != 0 && labelSets.length != 0){
      let tests = {numbers:[], dates:[]};
      for (let i = 0; i < labelSets.length; i++){
        this.results.forEach(result => {
          if (categoryId == result.categoryId && result.date == labelSets[i]){
            tests.numbers.push(result.result);
            tests.dates.push(result.date);
            }
        })
      }
      if (tests.numbers.length != 0 && tests.dates.length != 0){
        let resultToGO : number[] = [];
        resultToGO.length = labelSets.length;
        for(let k = 0; k < resultToGO.length; k++)
        {
          if(labelSets.includes(tests.dates[k])){
            let index = labelSets.findIndex(date => date == tests.dates[k]);
            resultToGO[index] = tests.numbers[k];
          }
        }
        chartData = [{data: resultToGO, label: currentCategory.name, borderColor: this.borderColor[categoryId], backgroundColor: "#FFFFFF0B"}]
      }
    }
    console.log(chartData, false)
    return chartData;
  }


  openDeleteDialog(id:number){
    let actualeTestId = id;
    let ref = this.dialog.open(DeleteComponent, {
      width: '500px',
    });

    ref.afterClosed().subscribe(result => {
      if (result == true)
      {
        this._resultService.delete(actualeTestId, this.studentId);
        this._snackBar.open("Suppression effectuée.", null, {duration : 3000})
      }
    })
    
  }

  openUpdateDialog(result: TestResult){
    let ref = this.dialog.open(UpdateResultComponent,{
      width: '80vw',
      height: '80vh',
      disableClose:true,
      data: {
        id : result.id,
        result : result.result,
        date : result.date,
        description: result.description,
        categoryId : result.categoryId,
        classId: result.classId,
        studentId : result.studentId,
      }
    })
    ref.afterClosed().subscribe(success => {
      if (success == true)
        this._snackBar.open("Mise à jour du résultat validée.", null, {duration : 3000})
  });
  }

  openCreateDialog(stuId:number)
  {
    let ref = this.dialog.open(CreateResultComponent,{
      width: '80vw',
      height: '80vh',
      disableClose:true,
      data: {
        classId: this.classId ,
        studentId : stuId,
      }
    })
    ref.afterClosed().subscribe(success => {
      if (success == true)
        this._snackBar.open("Résultat créé.", null, {duration : 3000})
    });
  }

  checkCategories(catId: number): boolean
  {
    let exist = false;
    this.results.forEach(result => {
      if(result.categoryId == catId)
        exist = true;      
    });
    return exist
  }

  setAvg(catId:number):number{
    let sum = 0;
    let divideBy = 0;
    this.results.forEach(result => {
      if(result.categoryId == catId){
        divideBy += 1;
        sum += result.result;
      }
    })
    return (sum/divideBy);
  }
  
  openFile(resultId:number){
    let resultDocument = this.results.filter(x => x.id == resultId)
    let ref = this.dialog.open(ViewFileComponent,{
      disableClose:false,
      data:{
        document: resultDocument
      }
    })
  }
}
