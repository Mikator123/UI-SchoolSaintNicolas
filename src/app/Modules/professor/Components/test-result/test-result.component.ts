import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
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
export class TestResultComponent implements OnInit {

  statusCode: number;
  catPanelState = false;
  resultPanelState = false;
  studentId: number;
  results: TestResult[] = [];
  resultSubscription: Subscription;
  categories: Category[];
  classId : number;
  userId: number;
  passage = 0;
  student: Student;

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
    this._resultService.getByStudentId(this.studentId);
    this.resultSubscription = this._resultService.testSubject.subscribe((list:TestResult[]) => {this.results = list});
    this._resultService.getCategories().subscribe(data => this.categories = data);
    this.student = this._profService.Student$.find(s => s.id == this.studentId)
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
  

}
