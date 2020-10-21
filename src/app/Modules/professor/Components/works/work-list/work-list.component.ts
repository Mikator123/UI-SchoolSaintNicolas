import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteComponent } from 'src/app/Components/confirmBox/Delete/delete.component';
import { AuthService } from 'src/app/Modules/auth/Services/Auth/auth.service';
import { Category } from '../../../Models/Category.model';
import { Work } from '../../../Models/Work.model';
import { ProfessorService } from '../../../Services/professor.service';
import { ResultService } from '../../../Services/result.service';
import { WorkService } from '../../../Services/work.service';
import { CreateWorkComponent } from '../create-work/create-work.component';
import { UpdateWorkComponent } from '../update-work/update-work.component';

@Component({
  selector: 'app-Worklist',
  templateUrl: './work-list.component.html',
  styleUrls: ['./work-list.component.scss']
})
export class WorkListComponent implements OnInit {


  //props
  works : Work[] = [];
  work: Work = new Work();
  workPanelState : Boolean[] = [];
  emptyMsg = false;
  
  //category
  categories: Category[] = [];
  selectCategories: Category[] = [];
  selectedCategories = new FormControl();
  catPanelState : Boolean[] = [];
  //trimester
  trimesters: number[]= [ 1,2,3 ];
  selectTrimesters = this.trimesters;
  selectedTrimesters = new FormControl();
  trimesterPanelState : Boolean[] = [
    false,false,false
  ];
  //schoolyear
  schoolYears: number[]= [ 1,2,3,4,5,6 ];
  selectSchoolYears = this.schoolYears;
  selectedSchoolYears = new FormControl();
  yearValue: null;
  schoolYearPanelState : Boolean[] = [
    false, false, false, false, false, false
  ]
  


  constructor(
    private _authService: AuthService,
    private _workService: WorkService,
    private _resultService: ResultService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) {
    
   }

  ngOnInit(): void {
    this._workService.GetWorks();
    this._workService.works$.subscribe(data => {
      this.works = data;
      if (this.works == null || this.works.length == 0) return;
      this.workPanelState.length = this.works.length;
      this.workPanelState.map(x => x = false);
     

  
    })
    this._resultService.getCategories().subscribe(data => {
      this.categories = data;
      this.selectCategories = data;
      if (this.categories.length == 0 || this.categories == null){
        this.emptyMsg = true;
        return;
      } 
      this.catPanelState.length = this.categories.length;
      for(let i = 0; i < this.catPanelState.length ; i++)
      {
        this.catPanelState[i] = false;
      }
    })
    
  }

  openDeleteDialog(workId:number){
    let ref = this.dialog.open(DeleteComponent, {
      width: '500px',
    });

    ref.afterClosed().subscribe(result => {
      if (result == true)
      {
        this._workService.DeleteWork(workId);
        this._snackBar.open("Suppression effectuée.", null, {duration : 3000})
      }
    })
    
  }

  openUpdateDialog(work: Work){
    let ref = this.dialog.open(UpdateWorkComponent,{
      width: '80vw',
      height: '80vh',
      data: work,
      disableClose:true,
    })
    ref.afterClosed().subscribe(success => {
      if (success == true)
        this._snackBar.open("Mise à jour du travail validée", null, {duration: 3000})
    });
  }

  openCreateDialog(){
    let ref = this.dialog.open(CreateWorkComponent,{
      width:'80vw',
      height: '80vh',
      disableClose: true,
    })
    ref.afterClosed().subscribe(success => {
      if (success == true){
        this._snackBar.open("Travail créé", null, {duration: 3000})
        this.selectedChoices();
      }
    });
  }

  checkCategories(catId: number): boolean
  {
    let exist = false;
    if (this.works == null) return;
    this.works.forEach(work => {
      if(work.categoryId == catId)
        exist = true;    
    });
    return exist
  }

  checkSchoolYear(year: number, catId: number): boolean{
    let exist = false;

    this.works.forEach(work => {
      if (work.categoryId == catId && work.schoolYear == year)
        exist = true;
    })
    return exist
  }

  checkTrimester( trimester:number, year: number, catId: number): boolean{
    let exist = false;
    this.works.forEach(work => {
      if (work.categoryId == catId && work.schoolYear == year && work.trimester == trimester)
        exist = true;
    })
    return exist
  }

  selectedChoices(){
    if(this.emptyMsg == true)
      this.emptyMsg = false;
    this.sortByCategories(); 
    this.sortBySchoolYears();
    this.sortByTrimesters();
  }

  sortByCategories(){
    if (this.selectedCategories.value)
    {
      this.emptyMsg = true;
      if (this.selectedCategories.value.length == 0)
      {
        this.categories = this.selectCategories;
        this.emptyMsg = false;
      }
      else{
        
        this.categories = this.selectedCategories.value;
        this.categories.forEach(element => {
          if(this.emptyMsg == false) return;
          if(this.works.find(x => x.categoryId == element.id)){
            this.emptyMsg = false;
          }
          else
            this.emptyMsg = true;
        });
        if (this.categories.length == 0 || this.categories == null) return;
        this.catPanelState = [];
        this.catPanelState.length = this.categories.length;
        for(let i = 0; i < this.catPanelState.length ; i++)
          this.catPanelState[i] = false;
      }
    }
  }

  sortBySchoolYears(){
    if (this.selectedSchoolYears.value)
    {
      if (this.selectedSchoolYears.value.length == 0){
        this.schoolYears = this.selectSchoolYears;
        this.sortByCategories();
        if (!this.selectedCategories.value)
          this.categories = this.selectCategories;
      }
      else{
        this.sortByCategories();
        if(this.emptyMsg == true) return
        if (!this.selectedCategories.value)
          this.categories = this.selectCategories;
        this.schoolYears = this.selectedSchoolYears.value;
        let newCategories : Category[] = []
        this.categories.forEach(cat => {
          this.schoolYears.forEach(SY => {
            if(this.works.find(x => x.schoolYear == SY && x.categoryId == cat.id)){
              if(!newCategories.find(y => y.id == cat.id)){
                newCategories.push(cat);
              }
            }
          });
        });
        this.categories = newCategories;
        if (this.categories.length == 0)
          this.emptyMsg = true;
        if (this.schoolYears.length == 0 || this.schoolYears == null) return;
        this.schoolYearPanelState = [];
        this.schoolYearPanelState.length = this.schoolYears.length;
        for(let i = 0; i < this.schoolYearPanelState.length ; i++)
          this.schoolYearPanelState[i] = false;
      }
    }
  }

  sortByTrimesters(){
    if (this.selectedTrimesters.value)
    {
      if (this.selectedTrimesters.value.length == 0){
        this.trimesters = this.selectTrimesters;
        this.sortBySchoolYears();
        if (!this.selectedCategories.value)
          this.categories = this.selectCategories;
        if (!this.selectedSchoolYears.value)
          this.schoolYears = this.selectSchoolYears;
      }
      else{
        this.sortBySchoolYears();
        if (this.emptyMsg == true) return;
        if (!this.selectedCategories.value)
          this.categories = this.selectCategories;
        if (!this.selectedSchoolYears.value)
          this.schoolYears = this.selectSchoolYears;
        this.trimesters = this.selectedTrimesters.value;
        let newCategories : Category[] = [];
        let newSchoolYears: number[] = [];
        this.categories.forEach(cat => {
          this.schoolYears.forEach(SY => {
            this.trimesters.forEach(trimester => {
              if(this.works.find(x => x.trimester == trimester && x.categoryId == cat.id && x.schoolYear == SY)){
                if(!newCategories.find(y => y.id == cat.id))
                  newCategories.push(cat);
                if(!newSchoolYears.find(z => z == SY)){
                  newSchoolYears.push(SY);
                  newSchoolYears.sort();
                }   
              }
            });
          });
        });
        this.categories = newCategories;
        if (this.categories.length == 0)
          this.emptyMsg = true;
        this.schoolYears = newSchoolYears;
        if (this.trimesters.length == 0 || this.trimesters == null) return;
        this.trimesterPanelState = [];
        this.trimesterPanelState.length = this.trimesters.length;
        for(let i = 0; i < this.trimesterPanelState.length ; i++)
          this.trimesterPanelState[i] = false;
      }
    }
  }

  resetChoices(){
    this.categories = this.selectCategories;
    this.schoolYears = this.selectSchoolYears;
    this.trimesters = this.selectTrimesters;
    this.selectedCategories.setValue(null);
    this.selectedSchoolYears.setValue(null);
    this.selectedTrimesters.setValue(null);
    this.emptyMsg = false;
  }

}
