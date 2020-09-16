import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserDetailed } from '../../Models/UserDetailed.model';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  userDetailed : UserDetailed = new UserDetailed();

  constructor(
    private _route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.userDetailed = this._route.snapshot.data['userDetailed'];
    
  }
}
