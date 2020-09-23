import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatCalendar } from '@angular/material/datepicker';
import { ActivatedRoute } from '@angular/router';
import { UserDetailed } from '../../Models/UserDetailed.model';
import {MatCalendarCellClassFunction} from '@angular/material/datepicker';
import { ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ResetPasswordComponent } from 'src/app/Modules/auth/Components/reset-password/reset-password.component';
import { Subscription } from 'rxjs';
import { UserService } from '../../Services/user.service';



@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DetailsComponent implements OnInit {
  @ViewChild(MatCalendar, {static: true}) calendar: MatCalendar<any>

  userId: number;
  dates: string;
  selectedDate= new Date();
  daysSelected: any[] = [];
  event: any;
  profileColSpan:string ="2";
  contactRawSpan : string = "2";
  userDetailed : UserDetailed = new UserDetailed();

  constructor(
    private _route: ActivatedRoute,
    public dialog: MatDialog,
  ) {
   }

  ngOnInit(): void {
    this.userDetailed = this._route.snapshot.data['userDetailed'];

    if (this.userDetailed.photo == null)
      this.userDetailed.gender === 'M' ? 
        this.userDetailed.photo = "http://www.haneffebasket.be/wp-content/uploads/2017/04/avatar-vide.jpeg":
        this.userDetailed.photo = "http://www.tmf-operating.com/wp-content/uploads/2015/12/avatar-femme-300x176.jpg";
    if (this.userDetailed.contacts == null)
      this.profileColSpan = "3";
    if (this.userDetailed.lunches != null)
      this.userDetailed.lunches.forEach(lunch => {
        const dateParsed = new Date(lunch.date);
          this.daysSelected.push(dateParsed.getDate()+"/"+dateParsed.getMonth()+"/"+dateParsed.getFullYear());  
      });
  }

  openDialog(){
    this.dialog.open(ResetPasswordComponent, {
      width: '400px',
      disableClose:true,
      
    });
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





  


}
