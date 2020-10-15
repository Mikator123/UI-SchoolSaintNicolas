import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatCalendar, MatCalendarUserEvent } from '@angular/material/datepicker';
import { ActivatedRoute } from '@angular/router';
import { UserDetailed } from '../../Models/UserDetailed.model';
import {MatCalendarCellClassFunction} from '@angular/material/datepicker';
import { ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ResetPasswordComponent } from 'src/app/Modules/auth/Components/reset-password/reset-password.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PhotoComponent } from '../photo/photo.component';

export interface PhotoDialogData{
  photo: string;
}

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DetailsComponent implements OnInit {

  @ViewChild(MatCalendar, {static: true}) calendar: MatCalendar<any>;
  
  showContact = false;
  dates: string;
  selectedDate= new Date();
  daysSelected: any[] = [];
  event: any;
  userDetailed : UserDetailed = new UserDetailed();

  constructor(
    private _route: ActivatedRoute,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
  ) {
   }

  ngOnInit(): void {
    
    this.userDetailed = this._route.snapshot.data['userDetailed'];


    if (this.userDetailed.lunches != null)
      this.userDetailed.lunches.forEach(lunch => {
        const dateParsed = new Date(lunch.date);
          this.daysSelected.push(dateParsed.getDate()+"/"+dateParsed.getMonth()+"/"+dateParsed.getFullYear());  
      });
  }

  openDialog(){
    let ref = this.dialog.open(ResetPasswordComponent, {
      width: 'auto',
      height:'auto',
      disableClose:true,
    });
    ref.afterClosed().subscribe(result => {
        if (result == true)
          this._snackBar.open("Mot de passe modifié", null, {duration : 3000})
    });
  

  }

  openContacts(){
    this.showContact = !this.showContact;
  }

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    if (view === 'month')
    {

      const date = cellDate.getDate()+"/"+cellDate.getMonth()+"/"+cellDate.getFullYear()
      let lunchDays: string[] = [];
      this.daysSelected.forEach(days => {
        lunchDays.push(days)
      });
      return lunchDays.includes(date) ? 'custom-date-class' : ''; 
    }
    else 
      return '';
  }

  openPhotoDialog(){
    let ref = this.dialog.open(PhotoComponent,{
      width: "40vw",
      height: "40vh",
      data: {
        photo: this.userDetailed.photo
      }
    })
  }



  // btnColor = '';
  

  // toggleButton(event: MouseEvent) {
  //   event.stopPropagation();

  //   console.log("CLICKED");
  //   this.btnColor = this.btnColor == '' ? 'primary' : '';
  // }

}
