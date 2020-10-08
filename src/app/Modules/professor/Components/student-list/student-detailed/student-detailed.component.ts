import { Component, Inject, OnInit } from '@angular/core';
import { UserDetailed } from '../../../../User/Models/UserDetailed.model';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateDialogData } from '../student-list.component';
import { UserService } from 'src/app/Modules/User/Services/user.service';
import { PhotoComponent } from 'src/app/Modules/User/Components/photo/photo.component';

@Component({
  selector: 'app-student-detailed',
  templateUrl: './student-detailed.component.html',
  styleUrls: ['./student-detailed.component.scss']
})
export class StudentDetailedComponent implements OnInit {


  showContact = true;
  panelState = false;
  userDetailed : UserDetailed = new UserDetailed();

  constructor(
    private _userService: UserService,
    public dialog : MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: CreateDialogData
  ) {
   }

  ngOnInit(): void {
    this._userService.getById(this.data.studentId).subscribe(user => this.userDetailed = user);

    };
  


  openContacts(){
    this.showContact = !this.showContact;
  }

  openPhotoDialog(){
    let ref = this.dialog.open(PhotoComponent,{
      data: {
        photo: this.userDetailed.photo
      }
    })
  }
}
