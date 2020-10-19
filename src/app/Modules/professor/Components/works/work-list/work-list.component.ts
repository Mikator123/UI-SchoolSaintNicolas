import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
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

  works : Work[] = [];
  work: Work = new Work();
  categories: Category[] = [];
  selectCategories: Category[] = [];
  trimesters: number[]= [ 1,2,3 ];
  selectTrimesters = this.trimesters;
  schoolYears: number[]= [ 1,2,3,4,5,6 ];
  selectSchoolYears = this.schoolYears;
  yearValue: null;
  catPanelState : Boolean[] = [];
  schoolYearPanelState : Boolean[] = [
    false, false, false, false, false, false
  ]
  trimesterPanelState : Boolean[] = [
    false,false,false
  ];
  workPanelState : Boolean[] = [];

  selectedCategories = new FormControl();
  selectedSchoolYears = new FormControl();
  selectedTrimesters = new FormControl();

  constructor(
    private _authService: AuthService,
    private _workService: WorkService,
    private _resultService: ResultService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) { }

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
      if (this.categories.length == 0 || this.categories == null) return;
      this.catPanelState.length = this.categories.length;
      this.catPanelState.map(x => x = false);
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
      if (success == true)
        this._snackBar.open("Travail créé", null, {duration: 3000})
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
    if (this.selectedCategories.value)
    {
      if (this.selectedCategories.value.length == 0)
      {
        this.categories = this.selectCategories;
      }
      else{
        this.categories = this.selectedCategories.value;
        if (this.categories.length == 0 || this.categories == null) return;
        this.catPanelState.length = this.categories.length;
        this.catPanelState.map(x => x = false);
      }
    }
    if (this.selectedSchoolYears.value)
    {
      if (this.selectedSchoolYears.value.length == 0){
        this.schoolYears = this.selectSchoolYears;
        console.log(true)
        if (this.selectedCategories.value)
        {
          if (this.selectedCategories.value.length == 0)
            this.categories = this.selectCategories;
          else 
            this.categories = this.selectedCategories.value;
        }
        else
          this.categories = this.selectCategories;
      }
      else{
        console.log(false)
        if (this.selectedCategories.value)
        {
          if (this.selectedCategories.value.length == 0)
            this.categories = this.selectCategories;
          else 
            this.categories = this.selectedCategories.value;
        }
        else
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
        if (this.schoolYears.length == 0 || this.schoolYears == null) return;
        this.schoolYearPanelState.length = this.schoolYears.length;
        this.schoolYearPanelState.map(x => x = false);
      }
    }
    if (this.selectedTrimesters.value)
    {
      if (this.selectedTrimesters.value.length == 0){
        this.trimesters = this.selectTrimesters;
      }
      else{
        this.trimesters = this.selectedTrimesters.value;
        if (this.trimesters.length == 0 || this.trimesters == null) return;
        this.trimesterPanelState.length = this.trimesters.length;
        this.schoolYearPanelState.map(x => x = false);
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
  }






}
