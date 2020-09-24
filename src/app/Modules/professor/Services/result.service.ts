import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TestResult } from '../Models/testResult.model';
import { Category } from '../Models/Category.model';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ResultService {

  testResultUrl: string = 'https://localhost:5001/api/testresult/';
  categoryUrl: string= 'https://localhost:5001/api/TeachingCategory/';
  tests: TestResult[];
  testSubject: Subject<TestResult[]> = new Subject<TestResult[]>();
  categories: Category[];
  

  constructor(
    private _client : HttpClient,
  ) {}


  getCategories(): Observable<Category[]>{
    return this._client.get<Category[]>(this.categoryUrl)
  }

  getByStudentId(studentId: number){
    this._client.get<TestResult[]>(this.testResultUrl+'byStudentId/'+studentId).subscribe({
      next: data => {
        this.tests = data;
        this.testSubject.next(this.tests.slice());
      },
      error: error => console.log(error)
    })
  }

  delete(Id:number, studentId:number){
    this._client.delete<number>(this.testResultUrl+Id).subscribe({
      next: () => {this.getByStudentId(studentId)},
      error: error => console.log(error)
    })
  }

  update(test:TestResult){
    this._client.put<TestResult>(this.testResultUrl, test).subscribe({
      next:() => {this.getByStudentId(test.studentId)},
      error: error => console.log(error)
    })
  }

  create(test:TestResult){

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