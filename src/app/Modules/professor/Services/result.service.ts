import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TestResult } from '../Models/testResult.model';
import { Category } from '../Models/Category.model';
import { Observable, Subject } from 'rxjs';
import { UserDetailed } from '../../User/Models/UserDetailed.model';
import { AuthService } from '../../auth/Services/Auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class ResultService {

  testResultUrl: string = 'https://localhost:5001/api/testresult/';
  categoryUrl: string= 'https://localhost:5001/api/TeachingCategory/';
  tests: TestResult[];
  testSubject: Subject<TestResult[]> = new Subject<TestResult[]>();
  categories: Category[];
  allResultSubject : Subject<TestResult[]> = new Subject<TestResult[]>();
  allResult: TestResult[];
  token: string;

  
  constructor(
    private _client : HttpClient,
    private _authService: AuthService,
  ) {
    this._authService.user$.subscribe(user => {
      if(user != null)
        this.token = user.token
    })  
  }

  get results$() {
    return this.allResultSubject.asObservable();
  }

  get categories$() {return this.categories};

  getCategories(): Observable<Category[]>{
    return this._client.get<Category[]>(this.categoryUrl, this.HttpOptions(this.token))
  }

  getByStudentId(studentId: number){
    this._client.get<TestResult[]>(this.testResultUrl+'byStudentId/'+studentId, this.HttpOptions(this.token)).subscribe({
      next: data => {
        this.tests = data;
        this.testSubject.next(this.tests.slice());
      },
      error: error => console.log(error)
    })
  }

  getResultByClassId(classId: number){
    this._client.get<TestResult[]>(this.testResultUrl+'byClassId/'+classId, this.HttpOptions(this.token)).subscribe({
      next: data => {
        this.allResult = data;
        this.allResultSubject.next(this.allResult.slice());
      },
      error: error => console.log(error)
    })
  }

  delete(Id:number, studentId:number){
    this._client.delete<number>(this.testResultUrl+Id,this.HttpOptions(this.token)).subscribe({
      next: () => {this.getByStudentId(studentId)},
      error: error => console.log(error)
    })
  }

  update(test:TestResult){
    this._client.put<TestResult>(this.testResultUrl, test,this.HttpOptions(this.token)).subscribe({
      next:() => {this.getByStudentId(test.studentId)},
      error: error => console.log(error)
    })
  }

  create(test:TestResult){
    this._client.post<TestResult>(this.testResultUrl, test,this.HttpOptions(this.token)).subscribe({
      next:() => {this.getByStudentId(test.studentId)},
      error: error => console.log(error)
    })
  }


  
  private HttpOptions(token:string){
    let options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    };
    return options;
  }
}