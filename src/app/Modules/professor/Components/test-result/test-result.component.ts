import { Component, OnDestroy, OnInit } from '@angular/core';
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

export interface CreateDialogData {
  classId: number;
  studentId: number;
}

@Component({
  selector: 'app-test-result',
  templateUrl: './test-result.component.html',
  styleUrls: ['./test-result.component.scss']
})
export class TestResultComponent implements OnInit, OnDestroy {

  statusCode: number;
  catPanelState : Boolean[] = [];
  resultPanelState : Boolean[]= [];
  studentId: number;
  results: TestResult[] = [];
  resultSubscription: Subscription;
  categories: Category[] = [];
  classId : number;
  userId: number;
  passage = 0;
  student : Student = new Student();
  emptyMsg = false;


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
      if(data.statusCode == 1){
        this.student.lastName = data.lastName
        this.student.firstName = data.firstName
        this.student.id = data.id
        this.student.statusCode = data.statusCode
      }
      this.statusCode = data.statusCode, this.classId = data.classId, this.userId = data.id})
    this.studentId = parseInt(this._routing.snapshot.params['studentId']);
    this._resultService.getCategories().subscribe(data => {
      this.categories = data
      if (this.categories == null || this.categories.length == 0) return;
      this.catPanelState.length =  this.categories.length;
      this.catPanelState.map(x => x = false);
      this.categories.forEach(cat => {
        this.BarChartLabels.push(cat.name);
        });
    });
    if(this.statusCode != 1)
      this.student = this._profService.Student$.find(s => s.id == this.studentId)
    this._resultService.getByStudentId(this.studentId);
    this.resultSubscription = this._resultService.testSubject.subscribe((list:TestResult[]) => {
    this.results = list;
    if (this.results == null || this.results.length == 0){
      this.emptyMsg = true;
      return;
    } 
    this.resultPanelState.length = this.results.length;
    this.resultPanelState.map(x => x = false);
    this.results.sort(function compare(a,b){
      if (a.date < b.date)
        return -1;
      if (a.date > b.date)
        return 1;
      return 0;
    })

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
        this.BarChartData[0] = ({data: numbers, label:'Moyenne', 
          borderColor: ['#48C9B0','#EF9A9A','#CE93D8','#9FA8DA','#90CAF9','#FFAB91', '#80CBC4',  '#E6EE9C', '#FFE082', '#FFE082', '#F48FB1','#FFAB91','#BCAAA4', 'B0BEC5', '#FFCC80', '#FFF59D', '#A5D6A7']
          ,backgroundColor: ['#48C9B06A','#EF9A9A6A','#CE93D86A','#9FA8DA6A','#90CAF96A','#FFAB916A', '#80CBC46A',  '#E6EE9C6A', '#FFE0826A', '#FFE0826A', '#F48FB16A','#FFAB916A','#BCAAA46A', 'B0BEC56A', '#FFCC806A', '#FFF59D6A', '#A5D6A76A']
          , hoverBackgroundColor: ['#48C9B0','#EF9A9A','#CE93D8','#9FA8DA','#90CAF9','#FFAB91', '#80CBC4',  '#E6EE9C', '#FFE082', '#FFE082', '#F48FB1','#FFAB91','#BCAAA4', 'B0BEC5', '#FFCC80', '#FFF59D', '#A5D6A7']
          , hoverBorderColor: ['#48C9B0','#EF9A9A','#CE93D8','#9FA8DA','#90CAF9','#FFAB91', '#80CBC4',  '#E6EE9C', '#FFE082', '#FFE082', '#F48FB1','#FFAB91','#BCAAA4', 'B0BEC5', '#FFCC80', '#FFF59D', '#A5D6A7'],
        borderWidth:1})
      }
    }
  });
  }

  ngOnDestroy(): void {
    this.resultSubscription.unsubscribe();
    console.log(this.resultSubscription)
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
