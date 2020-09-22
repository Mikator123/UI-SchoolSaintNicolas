import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DeleteComponent } from 'src/app/Components/confirmBox/Delete/delete.component';
import { Category } from '../../Models/Category.model';
import { TestResult } from '../../Models/testResult.model';
import {ResultService} from '../../Services/result.service';


@Component({
  selector: 'app-test-result',
  templateUrl: './test-result.component.html',
  styleUrls: ['./test-result.component.scss']
})
export class TestResultComponent implements OnInit {

  catPanelState = false;
  resultPanelState = false;
  studentId: number;
  results: TestResult[];
  resultSubscription: Subscription;
  categories: Category[];

  constructor(
    private _resultService: ResultService,
    private _routing: ActivatedRoute,
    public dialog: MatDialog, 
  ) { }

  ngOnInit(): void {
    this.studentId = this._routing.snapshot.params['studentId'];
    this._resultService.getByStudentId(this.studentId);
    this.resultSubscription = this._resultService.testSubject.subscribe((list:TestResult[]) => {this.results = list});
    this._resultService.getCategories().subscribe(data => this.categories = data);
    
  }

  openDeleteDialog(id:number){
    let actualeTestId = id;
    let ref = this.dialog.open(DeleteComponent, {
      width: '500px',
    });

    ref.afterClosed().subscribe(result => {
      let validation = result
      if (validation == true)
      {
        this._resultService.delete(actualeTestId, this.studentId);
      }
    })
    
  }

  openUpdateDialog(result: TestResult){

  }

  openCreateDialog(studentId:number)
  {

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
}
