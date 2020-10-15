import { Component, OnInit } from '@angular/core';
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
  trimesters: number[]= [ 1,2,3 ];
  schoolYears: number[]= [ 1,2,3,4,5,6 ];
  yearValue: null;
  catPanelState : Boolean[] = [];
  schoolYearPanelState : Boolean[] = [
    false, false,false,false,false,false
  ]
  trimesterPanelState : Boolean[] = [
    false,false,false
  ];
  workPanelState : Boolean[] = [];


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
      this.categories = data
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






}
